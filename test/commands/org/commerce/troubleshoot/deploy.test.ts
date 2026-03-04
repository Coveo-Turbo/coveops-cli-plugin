import {
  DefaultConfig,
} from '@coveo/cli-commons/config/config';
import {captureOutput} from '@oclif/test';
import {expect} from 'chai';
import {afterEach, describe, it} from 'mocha';

import CommerceTroubleshootDeploy, {
  type DeployTroubleshootRequest,
  commerceTroubleshootDeployTestHooks,
} from '../../../../../src/commands/org/commerce/troubleshoot/deploy.js';

type DeployResult = {
  bundleDir: string;
  deployConfigPath: string;
  deployed: boolean;
  diagnostics: string[];
  hostedPageId?: string;
  hostedPageName: string;
  keyInfo: {
    created: boolean;
    reused: boolean;
    source: 'managed' | 'provided';
  };
  organizationId: string;
  runtimeConfigPath: string;
};

describe('org:commerce:troubleshoot:deploy', () => {
  afterEach(() => {
    commerceTroubleshootDeployTestHooks.reset();
  });

  it('maps managed strategy flags + config fallback and invokes service', async () => {
    let capturedRequest: DeployTroubleshootRequest | undefined;

    commerceTroubleshootDeployTestHooks.setReadConfiguration(() => ({
      ...DefaultConfig,
      accessToken: 'cfg-access-token',
      environment: 'prod',
      organization: 'cfg-org',
      region: 'us',
    }) as never);

    commerceTroubleshootDeployTestHooks.setLoadDeployerModule(async () => ({
      async deployTroubleshootConsole(request) {
        capturedRequest = request;
        const result: DeployResult = {
          bundleDir: '/tmp/bundle',
          deployConfigPath: '/tmp/coveo.deploy.json',
          deployed: true,
          diagnostics: ['managed diagnostics line'],
          hostedPageId: 'hp-managed-1',
          hostedPageName: request.target.hostedPageName,
          keyInfo: {
            created: false,
            reused: true,
            source: 'managed',
          },
          organizationId: request.target.organizationId,
          runtimeConfigPath: '/tmp/runtime.js',
        };

        return result;
      },
    }));

    const {error, stdout} = await captureOutput(() => CommerceTroubleshootDeploy.run([
      '--page-name',
      'commerce-troubleshoot-console',
      '--rotate',
      '--tracking-id',
      'storefront-main',
    ]));

    expect(error).to.equal(undefined);
    expect(capturedRequest).to.deep.equal({
      auth: {
        accessToken: 'cfg-access-token',
      },
      deploy: {
        dryRun: false,
      },
      keyStrategy: {
        mode: 'managed',
        rotate: true,
      },
      runtimeDefaults: {
        country: 'US',
        currency: 'USD',
        language: 'en',
        trackingId: 'storefront-main',
        viewUrl: 'https://www.example.com/',
      },
      target: {
        environment: 'prod',
        hostedPageName: 'commerce-troubleshoot-console',
        organizationId: 'cfg-org',
        region: 'us',
      },
    });
    expect(stdout).to.contain('Hosted page name: commerce-troubleshoot-console');
    expect(stdout).to.contain('Hosted page id: hp-managed-1');
    expect(stdout).to.contain('Execution: deploy executed');
    expect(stdout).to.contain('Key resolution: source=managed, created=no, reused=yes');
    expect(stdout).to.contain('managed diagnostics line');
  });

  it('maps provided strategy and explicit flags before invoking service', async () => {
    let capturedRequest: DeployTroubleshootRequest | undefined;

    commerceTroubleshootDeployTestHooks.setReadConfiguration(() => ({
      ...DefaultConfig,
      accessToken: 'ignored-access-token',
      environment: 'prod',
      organization: 'ignored-org',
      region: 'us',
    }) as never);

    commerceTroubleshootDeployTestHooks.setLoadDeployerModule(async () => ({
      async deployTroubleshootConsole(request) {
        capturedRequest = request;
        const result: DeployResult = {
          bundleDir: '/tmp/bundle',
          deployConfigPath: '/tmp/coveo.deploy.json',
          deployed: false,
          diagnostics: ['dry-run only'],
          hostedPageId: request.target.hostedPageId,
          hostedPageName: request.target.hostedPageName,
          keyInfo: {
            created: false,
            reused: false,
            source: 'provided',
          },
          organizationId: request.target.organizationId,
          runtimeConfigPath: '/tmp/runtime.js',
        };

        return result;
      },
    }));

    const {error, stdout} = await captureOutput(() => CommerceTroubleshootDeploy.run([
      '--page-name',
      'commerce-troubleshoot-console',
      '--page-id',
      'hp-existing-id',
      '--organization',
      'flag-org',
      '--access-token',
      'flag-access-token',
      '--region',
      'eu',
      '--environment',
      'stg',
      '--engine-token',
      'provided-engine-token',
      '--cmh-token',
      'provided-cmh-token',
      '--language',
      'fr',
      '--country',
      'CA',
      '--currency',
      'CAD',
      '--view-url',
      'https://www.example.ca/plp',
      '--dry-run',
    ]));

    expect(error).to.equal(undefined);
    expect(capturedRequest).to.deep.equal({
      auth: {
        accessToken: 'flag-access-token',
      },
      deploy: {
        dryRun: true,
      },
      keyStrategy: {
        cmhAccessToken: 'provided-cmh-token',
        engineAccessToken: 'provided-engine-token',
        mode: 'provided',
      },
      runtimeDefaults: {
        country: 'CA',
        currency: 'CAD',
        language: 'fr',
        viewUrl: 'https://www.example.ca/plp',
      },
      target: {
        environment: 'stg',
        hostedPageId: 'hp-existing-id',
        hostedPageName: 'commerce-troubleshoot-console',
        organizationId: 'flag-org',
        region: 'eu',
      },
    });
    expect(stdout).to.contain('Hosted page name: commerce-troubleshoot-console');
    expect(stdout).to.contain('Hosted page id: hp-existing-id');
    expect(stdout).to.contain('Execution: dry-run (deploy skipped)');
    expect(stdout).to.contain('Key resolution: source=provided, created=no, reused=no');
    expect(stdout).to.contain('dry-run only');
  });
});
