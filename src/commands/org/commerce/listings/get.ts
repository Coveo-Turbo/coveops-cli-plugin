import {Config} from '@coveo/cli-commons/config/config';
import {PlatformClient} from '@coveo/platform-client';
import {Command, Flags} from '@oclif/core';
import ux from '@oclif/core/ux'

import {commerceBaseUrl} from '../../../../utils/commerce-utils.js';
import { theme } from '../../../../utils/ux-utils.js';

export default class CommerceListingsGet extends Command {
  
  static description = 'Get a specific listing configuration';
  static enableJsonFlag = true;
  static examples = [
    `<%= config.bin %> <%= command.id %> --configId default`,
  ];

  static flags = {
    configId: Flags.string({
      char: 'c',
      description: 'The unique identifier of the listing configuration.',
      required: true,
    })
  };

  public async run(): Promise<Record<string, unknown>|undefined>  {
    const {flags} = await this.parse(CommerceListingsGet);
    const {accessToken, organization} = this.configuration.get();

    if (!organization || !accessToken) {
      this.error('Organization ID or access token is not configured in the Coveo CLI. Please log in using the CLI.');
    }

    try {
      const platformClient = new PlatformClient({
        accessToken: () => accessToken,
        organizationId: organization,
      });

      const baseUrl = commerceBaseUrl(organization);
      // eslint-disable-next-line dot-notation
      const response = await platformClient['API'].get(`${baseUrl}/listings/${flags.configId}`);
      
      this.log(ux.colorizeJson(response, {theme}));

      return response;

    } catch (error) {
      this.error(`Failed to retrieve listing configuration: ${error}`);
    }
  }

  private get configuration() {
    return new Config(this.config.configDir);
  }
}