import {Config} from '@coveo/cli-commons/config/config';
import {PlatformClient} from '@coveo/platform-client';
import {Args, Command, Flags} from '@oclif/core';

import {Facet, ListingConfigurationModel, ResultTemplate, Sort, commerceBaseUrl, validateListingConfiguration} from '../../../../utils/commerce-utils.js';

export default class CommerceListingsUpdate extends Command {
  static args = {
    name: Args.string({
      description: 'Name of the listing configuration to update',
      required: true,
    }),
  };

  static description = 'Update a specific listing configuration';

  static examples = [
    `<%= config.bin %> <%= command.id %> electronics --displayName "Electronics Updated" --configId default`,
    `<%= config.bin %> <%= command.id %> electronics --configFile path/to/config.json --configId default`,
  ];

  static flags = {
    configFile: Flags.string({
      char: 'i',
      description: 'Path to JSON file containing the full listing configuration',
    }),
    configId: Flags.string({
      char: 'c',
      description: 'The unique identifier of the listing configuration.',
      required: true,
    }),
    displayName: Flags.string({
      char: 'd',
      description: 'New display name for the listing configuration',
    }),
    filter: Flags.string({
      char: 'f',
      description: 'New filter query for the listing configuration',
    }),
    isActive: Flags.boolean({
      char: 'a',
      description: 'Set the active status of the listing configuration',
    }),
  };

  public async run() {
    const {args, flags} = await this.parse(CommerceListingsUpdate);
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
      
      // First, get the existing configuration
      // eslint-disable-next-line dot-notation
      const existingConfig = await platformClient['API'].get(`${baseUrl}/listings/${flags.configId}`);
      
      let updatedConfig: ListingConfigurationModel;

      if (flags.configFile) {
        try {
          const fs = await import('node:fs/promises');
          const configContent = await fs.readFile(flags.configFile, 'utf8');
          updatedConfig = {...existingConfig, ...JSON.parse(configContent)};
        } catch (error) {
          this.error(`Failed to read config file: ${error}`);
        }
      } else {
        updatedConfig = {
          ...existingConfig,
          displayName: flags.displayName || existingConfig.displayName as string,
          facets: existingConfig.facets as Facet[] || [], // Ensure required properties are included
          filter: flags.filter || existingConfig.filter as string,
          isActive: flags.isActive || false,
          name: existingConfig.name as string || args.name,
          resultTemplates: existingConfig.resultTemplates as ResultTemplate[] || [],
          sorts: existingConfig.sorts as Sort[] || [],
        };
      }

      validateListingConfiguration(updatedConfig);

      // eslint-disable-next-line dot-notation
      await platformClient['API'].put(`${baseUrl}/${flags.catalogId}/listings/${args.name}`, updatedConfig);
      this.log(`Listing configuration "${args.name}" updated successfully.`);

    } catch (error) {
      this.error(`Failed to update listing configuration: ${error}`);
    }
  }

  private get configuration() {
    return new Config(this.config.configDir);
  }
}