import { NextAuthOptions, Profile } from 'next-auth';
import KeycloakProvider, { KeycloakProfile } from 'next-auth/providers/keycloak';
import { decodeToken } from 'react-jwt';
import { env } from '@/config/env';
import { OAuthConfig } from 'next-auth/providers/oauth';
import { JWT } from 'next-auth/jwt';

const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    KeycloakProvider({
      clientId: env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: env.KEYCLOAK_ISSUER as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      try {
        let decodedToken;
        if (account) {
          decodedToken = decodeToken(account.access_token);
          if (token == null) {
            throw new Error('Unable to decode token');
          }
          profile = decodedToken as Profile;
          token.account = account;
        }
        if (profile) {
          token.profile = profile;
          token.client_roles = profile.realm_access.roles;
        }

        console.log('NODE_ENV => ', env.NODE_ENV);

        if (process.env.NODE_ENV === 'development') {
          console.log('--------------ACCOUNT---------------');
          console.log(account);
          console.log('--------------ACCESS TOKEN ---------------');
          console.log(decodedToken);
          console.log('--------------ROLES---------------');
          console.log(token.client_roles);
          console.log('--------------PROFILE---------------');
          console.log(JSON.stringify(profile));
        }
      } catch (error) {
        console.log(error);
      }
      return token;
    },
    async session({ session, token }) {
      console.log('async session accessed');

      session.account = token.account as object;
      session.profile = token.profile as object;
      session.roles = token.client_roles as object;

      console.log('--------------SESSION---------------');
      console.log(typeof token);
      console.log(`session => `, JSON.stringify(token.profile));
      return session;
    },
  },
  events: {
    async signOut({ token }: { token: JWT }) {
      console.info('signOut event triggered');
      console.info('token => ', JSON.stringify(token));

      if (token.account.provider === 'keycloak') {
        const issuerUrl = (
          authOptions.providers.find((p) => p.id === 'keycloak') as OAuthConfig<KeycloakProfile>
        ).options!.issuer!;
        const logOutUrl = new URL(`${issuerUrl}/protocol/openid-connect/logout`);
        logOutUrl.searchParams.set('id_token_hint', token.account.id_token!);

        console.log('logOutUrl => ', logOutUrl);

        await fetch(logOutUrl);
      }
    },
  },
  pages: {
    signIn: '/auth/login',
  },
};

export { authOptions };
