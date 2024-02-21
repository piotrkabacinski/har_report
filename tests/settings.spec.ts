import { test, expect } from "@playwright/test";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testScopeKey = "__mock_utils";

test.describe("Settings", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript({ path: `${__dirname}/utils/chrome.mock.js` });
    await page.goto(`/settings.html`);
  });

  test.afterEach(async ({ page }) => {
    await page.evaluate((testScopeKey) => {
      (window as any)[testScopeKey].resetStorage();
    }, testScopeKey);
  });

  test("Renders template field with default template and enables form for editing", async ({
    page,
  }) => {
    const content = await page.evaluate(
      () =>
        document.querySelector<HTMLTextAreaElement>("#report-template")!.value
    );

    const isTextAreaDisabled = await page.evaluate(() => {
      const textarea =
        document.querySelector<HTMLTextAreaElement>("#report-template");

      if (!textarea) return;

      return textarea.getAttribute("disabled") === undefined;
    });

    const isSubmitButtonDisabled = await page.evaluate(() => {
      const button = document.querySelector<HTMLButtonElement>(
        "form button[type='submit']"
      );

      if (!button) return;

      return button.getAttribute("disabled") === undefined;
    });

    expect(content).toBeDefined();
    expect(isSubmitButtonDisabled).toBe(false);
    expect(isTextAreaDisabled).toBe(false);
  });
});

test.describe("Settings custom template", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript({ path: `${__dirname}/utils/chrome.mock.js` });
    await page.addInitScript({
      content: `window.chrome.storage.local.set({
          har_parser_settings: {
            template: "foo",
          },
        })`,
    });

    await page.goto(`/settings.html`);
  });

  test("Render template field with custom template if there's such", async ({
    page,
  }) => {
    const content = await page.evaluate(
      () =>
        document.querySelector<HTMLTextAreaElement>("#report-template")!.value
    );

    expect(content).toBe("foo");
  });
});
