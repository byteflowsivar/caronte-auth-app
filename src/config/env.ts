export const env = {
  NEXT_PUBLIC_APPLICATION_NAME: process.env.NEXT_PUBLIC_APPLICATION_NAME ?? 'Caronte Auth',
  NEXT_PUBLIC_COMPANY_NAME: process.env.NEXT_PUBLIC_COMPANY_NAME ?? 'Byteflow Sivar',
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api',
  API_URL: process.env.API_URL ?? 'http://localhost:3000/api',
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID ?? 'caronte-auth',
  KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET ?? 'k6HCBtYd10J5pIdTyeEuRFpSIVbO02xK',
  KEYCLOAK_ISSUER:
    process.env.KEYCLOAK_ISSUER ?? 'https://dev-auth.victorcornejo.com/realms/byteflow',
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM ?? 'byteflow',
  KEYCLOAK_URL: process.env.KEYCLOAK_URL ?? 'https://dev-auth.victorcornejo.com',
  NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? 'http://localhost:3000',
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? 'ZUz2kPff2NRIu00oIiRXky9x2QeI/5lrxP04bGHLlQ8=',
  NODE_ENV: process.env.NODE_ENV ?? 'development',
};
