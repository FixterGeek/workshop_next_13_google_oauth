import { redirect } from "next/navigation";
import HomeComponent from "./components/Home";
import { reidrectToGoogle } from "./lib/GoogleOauth2";
import { cookies } from "next/headers";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // look for cookie
  const cookieStore = cookies();
  if (cookieStore.has("userId")) {
    // return redirect("/dash"); // do we need it?
  }

  // look for code
  const code = searchParams.code;
  if (code) {
    redirect("/api?code=" + code);

    const startLogin = async () => {
      "use server";
      const url = reidrectToGoogle();
      redirect(url);
    };

    return <HomeComponent action={startLogin} />;
  }
}
