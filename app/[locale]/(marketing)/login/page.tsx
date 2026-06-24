import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  return (
    <>
      <Header />
      <main className="flex-grow flex items-center justify-center py-16 bg-[#f8fafc] dark:bg-transparent">
        <LoginClient />
      </main>
      <Footer />
    </>
  );
}
