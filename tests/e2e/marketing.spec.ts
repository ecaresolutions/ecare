import { test, expect } from "@playwright/test";

test.describe("Marketing Pages E2E Tests", () => {
  // 1. Home renders all sections in both locales
  test("should render all key sections on homepage for both English and Bengali locales", async ({ page }) => {
    // English locale
    await page.goto("/en");
    await page.waitForSelector("h1");
    await expect(page.locator("h1")).toContainText("We Create Innovative Tools to Empower Businesses");

    // Solutions section
    await expect(page.locator("text=Our Solutions")).toBeVisible();
    
    // What's so Special section
    await expect(page.locator("text=What's so Special About Ecare?")).toBeVisible();

    // At a Glance section
    await expect(page.locator("text=Ecare at A Glance")).toBeVisible();

    // What People Think About Our Products section
    await expect(page.locator("text=What People Think About Our Products")).toBeVisible();

    // highly rated section
    await expect(page.locator("text=Our Products Are Highly Rated by Thousand of Customers")).toBeVisible();

    // Switch/navigate to Bengali locale
    await page.goto("/bn");
    await page.waitForSelector("h1");
    await expect(page.locator("h1")).toContainText("আমরা বিশ্বজুড়ে ব্যবসাকে ক্ষমতায়ন করতে");

    // Solutions section (Bengali)
    await expect(page.locator("text=আমাদের সমাধানসমূহ")).toBeVisible();

    // What's so Special section (Bengali)
    await expect(page.locator("text=বিশেষত্ব কী?")).toBeVisible();
  });

  // 2. Portfolio category filter works
  test("should support interactive portfolio category filtering", async ({ page }) => {
    await page.goto("/en/portfolio");
    await page.waitForSelector("h1");

    // Check if category buttons are visible
    const allButton = page.locator("button", { hasText: "All Projects" });
    await expect(allButton).toBeVisible();

    // Click on a specific category filter if it exists in the markup
    const webDesignButton = page.locator("button", { hasText: "Web Design" });
    if (await webDesignButton.isVisible()) {
      await webDesignButton.click();
      // Wait for client state filter updates
      await page.waitForTimeout(100);
      
      // Verify items that have Web Design category are visible
      const categoryLabel = page.locator("text=Web Design").first();
      await expect(categoryLabel).toBeVisible();
    }
  });

  // 3. Team profile route resolves
  test("should navigate to team profile page and resolve successfully", async ({ page }) => {
    await page.goto("/en/team");
    await page.waitForSelector("h1");

    const profileLink = page.locator("a", { hasText: "View Profile" }).first();
    await expect(profileLink).toBeVisible();

    const targetUrl = await profileLink.getAttribute("href");
    expect(targetUrl).toContain("/team/");

    await profileLink.click();
    await page.waitForSelector("h1");
    
    // Check if back button or key information is present on profile detail page
    const backLink = page.locator("a", { hasText: "Back to Team" });
    await expect(backLink).toBeVisible();
  });
});
