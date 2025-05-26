import {Config} from '@coveo/cli-commons/config/config';
import {PlatformClient} from '@coveo/platform-client';
import {Command, Flags} from '@oclif/core';

import {commerceBaseUrl} from '../../../../../utils/commerce-utils.js';

export interface GlobalListingConfiguration {
  facets?: {
    displayName: string;
    field: string;
    isMultiSelect?: boolean;
    ranges?: {
      end?: number;
      label?: string;
      start?: number;
    }[];
    showMoreLimit?: number;
    sortCriteria?: 'alphanumeric' | 'occurrence' | 'score';
    type: 'checkbox' | 'link' | 'slider';
    values?: string[];
  }[];
  resultTemplates?: {
    conditions?: string[];
    layout: Record<string, unknown>;
  }[];
  sorts?: {
    name: string;
    sortCriteria: {
      field: string;
      order: 'ASC' | 'DESC';
    }[];
  }[];
}

export default class CommerceListingsGlobalUpdate extends Command {
  static description = 'Update the global listing configuration';

  static examples = [
    `<%= config.bin %> <%= command.id %> --configFile path/to/config.json`,
  ];

  static flags = {
    configFile: Flags.string({
      char: 'i',
      description: 'Path to JSON file containing the global listing configuration',
      required: true,
    }),
  };

  public async run() {
    const {flags} = await this.parse(CommerceListingsGlobalUpdate);
    const {accessToken, organization} = this.configuration.get();

    if (!organization || !accessToken) {
      this.error('Organization ID or access token is not configured in the Coveo CLI. Please log in using the CLI.');
    }

    try {
      let globalConfig: GlobalListingConfiguration;
      try {
        const fs = await import('node:fs/promises');
        const configContent = await fs.readFile(flags.configFile, 'utf8');
        globalConfig = JSON.parse(configContent);
      } catch (error) {
        this.error(`Failed to read config file: ${error}`);
      }

      const platformClient = new PlatformClient({
        accessToken: () => accessToken,
        organizationId: organization,
      });

      const baseUrl = commerceBaseUrl(organization);
      // eslint-disable-next-line dot-notation
      await platformClient['API'].put(`${baseUrl}/listings/global`, globalConfig);
      
      this.log('Global listing configuration updated successfully.');

    } catch (error) {
      this.error(`Failed to update global listing configuration: ${error}`);
    }
  }

  private get configuration() {
    return new Config(this.config.configDir);
  }
}