import { test, expect } from "@playwright/test";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createNetworkRequest } from "./utils/createNetworkRequest";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.describe("Panel", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript({ path: `${__dirname}/utils/chrome.mock.js` });
    await page.goto(`file:///${__dirname}/../.test_build/panel.html`);
  });

  test.afterEach(async ({ page }) => {
    await page.evaluate(() => {
      (window as any).__test_utils.resetOnRequestFinishedCallback();
    });
  });

  test("Render requests table", async ({ page }) => {
    const table = page.locator("table");

    expect(table).toBeDefined();
  });

  test("Render response item in the table", async ({ page }) => {
    await page.evaluate((request) => {
      (window as any).__test_utils.onRequestFinishedCallback(request);
    }, createNetworkRequest());

    const tr = await page.evaluate(() =>
      document.querySelector("table tbody tr")
    );

    expect(tr).toBeDefined();
  });
});
