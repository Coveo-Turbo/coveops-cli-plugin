import {Config, type Configuration} from '@coveo/cli-commons/config/config';
import {Command, Flags} from '@oclif/core';

type RuntimeDefaults = {
  country?: string;
  currency?: string;
  language?: string;
  trackingId?: string;
  viewUrl?: string;
};

type KeyStrategyProvided = {
  cmhAccessToken?: string;
  engineAccessToken: string;
  mode: 'provided';
};

type KeyStrategyManaged = {
  mode: 'managed';
  rotate?: boolean;
};

type KeyStrategy = KeyStrategyManaged | KeyStrategyProvided;

export type DeployTroubleshootRequest = {
  auth: {
    accessToken: string;
  };
  deploy?: {
    dryRun?: boolean;
  };
  keyStrategy?: KeyStrategy;
  runtimeDefaults?: RuntimeDefaults;
  target: {
    environment?: string;
    hostedPageId?: string;
    hostedPageName: string;
    organizationId: string;
    region?: string;
  };
};

type DeployTroubleshootResult = {
  bundleDir: string;
  deployConfigPath: string;
  deployed: boolean;
  diagnostics: string[];
  hostedPageId?: string;
  hostedPageName: string;
  keyInfo: {
    cmhKeyId?: string;
    created: boolean;
    engineKeyId?: string;
    reused: boolean;
    source: 'managed' | 'provided';
  };
  organizationId: string;
  runtimeConfigPath: string;
};

type DeployerModule = {
  deployTroubleshootConsole: (
    request: DeployTroubleshootRequest,
    options?: {
      logger?: (message: string) => void;
    }
  ) => Promise<DeployTroubleshootResult>;
};

type CommandHooks = {
  loadDeployerModule: () => Promise<DeployerModule>;
  readConfiguration: (configDir: string) => Configuration;
};

function readString(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed || undefined;
}

const deployerPackageName = ['@coveops', 'commerce-troubleshoot-deployer'].join('/');

const defaultCommandHooks: CommandHooks = {
  loadDeployerModule: async () => (await import(deployerPackageName)) as DeployerModule,
  readConfiguration: (configDir) => new Config(configDir).get(),
};

const commandHooks: CommandHooks = {
  ...defaultCommandHooks,
};

export const commerceTroubleshootDeployTestHooks = {
  reset() {
    commandHooks.loadDeployerModule = defaultCommandHooks.loadDeployerModule;
    commandHooks.readConfiguration = defaultCommandHooks.readConfiguration;
  },
  setLoadDeployerModule(loader: CommandHooks['loadDeployerModule']) {
    commandHooks.loadDeployerModule = loader;
  },
  setReadConfiguration(reader: CommandHooks['readConfiguration']) {
    commandHooks.readConfiguration = reader;
  },
};

export default class CommerceTroubleshootDeploy extends Command {
  static description =
    'Deploy or update the Commerce Troubleshoot Console hosted page through @coveops/commerce-troubleshoot-deployer.';

  static examples = [
    '<%= config.bin %> <%= command.id %> --page-name commerce-troubleshoot-console',
    '<%= config.bin %> <%= command.id %> --page-name commerce-troubleshoot-console --engine-token <ENGINE_TOKEN> --cmh-token <CMH_TOKEN>',
    '<%= config.bin %> <%= command.id %> --page-name commerce-troubleshoot-console --page-id f8f9b7d1-1f44-4f7c-9854-a2b0a4df1c13',
    '<%= config.bin %> <%= command.id %> --page-name commerce-troubleshoot-console  # Name-only deploy updates an existing page if one matches the name.',
  ];

  static flags = {
    accessToken: Flags.string({
      aliases: ['access-token'],
      description: 'Platform access token. Falls back to coveo config value accessToken.',
    }),
    cmhToken: Flags.string({
      aliases: ['cmh-token'],
      description: 'CMH API key used when --engine-token is provided (provided key strategy).',
    }),
    country: Flags.string({
      default: 'US',
      description: 'Runtime default country code for hosted app payload.',
    }),
    currency: Flags.string({
      default: 'USD',
      description: 'Runtime default currency code for hosted app payload.',
    }),
    dryRun: Flags.boolean({
      aliases: ['dry-run'],
      default: false,
      description: 'Generate bundle and config without running coveo deploy.',
    }),
    engineToken: Flags.string({
      aliases: ['engine-token'],
      description: 'Engine API key. Providing this switches key strategy to provided mode.',
    }),
    environment: Flags.string({
      description: 'Platform environment. Falls back to coveo config value environment.',
    }),
    language: Flags.string({
      default: 'en',
      description: 'Runtime default language for hosted app payload.',
    }),
    organization: Flags.string({
      description: 'Organization ID. Falls back to coveo config value organization.',
    }),
    pageId: Flags.string({
      aliases: ['page-id'],
      description: 'Hosted page ID to update directly.',
    }),
    pageName: Flags.string({
      aliases: ['page-name'],
      description: 'Hosted page name for deploy target.',
      required: true,
    }),
    region: Flags.string({
      description: 'Platform region. Falls back to coveo config value region.',
    }),
    rotate: Flags.boolean({
      default: false,
      description: 'Rotate managed API keys before deploy (managed key strategy only).',
    }),
    trackingId: Flags.string({
      aliases: ['tracking-id'],
      description: 'Runtime default tracking ID for hosted app payload.',
    }),
    viewUrl: Flags.string({
      aliases: ['view-url'],
      default: 'https://www.example.com/',
      description: 'Runtime default product listing URL for hosted app payload.',
    }),
  };

