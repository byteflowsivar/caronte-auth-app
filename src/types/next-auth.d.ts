import 'next-auth';

/**
 * Este archivo es una extension de next-auth para agregar los tipos de datos de la sesion y el perfil
 */
declare module 'next-auth' {
  interface Session {
    account: object;
    profile: object;
    roles: object;
  }

  interface Profile {
    realm_access: {
      roles: string[];
    };
  }

  export interface Account extends Partial<TokenSet> {
    /**
     * Propiedades de la cuenta con el proveedor Keycloak
     */
    access_token: string;
    expires_at: number;
    refresh_expires_in: number;
    refresh_token: string;
    token_type: string;
    id_token: string;
    session_state: string;
    scope: string;
  }
}
