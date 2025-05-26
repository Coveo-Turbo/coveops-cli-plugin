import {Config} from '@coveo/cli-commons/config/config';
import {PlatformClient} from '@coveo/platform-client';
import {Command, Flags} from '@oclif/core';

import {commerceBaseUrl} from '../../../../utils/commerce-utils.js';

export default class CommerceListingsDelete extends Command {
  static description = 'Delete a listing configuration in an organization';

  static examples = [
    `<%= config.bin %> <%= command.id %> --catalogId default`,
  ];

  static flags = {
    configId: Flags.string({
      char: 'c',
      description: 'The unique identifier of the listing configuration.',
      required: true,
    })
  };


  public async run() {
    const {flags} = await this.parse(CommerceListingsDelete);
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
      await platformClient['API'].delete(`${baseUrl}/listings/${flags.configId}`);
      this.log(`Listing configuration "${flags.configId}" deleted successfully.`);

    } catch (error) {
      this.error(`Failed to delete listing configuration: ${error}`);
    }
  }

  private get configuration() {
    return new Config(this.config.configDir);
  }
}