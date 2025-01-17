import { NextResponse } from 'next/server';

export async function GET() {
  const changePasswordUrl = `${process.env.KEYCLOAK_URL}/realms/${process.env.KEYCLOAK_REALM}/account`;
  console.log(changePasswordUrl);
  return NextResponse.redirect(changePasswordUrl, { status: 301 });
}
