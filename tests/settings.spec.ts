import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { testScopeKey } from "./utils/testScopeKey";
import { sleep } from "./utils/sleep";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

  test("Render template field with default template and enable form for editing", async ({
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

  test("Save custom template in storage", async ({ page }) => {
    const customTemplate = faker.hacker.noun();

    await page.evaluate((customTemplate) => {
      document.querySelector<HTMLTextAreaElement>("#report-template")!.value =
        customTemplate;

      document
        .querySelector<HTMLFormElement>("form")!
        .dispatchEvent(new Event("submit"));
    }, customTemplate);

    const savedTemplate = await page.evaluate(async () => {
      return (await window.chrome.storage.local.get("har_parser_settings"))[
        "har_parser_settings"
      ]["template"];
    });

    expect(savedTemplate).toBe(customTemplate);
  });
});

test.describe("Custom template", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript({ path: `${__dirname}/utils/chrome.mock.js` });
    await page.addInitScript({
      content: `window.chrome.storage.local.set({
          har_parser_settings: {
            template: "foo",
          },
        });
        
        window.confirm = () => true;`,
    });

    await page.goto(`/settings.html`);
  });

  test("Render custom template content if there's such", async ({ page }) => {
    const content = await page.evaluate(
      () =>
        document.querySelector<HTMLTextAreaElement>("#report-template")!.value
    );

    expect(content).toBe("foo");
  });

  test("Restore default template", async ({ page }) => {
    await page.evaluate(() => {
      document
        .querySelector<HTMLButtonElement>("#restore-template")!
        .dispatchEvent(new Event("click"));
    });

    const content = await page.evaluate(
      () =>
        document.querySelector<HTMLTextAreaElement>("#report-template")!.value
    );

    expect(content).not.toBe("foo");
  });
});
