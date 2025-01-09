import {Config} from '@coveo/cli-commons/config/config';
import {PlatformClient} from '@coveo/platform-client';
import {Args, Command, Flags} from '@oclif/core'

import { AuthenticationProviderType, buildAuthProviderPayload, downloadMetadata, searchAuthenticationBaseUrl } from '../../../../utils/authentication-provider-utils.js';

export default class OrgSearchAuthenticationCreate extends Command {
  public static override args = {
    name: Args.string({description: 'Name for the authentication provider', name: 'name', required: true})
  }

  public static override description = 'Create a new Authentication provider (SAML or Sharepoint Claims) in the specified organization'

  public static override examples = [
    '<%= config.bin %> <%= command.id %> --type saml "My SAML Provider" --metadataUrl "https://example.com/metadata.xml"'
  ]

  public static override flags = {
    assertionConsumerServiceUrl: Flags.string({char: 'a', description: 'Assertion Consumer Service URL for the authentication provider'}),
    // flag with no value (-f, --enforceTrustedUris)
    enforceTrustedUris: Flags.boolean({char: 'f', default: true, description: 'Enforce trusted URIs'}),
    expiration: Flags.integer({char: 'e', default: 0, description: 'Expiration time for the authentication provider'}),
    metadataUrl: Flags.string({char: 'm', description: 'Metadata URL for the authentication provider'}),
    provider: Flags.string({char: 'p', default: 'Email Security Provider', description: 'Desired Security Provider for the authentication provider'}),
    // flag with a value (-r, --relyingPartyIdentifier=VALUE)
    relyingPartyIdentifier: Flags.string({
      char: 'r', 
      default: 'https://platform.cloud.coveo.com',
      description: 'Relying Party Identifier for the authentication provider',
      required: true
    }),
    secret: Flags.string({char: 's', description: 'Secret for the authentication provider'}),
    // flag with a value (-t, --type=VALUE)
    type: Flags.string({
      char: 't',
      default: AuthenticationProviderType.Saml, 
      description: 'Type of authentication provider to list',
      options: [AuthenticationProviderType.Saml, AuthenticationProviderType.Sharepoint],
    }),
    uri: Flags.string({char: 'u', description: 'URI for the Sharepoint Claims authentication provider'}),
  }

  public async run() {
    const {args, flags} = await this.parse(OrgSearchAuthenticationCreate)
    const {accessToken, organization} = this.configuration.get();
    const baseUrl = searchAuthenticationBaseUrl(organization);

    if (!organization || !accessToken) {
      this.error('Organization ID or access token is not configured in the Coveo CLI. Please log in using the CLI.');
    }

    const platformClient = new PlatformClient({
      accessToken: () => accessToken,
      organizationId: organization,
    });

    if (!args.name) {
        this.error('The name for the authentication provider is required.');
    }

    let metadata = '';
    if (flags.type === 'saml') {
        if (!flags.metadataUrl) {
            this.error('Please provide a metadata URL for the SAML authentication provider.');
        }

        try {
            metadata = await downloadMetadata(flags.metadataUrl);
        } catch (error) {
            this.error(`Failed to fetch metadata from URL: ${error}`);
        }
    }

    const authProviderPayload = buildAuthProviderPayload(AuthenticationProviderType.Saml, {
      ...flags,
      metadata, 
      name: args.name
    });

    if (!authProviderPayload) {
        this.error(`Invalid parameters for authentication provider type: ${flags.type}.`);
    }

    try {
        // eslint-disable-next-line dot-notation
        await platformClient['API'].post(`${baseUrl}/${flags.type}`, authProviderPayload);
        this.log(`Authentication provider "${args.name}" created successfully.`);
    } catch (error) {
        this.error(`Failed to create Authentication provider: ${error}`);
    }
  }

  private get configuration() {
    return new Config(this.config.configDir);
  }

}
