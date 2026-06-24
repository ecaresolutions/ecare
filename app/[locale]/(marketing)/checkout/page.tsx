import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import CheckoutClient from "./CheckoutClient";

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        <CheckoutClient />
      </main>
      <Footer />
    </>
  );
}
