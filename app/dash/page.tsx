import { redirect } from "next/navigation";
import Dash from "../components/Dash";
import { cookies } from "next/headers";

export default function DashboardPage({ searchParams }: any) {
  const cookieStore = cookies();
  const email = cookieStore.get("userId");
  if (!email) {
    return redirect("/");
  }

  const handleLogout = async () => {
    "use server";
    cookies().delete("userId");
    redirect("/");
  };

  return <Dash onSubmit={handleLogout} email={email.value} />;
}
