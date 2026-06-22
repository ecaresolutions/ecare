import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("404 Not Found Page Tests", () => {
  test("should render localized English 404 page for invalid URL under /en or default route", async ({ page }) => {
    // Navigate to a non-existent URL under the default locale
    await page.goto("/some-non-existent-page");

    // Wait for the main heading
    await page.waitForSelector("h1");

    // Verify correct English titles & descriptions are rendered using specific selectors
    await expect(page.locator("h1")).toContainText("404 - Page Not Found");
    await expect(page.locator("main p.text-muted-foreground")).toContainText(
      "Oops! The page you are looking for does not exist or has been moved."
    );
    
    const homeLink = page.locator("a", { hasText: "Go Back Home" });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute("href", "/");

    // Accessibility check
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should render localized Bengali 404 page for invalid URL", async ({ page }) => {
    // Navigate to a non-existent URL under the /bn locale
    await page.goto("/bn/some-non-existent-page");

    // Wait for the main heading
    await page.waitForSelector("h1");

    // Verify correct Bengali titles & descriptions are rendered using specific selectors
    await expect(page.locator("h1")).toContainText("৪০৪ - পাতাটি খুঁজে পাওয়া যায়নি");
    await expect(page.locator("main p.text-muted-foreground")).toContainText(
      "দুঃখিত! আপনি যে পাতাটি খুঁজছেন তা অস্তিত্বহীন বা স্থানান্তরিত হয়েছে।"
    );

    const homeLink = page.locator("a", { hasText: "হোমে ফিরে যান" });
    await expect(homeLink).toBeVisible();
    await expect(homeLink).toHaveAttribute("href", "/bn");

    // Accessibility check
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
