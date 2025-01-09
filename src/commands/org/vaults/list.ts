import {Config} from '@coveo/cli-commons/config/config';
import {PageModel, PlatformClient, VaultEntryModel } from '@coveo/platform-client';
import {Command} from '@oclif/core';
import ux from '@oclif/core/ux'

export default class ListVaults extends Command {
  public static description = 'List all Vault parameters in the specified organization';
  public static enableJsonFlag = true;
  public static examples = ['coveo org:vaults:list'];

  public async run(): Promise<PageModel<VaultEntryModel>|undefined> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {flags} = await this.parse(ListVaults);

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
      this.log('Fetching Vault parameters...');
      const vaults = await platformClient.vault.list();
      if (vaults.items.length === 0) {
        this.log('No Vault parameters found.');
      } else {
        this.log(ux.colorizeJson(vaults, {theme}));
      }

      return vaults;
      
    } catch (error) {
      this.error(`Failed to fetch Vault parameters: ${error}`);
    }
  }

  private get configuration() {
    return new Config(this.config.configDir);
  }
}
