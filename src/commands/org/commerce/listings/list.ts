import {Config} from '@coveo/cli-commons/config/config';
import {PlatformClient} from '@coveo/platform-client';
import {Command, Flags} from '@oclif/core';
import ux from '@oclif/core/ux'

import {commerceBaseUrl} from '../../../../utils/commerce-utils.js';
import { theme } from '../../../../utils/ux-utils.js';

export default class CommerceListingsList extends Command {
  static description = 'List all listing configurations of an organization';
  static enableJsonFlag = true;
  static examples = [
    `<%= config.bin %> <%= command.id %> --trackingId my-tracking-id`,
    `<%= config.bin %> <%= command.id %> --trackingId my-tracking-id --page 1 --perPage 20`,
  ];

  static flags = {
    page: Flags.integer({
      char: 'p',
      default: 0,
      description: 'The page number to retrieve.',
    }),
    perPage: Flags.integer({
      char: 'P',
      default: 10,
      description: 'The number of items per page.',
    }),
    trackingId: Flags.string({
      char: 't',
      description: 'The unique identifier of the tracking target.',
      required: true,
    }),
  };

  public async run(): Promise<Record<string, unknown>|undefined> {
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
      const {flags} = await this.parse(CommerceListingsList);
      const queryParams = new URLSearchParams();

      if (flags.trackingId) {
        queryParams.append('trackingId', flags.trackingId);
      }

      // Use the provided flags for pagination
      queryParams.append('page', flags.page.toString());
      queryParams.append('perPage', flags.perPage.toString());

      const queryString = queryParams.toString();
      // eslint-disable-next-line dot-notation
      const response = await platformClient['API'].get(`${baseUrl}/listings${queryString ? `?${queryString}` : ''}`);
      
      if ((response.items as Array<unknown>).length === 0) {
        this.log('No Listings found.');
      } else {
        this.log(ux.colorizeJson(response, {theme}));
      }

      return response;

    } catch (error) {
      this.error(`Failed to retrieve listing configurations: ${error}`);
    }
  }

  private get configuration() {
    return new Config(this.config.configDir);
  }
}