  public async run() {
    const {flags} = await this.parse(CommerceTroubleshootDeploy);
    const resolvedConfiguration = commandHooks.readConfiguration(this.config.configDir);

    const organizationId = readString(flags.organization) ?? readString(resolvedConfiguration.organization);
    const accessToken = readString(flags.accessToken) ?? readString(resolvedConfiguration.accessToken);
    const region = readString(flags.region) ?? readString(resolvedConfiguration.region);
    const environment = readString(flags.environment) ?? readString(resolvedConfiguration.environment);
    const hostedPageId = readString(flags.pageId);
    const trackingId = readString(flags.trackingId);

    if (!organizationId) {
      this.error('Missing organization ID. Provide --organization or set it with coveo config:set organization <ID>.');
    }

    if (!accessToken) {
      this.error('Missing access token. Provide --access-token or set it with coveo config:set accessToken <TOKEN>.');
    }

    const keyStrategy = this.resolveKeyStrategy(flags);

    const request: DeployTroubleshootRequest = {
      auth: {
        accessToken,
      },
      deploy: {
        dryRun: flags.dryRun,
      },
      keyStrategy,
      runtimeDefaults: {
        ...(trackingId ? {trackingId} : {}),
        country: flags.country,
        currency: flags.currency,
        language: flags.language,
        viewUrl: flags.viewUrl,
      },
      target: {
        hostedPageName: flags.pageName,
        organizationId,
        ...(hostedPageId ? {hostedPageId} : {}),
        ...(region ? {region} : {}),
        ...(environment ? {environment} : {}),
      },
    };

    const deployTroubleshootConsole = await this.loadDeployFunction();
    const result = await deployTroubleshootConsole(request, {
      logger: (line) => this.debug(line),
    });

    this.log(`Hosted page name: ${result.hostedPageName}`);
    this.log(`Hosted page id: ${result.hostedPageId ?? '(not resolved)'}`);
    this.log(`Execution: ${result.deployed ? 'deploy executed' : 'dry-run (deploy skipped)'}`);
    this.log(
      `Key resolution: source=${result.keyInfo.source}, created=${result.keyInfo.created ? 'yes' : 'no'}, reused=${result.keyInfo.reused ? 'yes' : 'no'}`
    );

    if (result.keyInfo.engineKeyId) {
      this.log(`Engine key id: ${result.keyInfo.engineKeyId}`);
    }

    if (result.keyInfo.cmhKeyId) {
      this.log(`CMH key id: ${result.keyInfo.cmhKeyId}`);
    }

    this.log('Diagnostics:');
    if (!Array.isArray(result.diagnostics) || result.diagnostics.length === 0) {
      this.log('- (none)');
      return;
    }

    for (const line of result.diagnostics) {
      this.log(`- ${line}`);
    }
  }

  private async loadDeployFunction(): Promise<DeployerModule['deployTroubleshootConsole']> {
    try {
      const module = await commandHooks.loadDeployerModule();
      if (typeof module.deployTroubleshootConsole !== 'function') {
        this.error('Invalid @coveops/commerce-troubleshoot-deployer package: deployTroubleshootConsole export is missing.');
      }

      return module.deployTroubleshootConsole;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.error(
        `Unable to load @coveops/commerce-troubleshoot-deployer. Install the package and try again. Details: ${message}`
      );
    }
  }

  private resolveKeyStrategy(flags: {
    cmhToken?: string;
    engineToken?: string;
    rotate: boolean;
  }): KeyStrategy {
    const engineAccessToken = readString(flags.engineToken);
    const cmhAccessToken = readString(flags.cmhToken);

    if (!engineAccessToken) {
      if (cmhAccessToken) {
        this.warn('Ignoring --cmh-token because --engine-token was not provided; using managed key strategy.');
      }

      return {
        mode: 'managed',
        rotate: flags.rotate,
      };
    }

    return {
      engineAccessToken,
      mode: 'provided',
      ...(cmhAccessToken ? {cmhAccessToken} : {}),
    };
  }
}
