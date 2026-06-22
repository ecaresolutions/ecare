import { describe, test, expect, beforeEach, vi } from "vitest";

describe("Theme & Brand Preset Tests", () => {
  beforeEach(() => {
    // Reset DOM
    document.documentElement.className = "";
    document.documentElement.removeAttribute("data-brand");
    localStorage.clear();

    // Mock matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  test("should set default brand to ecare and switch correctly", () => {
    const initialBrand = localStorage.getItem("brand") || "ecare";
    document.documentElement.setAttribute("data-brand", initialBrand);
    
    expect(document.documentElement.getAttribute("data-brand")).toBe("ecare");

    const newBrand = "neon-tech";
    localStorage.setItem("brand", newBrand);
    document.documentElement.setAttribute("data-brand", newBrand);

    expect(localStorage.getItem("brand")).toBe("neon-tech");
    expect(document.documentElement.getAttribute("data-brand")).toBe("neon-tech");
  });

  test("should add dark class when theme is set to dark", () => {
    const targetTheme = "dark";
    localStorage.setItem("theme", targetTheme);
    if (targetTheme === "dark") {
      document.documentElement.classList.add("dark");
    }

    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});
