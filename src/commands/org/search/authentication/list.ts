import {Config} from '@coveo/cli-commons/config/config';
import {PlatformClient} from '@coveo/platform-client';
import {Command, Flags} from '@oclif/core'
import ux from '@oclif/core/ux'

import { AuthenticationProviderType, searchAuthenticationBaseUrl } from '../../../../utils/authentication-provider-utils.js';

export default class OrgSearchAuthenticationList extends Command {
  static args = {}

  static override description = 'List all authentication providers for an organization';
  public static enableJsonFlag = true;
  static override examples = ['<%= config.bin %> <%= command.id %>'];

  static override flags = {
    // flag with no value (-f, --force)
    force: Flags.boolean({char: 'f'}),
    // flag with a value (-t, --type=VALUE)
    type: Flags.string({
      char: 't',
      description: 'Type of authentication provider to list', 
      options: [AuthenticationProviderType.Saml, AuthenticationProviderType.Sharepoint],
    }),
  }

  public async run(): Promise<Record<string, unknown>|undefined> {
    const {flags} = await this.parse(OrgSearchAuthenticationList)

    const {accessToken, organization} = this.configuration.get();

    if (!organization || !accessToken) {
      this.error('Organization ID or access token is not configured in the Coveo CLI. Please log in using the CLI.');
    }

    const platformClient = new PlatformClient({
      accessToken: () => accessToken,
      organizationId: organization,
    });

    const theme = {
      boolean: 'cyan',
      brace: '#00FFFF',
      bracket: 'rgb(0, 255, 255)',
      colon: 'dim',
      comma: 'yellow',
      key: 'bold',
      null: 'redBright',
      number: 'blue',
      string: 'green',
    }

    try {
      this.log('Fetching Authentication Providers...');
      const type = flags.type ?? '';
      const path = type ? `/${type}` : '';
      const baseUrl = searchAuthenticationBaseUrl(organization);
      // eslint-disable-next-line dot-notation
      const authProviders = await platformClient['API'].get(`${baseUrl}${path}`);
      if (authProviders.length === 0) {
        this.log('No Authentication providers found.');
      } else {
        this.log(ux.colorizeJson(authProviders, {theme}));
      }

      return authProviders;

    } catch (error) {
      this.error(`Failed to fetch Vault parameters: ${error}`);
    }
  }

  private get configuration() {
    return new Config(this.config.configDir);
  }
}
