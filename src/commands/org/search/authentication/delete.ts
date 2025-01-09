import {Config} from '@coveo/cli-commons/config/config';
import {PlatformClient} from '@coveo/platform-client';
import {Args, Command, Flags} from '@oclif/core'

import { AuthenticationProviderType, searchAuthenticationBaseUrl } from '../../../../utils/authentication-provider-utils.js';

export default class OrgSearchAuthenticationDelete extends Command {
  static override args = {
    id: Args.string({description: 'Id of the authentication provider to delete', name: 'id', required: true})
  }

  public static override description = 'Deletes an existing Authentication provider (SAML or Sharepoint Claims) in the specified organization'

  public static override examples = [
    '<%= config.bin %> <%= command.id %> 73404dc5-1111-1111-1111-0e5144482521'
  ]

  static override flags = {
    // flag with a value (-t, --type=VALUE)
    type: Flags.string({
      char: 't',
      description: 'Type of authentication provider to list', 
      options: [AuthenticationProviderType.Saml, AuthenticationProviderType.Sharepoint],
    }),
  }

  public async run() {
    const {args, flags} = await this.parse(OrgSearchAuthenticationDelete)
    const {accessToken, organization} = this.configuration.get();
    const baseUrl = searchAuthenticationBaseUrl(organization);

    if (!organization || !accessToken) {
      this.error('Organization ID or access token is not configured in the Coveo CLI. Please log in using the CLI.');
    }

    const platformClient = new PlatformClient({
      accessToken: () => accessToken,
      organizationId: organization,
    });

    if (!args.id) {
        this.error('The id of the authentication provider is required.');
    }

    try {
        // eslint-disable-next-line dot-notation
        await platformClient['API'].delete(`${baseUrl}/${flags.type}/${args.id}`);
        this.log(`Authentication provider "${args.id}" deleted successfully.`);
    } catch (error) {
        this.error(`Failed to create Authentication provider: ${error}`);
    }
  }

  private get configuration() {
    return new Config(this.config.configDir);
  }
}
