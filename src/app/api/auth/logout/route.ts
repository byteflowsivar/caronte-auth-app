import { NextResponse } from 'next/server';

export async function GET() {
  const urlLogout = `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL as string)}&client_id=${process.env.KEYCLOAK_CLIENT_ID}`;
  console.log(urlLogout);
  return NextResponse.redirect(urlLogout);
}
