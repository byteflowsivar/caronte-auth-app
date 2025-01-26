const getToken = async () => {
  try {
    const url = 'https://dev-auth.victorcornejo.com/realms/byteflow/protocol/openid-connect/token';
    const data = new URLSearchParams();
    data.append('client_id', 'caronte-auth');
    data.append('username', 'victor.cornejo');
    data.append('password', 'Desierto2542$');
    data.append('grant_type', 'password');

    const requestToken = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data.toString(),
    });

    if (!requestToken.ok) {
      throw new Error(`Error ${requestToken.status}: ${requestToken.statusText}`);
    }
    return (await requestToken.json()).access_token;
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
};

// Obtener la informacion del usuario
const getUserInfo = async (token) => {
  try {
    const url =
      'https://dev-auth.victorcornejo.com/realms/byteflow/protocol/openid-connect/userinfo';
    const requestUserInfo = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!requestUserInfo.ok) {
      throw new Error(`Error ${requestUserInfo.status}: ${requestUserInfo.statusText}`);
    }

    return await requestUserInfo.json();
  } catch (error) {
    console.error(`Error: ${error}`);
    return null;
  }
};

(async () => {
  try {
    const token = await getToken();
    console.log(`Token: ${token}`);
    let tokenTemp =
      'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2aGl3cXJ1dU1jaVUxZm9tZUZmTWZZQ3RDNXNQcHVCNUg3VWVRSlpnVFRzIn0.eyJleHAiOjE3MzYwMzM0OTgsImlhdCI6MTczNjAzMzE5OCwiYXV0aF90aW1lIjoxNzM2MDMzMTk3LCJqdGkiOiJmMzExNDk4Mi1lNzljLTRlNGEtOTgzMS0wZmI5NjE0NjJkZmQiLCJpc3MiOiJodHRwczovL2Rldi1hdXRoLnZpY3RvcmNvcm5lam8uY29tL3JlYWxtcy9ieXRlZmxvdyIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJhZjZkZGM1My1lOWYyLTRlOTItYjZiZi1kYjUxYzUxOTRjODQiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJjYXJvbnRlLWF1dGgiLCJzaWQiOiJiOGVmM2U0MC03Yjk5LTRhODktOGY1Zi03NGE0YTJiNTJhYTYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtYnl0ZWZsb3ciXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJWaWN0b3IgQ29ybmVqbyIsInByZWZlcnJlZF91c2VybmFtZSI6InZpY3Rvci5jb3JuZWpvIiwiZ2l2ZW5fbmFtZSI6IlZpY3RvciIsImZhbWlseV9uYW1lIjoiQ29ybmVqbyIsImVtYWlsIjoicmV4MjAwMnhwQGdtYWlsLmNvbSJ9.djUM3_jAZVHUid0DpEaO9JvxbAdG92BzeZ80grmb9dvlkVpiDiVhfUcH68tFe8xigeGXF67RO55Wuss3N7-0V7VWIRbhO67g5AekMGk0uxzcnsirnc_19Mwx3cH0z7L9LySSUBtfyfMEGRCHbiU8unmN4fElKzrsYciFHQl1bNxiEJISdgfdyaP8St2O0DxDnxr9_mWpHZRCjaEFvNyakZqh3atwVvR87ToqxS5bE_zSkA4ugQJZ-Vk5TayoQ3ko4_XUMpSSiEQWJPgvQtyvqJVQy69rnuOnX7mSZLSnjZa_TIC_qwP5-z2ns-Cy_MXE3i0CNc8ybnmNQbH0XLvAsg';
    if (tokenTemp) {
      console.log('Token obtenido correctamente');
      const userInfo = await getUserInfo(token);
      console.log(`User Info: ${JSON.stringify(userInfo)}`);
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
})();
