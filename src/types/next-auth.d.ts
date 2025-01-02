import 'next-auth';

/**
 * Este archivo es una extension de next-auth para agregar los tipos de datos de la sesion y el perfil
 */
declare module 'next-auth' {
  interface Session {
    account: any;
    profile: any;
    roles: any;
  }

  interface Profile {
    realm_access: any;
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
    scope

  }
} 