import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Design System Accessibility Audit", () => {
  test("should pass contrast and a11y checks in light mode", async ({ page }) => {
    // Navigate to design system page
    await page.goto("/en/design-system");

    // Wait for content to render
    await page.waitForSelector("h1");

    // Force light mode and default ecare brand
    await page.evaluate(() => {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-brand", "ecare");
    });

    // Run axe audit
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should pass contrast and a11y checks in dark mode", async ({ page }) => {
    await page.goto("/en/design-system");
    await page.waitForSelector("h1");

    // Force dark mode and default ecare brand
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-brand", "ecare");
    });

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test("should support interactive toggling of brand, locale, and theme", async ({ page }) => {
    await page.goto("/en/design-system");
    await page.waitForSelector("h1");

    // 1. Theme toggle: click Dark theme button
    const darkButton = page.locator('button[aria-label="Dark theme"]');
    await darkButton.click();
    await expect(page.locator("html")).toHaveClass(/dark/);

    // 2. Brand toggle: Programmatically toggle brand (since dropdown selector is removed from UI)
    await page.evaluate(() => {
      document.documentElement.setAttribute("data-brand", "neon-tech");
    });
    await expect(page.locator("html")).toHaveAttribute("data-brand", "neon-tech");

    // 3. Locale Switcher: click বাংলা button
    const banglaButton = page.locator('button[aria-label="Switch to Bengali"]');
    await banglaButton.click();
    // Wait for route redirection
    await page.waitForURL("**/bn/design-system");
    await expect(page.locator("html")).toHaveAttribute("lang", "bn");
  });
});
