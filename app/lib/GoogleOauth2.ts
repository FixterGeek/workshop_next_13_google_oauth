export const reidrectToGoogle = () => {
  console.log("ENV: ", process.env.GOOGLE_CLIENT_ID);
  return (
    "https://accounts.google.com/o/oauth2/auth?" +
    new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID as string,
      redirect_uri:
        process.env.ENV === "development"
          ? "http://localhost:8787"
          : "https://hono-login.blissmo.workers.dev",
      response_type: "code",
      scope: "https://www.googleapis.com/auth/userinfo.email",
    })
  );
};

export const getAccessToken = (code: string) => {
  const url =
    "https://oauth2.googleapis.com/token?" +
    new URLSearchParams({
      code,
      client_secret: process.env.GOOGLE_SECRET as string,
      grant_type: "authorization_code",

      client_id: process.env.GOOGLE_CLIENT_ID as string,
      redirect_uri:
        process.env.ENV === "development"
          ? "http://localhost:8787"
          : "https://hono-login.blissmo.workers.dev",
      response_type: "code",
      scope: "https://www.googleapis.com/auth/userinfo.email",
    });
  return fetch(url, {
    method: "post",
    headers: { "content-type": "application/json" },
  })
    .then((r) => r.json())
    .catch((e) => ({ ok: false, error: e }));
};

export const getExtraData = (access_token: string | undefined) => {
  if (!access_token) return { ok: false, error: "No token" };
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  return fetch(url, {
    headers: {
      Authorization: "Bearer " + access_token,
    },
  })
    .then((r) => r.json())
    .catch((e) => ({ ok: false, error: e }));
};
