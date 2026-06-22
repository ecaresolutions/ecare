import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLoginForm from "./login-form";

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  
  if (session === "session_token_value_ok") {
    redirect("/admin/dashboard");
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center relative">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] aspect-square bg-red-200/20 dark:bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] aspect-square bg-blue-200/20 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <AdminLoginForm />
    </div>
  );
}
