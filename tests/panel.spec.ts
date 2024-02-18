import { test, expect } from "@playwright/test";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {
  chrome,
  resetOnRequestFinishedCallback,
  onRequestFinishedCallback,
} from "./chrome.mock.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.describe("Panel", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript({ path: `${__dirname}/chrome.mock.js` });
    await page.goto(`file:///${__dirname}/../.test_build/panel.html`);
  });

  test.afterEach(() => {
    resetOnRequestFinishedCallback();
  });

  test("Render h1 message", async ({ page }) => {
    const h1 = page.locator("h1");

    const text = await h1.textContent();

    chrome.devtools.network.onRequestFinished.addListener((request) => {
      console.log(request);
    });

    expect(text).toBe("Panel");
  });
});
