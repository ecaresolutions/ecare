import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import EzyCheckoutClient from "./EzyCheckoutClient";
import dbConnect from "@/lib/db";
import { Page } from "@/lib/models";

export const dynamic = "force-dynamic";

export default async function EzyCheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let pageData = null;

  try {
    await dbConnect();
    const page = await Page.findOne({ key: "ezy_checkout" }).lean();
    if (page && page.content) {
      const rawContent = page.content[locale as "en" | "bn"] || page.content.en || "{}";
      pageData = JSON.parse(rawContent);
    }
  } catch (error) {
    console.error("Failed to load ezy_checkout page config from DB:", error);
  }

  return (
    <>
      <Header />
      <main className="flex-grow flex flex-col">
        <EzyCheckoutClient initialData={pageData} />
      </main>
      <Footer />
    </>
  );
}
