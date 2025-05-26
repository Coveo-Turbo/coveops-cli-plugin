export interface ListingConfigurationModel {
  displayName: string;
  facets: Facet[];
  filter: string;
  isActive?: boolean;
  name: string;
  parameters?: Record<string, string>;
  resultTemplates: ResultTemplate[];
  sorts: Sort[];
}

export interface ResultTemplate {
  conditions?: string[];
  layout: Record<string, unknown>;
}

export interface Sort {
  name: string;
  sortCriteria: SortCriterion[];
}

export interface SortCriterion {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface Facet {
  displayName: string;
  field: string;
  isMultiSelect?: boolean;
  ranges?: Range[];
  showMoreLimit?: number;
  sortCriteria?: 'alphanumeric' | 'occurrence' | 'score';
  type: 'checkbox' | 'link' | 'slider';
  values?: string[];
}

export interface Range {
  end?: number;
  label?: string;
  start?: number;
}

export function commerceBaseUrl(organizationId:string) {
  return `/rest/organizations/${organizationId}/commerce/v2/configurations`;
}

export function validateListingConfiguration(config: ListingConfigurationModel) {
  if (!config.name) {
    throw new Error('Name is required for listing configuration');
  }

  if (!config.displayName) {
    throw new Error('Display name is required for listing configuration');
  }

  if (!config.resultTemplates || config.resultTemplates.length === 0) {
    throw new Error('At least one result template is required');
  }

  if (!config.sorts || config.sorts.length === 0) {
    throw new Error('At least one sort configuration is required');
  }

  if (!config.facets || config.facets.length === 0) {
    throw new Error('At least one facet configuration is required');
  }
}