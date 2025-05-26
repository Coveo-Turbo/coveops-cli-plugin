import {Config} from '@coveo/cli-commons/config/config';
import {PlatformClient} from '@coveo/platform-client';
import {Command, Flags} from '@oclif/core';
import ux from '@oclif/core/ux'

import {commerceBaseUrl} from '../../../../../utils/commerce-utils.js';
import { theme } from '../../../../../utils/ux-utils.js';


export default class CommerceListingsGlobalGet extends Command {
  static description = 'Get the global listing configuration for a catalog';

  static examples = [
    `<%= config.bin %> <%= command.id %> --trackingId my-tracking-id`,
  ];

  static flags = {
    trackingId: Flags.string({
      char: 't',
      description: 'The unique identifier of the tracking target.',
      required: true,
    }),
  };

  public async run() {
    const {flags} = await this.parse(CommerceListingsGlobalGet);
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
      const queryParams = new URLSearchParams();

      if (flags.trackingId) {
        queryParams.append('trackingId', flags.trackingId);
      }

      const queryString = queryParams.toString();
      
      // eslint-disable-next-line dot-notation
      const response = await platformClient['API'].get(`${baseUrl}/listings/global${queryString ? `?${queryString}` : ''}`);

      this.log(ux.colorizeJson(response, {theme}));

      return response;

    } catch (error) {
      this.error(`Failed to retrieve global listing configuration: ${error}`);
    }
  }

  private get configuration() {
    return new Config(this.config.configDir);
  }
}