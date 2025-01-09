export enum AuthenticationProviderType {
  Saml = 'saml',
  Sharepoint = 'sharepoint',
}

export function searchAuthenticationBaseUrl(organizationId:string){
  return `/rest/organizations/${organizationId}/authentication`;
}

export interface SamlAuthenticationProviderModel {
  assertionConsumerServiceUrl: string;
  enforceTrustedUris: boolean;
  expiration: number;
  metadata: string;
  name: string;
  organization: string;
  provider: string;
  relyingPartyIdentifier: string;
}

export interface SharepointClaimsAuthenticationProviderModel {
  expiration: number;
  metadata: string;
  name: string;
  organization: string;
  provider: string;
  secret: string;
  uri: string;
}

export type AuthenticationProviderPayload =
  | SamlAuthenticationProviderModel
  | SharepointClaimsAuthenticationProviderModel;

export function buildAuthProviderPayload(
  type: AuthenticationProviderType,
  payload: Partial<SamlAuthenticationProviderModel & SharepointClaimsAuthenticationProviderModel>
): AuthenticationProviderPayload {
  if (type === 'saml') {
    // Ensure that required SAML properties are provided
    if (
      !payload.assertionConsumerServiceUrl ||
      payload.enforceTrustedUris === undefined ||
      !payload.relyingPartyIdentifier
    ) {
      throw new Error('Missing required fields for SAML authentication provider.');
    }

    return {
      assertionConsumerServiceUrl: payload.assertionConsumerServiceUrl || `https://platform.cloud.coveo.com/rest/search/v2/login/${payload.name}?organizationId=${payload.organization}`,
      enforceTrustedUris: payload.enforceTrustedUris,
      expiration: payload.expiration || 0,
      metadata: payload.metadata || '',
      name: payload.name || '',
      organization: payload.organization || '',
      provider: payload.provider || '',
      relyingPartyIdentifier: payload.relyingPartyIdentifier,
    };
  }
 
  if (type === 'sharepoint') {
    // Ensure that required SharePoint properties are provided
    if (!payload.secret || !payload.uri) {
      throw new Error('Missing required fields for SharePoint authentication provider.');
    }

    return {
      expiration: payload.expiration || 0,
      metadata: payload.metadata || '',
      name: payload.name || '',
      organization: payload.organization || '',
      provider: payload.provider || '',
      secret: payload.secret,
      uri: payload.uri,
    };
  } 
  
  throw new Error(`Unsupported authentication provider type: ${type}`);
  
}

export async function downloadMetadata(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
      throw new Error(`Failed to fetch metadata. HTTP status: ${response.status}`);
  }

  return response.text();
}

