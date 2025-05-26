/* eslint-disable no-template-curly-in-string */
import {Config} from '@coveo/cli-commons/config/config';
import {PlatformClient} from '@coveo/platform-client';
import {Command, Flags} from '@oclif/core';

import {ListingConfigurationModel, commerceBaseUrl, validateListingConfiguration} from '../../../../utils/commerce-utils.js';

export default class CommerceListingsCreate extends Command {
  static description = 'Create a new listing configuration in the organization';

  static examples = [
    `<%= config.bin %> <%= command.id %> --name "electronics" --displayName "Electronics" --filter "@category==electronics" --catalogId "default"`,
  ];

  static flags = {
    configFile: Flags.string({
      char: 'i',
      description: 'Path to JSON file containing the full listing configuration',
      required: true,
    }),
    displayName: Flags.string({
      char: 'd',
      description: 'Display name of the listing configuration',
      required: true,
    }),
    filter: Flags.string({
      char: 'f',
      description: 'Filter query for the listing configuration',
      required: true,
    }),
    name: Flags.string({
      char: 'n',
      description: 'Name of the listing configuration',
      required: true,
    }),
  };

  public async run() {
    const {flags} = await this.parse(CommerceListingsCreate);
    const {accessToken, organization} = this.configuration.get();

    if (!organization || !accessToken) {
      this.error('Organization ID or access token is not configured in the Coveo CLI. Please log in using the CLI.');
    }

    let listingConfig: ListingConfigurationModel;

    try {
      const fs = await import('node:fs/promises');
      const configContent = await fs.readFile(flags.configFile, 'utf8');
      listingConfig = JSON.parse(configContent);
    } catch (error) {
      this.error(`Failed to read config file: ${error}`);
    }
    
    try {
      validateListingConfiguration(listingConfig);

      const platformClient = new PlatformClient({
        accessToken: () => accessToken,
        organizationId: organization,
      });

      const baseUrl = commerceBaseUrl(organization);
      // eslint-disable-next-line dot-notation
      await platformClient['API'].post(`${baseUrl}/listings`, listingConfig);
      this.log(`Listing configuration "${listingConfig.name}" created successfully.`);

    } catch (error) {
      this.error(`Failed to create listing configuration: ${error}`);
    }
  }

  private get configuration() {
    return new Config(this.config.configDir);
  }
}