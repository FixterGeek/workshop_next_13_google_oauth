import { NextResponse } from "next/server";
import { getAccessToken, getExtraData } from "../lib/GoogleOauth2";
import { cookies } from "next/dist/client/components/headers";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  console.log("Code: ", code);
  if (code) {
    const data = await getAccessToken(code);
    const extra = await getExtraData(data.access_token);
    // save to DB
    // cookie and redirect
    cookies().set({
      name: "userId",
      value: extra.email,
      httpOnly: true,
      path: "/",
    });
    redirect("/dash");
  }
}
