import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "bn"],

  // Used when no locale matches
  defaultLocale: "en",

  // Set to 'as-needed' so the default locale (en) is not prefixed in the URL
  localePrefix: "as-needed",
});
