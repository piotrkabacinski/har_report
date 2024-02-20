import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createNetworkRequestEntry } from "./utils/createNetworkRequestEntry";
import { sleep } from "./utils/sleep";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testScopeKey = "__mock_utils";

test.describe("Panel", () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript({ path: `${__dirname}/utils/chrome.mock.js` });
    await page.goto(`/panel.html`);
  });

  test.afterEach(async ({ page }) => {
    await page.evaluate((testScopeKey) => {
      (window as any)[testScopeKey].resetOnRequestFinishedCallback();
    }, testScopeKey);
  });

  test("Render empty requests table", async ({ page }) => {
    const table = page.locator("table");

    expect(table).toBeDefined();

    const ths = await page.evaluate(() =>
      Array.from(
        document.querySelector("table thead tr")!.querySelectorAll("th")
      ).map(({ innerText }) => innerText)
    );

    const labels = ["Time", "Method", "Status", "Path"];

    expect(ths.length).toBe(labels.length);

    for (let index in ths) {
      expect(ths[index]).toBe(labels[index]);
    }

    const tr = await page.evaluate(() =>
      document.querySelector("table tbody tr")
    );

    expect(tr).toBeNull();
  });

  test("Render response item in the table", async ({ page }) => {
    const entry = createNetworkRequestEntry();

    await page.evaluate(
      ([entry, testScopeKey]: any[]) => {
        (window as any)[testScopeKey].onRequestFinishedCallback(entry);
      },
      [entry, testScopeKey]
    );

    const tr = await page.evaluate(() =>
      document.querySelector("table tbody tr")
    );

    const counter = await page.evaluate(
      () => document.querySelector("#status")?.textContent
    );

    const entryItems = await page.evaluate(() => {
      return Array.from(
        document.querySelector("table tbody tr")!.querySelectorAll("td")
      ).map(({ innerText }) => ({
        innerText,
      }));
    });

    expect(tr).toBeDefined();
    expect(counter).toBe("Entries: 1");

    const expects = [
      undefined,
      entry.request?.method,
      entry.response?.status.toString(),
      "/",
    ];

    for (const index in entryItems) {
      if (index === "0") {
        expect(entryItems[index].innerText).not.toBe("Invalid Date");
        continue;
      }

      expect(entryItems[index].innerText).toBe(expects[index]);
    }
  });

  test("Toggle response report", async ({ page }) => {
    const entry = createNetworkRequestEntry();
    const content = `<p>${faker.hacker.noun()}</p>`;

    await page.evaluate(
      ([entry, testScopeKey, content]: any[]) => {
        (window as any)[testScopeKey].onRequestFinishedCallback({
          ...entry,
          getContent: (cb) => {
            cb(content);
          },
        });
      },
      [entry, testScopeKey, content]
    );

    let isReportHidden = await page.evaluate(() =>
      document.querySelector("#report-0")?.classList.contains("hidden")
    );

    expect(isReportHidden).not.toBe(null);

    await page.evaluate(() => {
      document
        .querySelector("#button-0 > button")
        ?.dispatchEvent(new Event("click"));
    });

    await sleep(50);

    isReportHidden = await page.evaluate(() =>
      document.querySelector("#report-0")?.classList.contains("hidden")
    );

    expect(isReportHidden).toBe(false);

    const reportContent = await page.evaluate(
      () => document.querySelector("#report-0 td pre")?.textContent
    );

    expect(reportContent?.match(content)).not.toBe(null);
    expect(reportContent?.match(`${entry.response?.status}`)).not.toBe(null);
    expect(reportContent?.match(`${entry.request?.method}`)).not.toBe(null);
    expect(reportContent?.match(`${entry.request?.url}`)).not.toBe(null);
  });

  test("Clear out entries", async ({ page }) => {
    const entry = createNetworkRequestEntry();

    await page.evaluate(
      ([entry, testScopeKey]: any[]) => {
        (window as any)[testScopeKey].onRequestFinishedCallback(entry);
      },
      [entry, testScopeKey]
    );

    let counter = await page.evaluate(
      () => document.querySelector("#status")?.textContent
    );

    expect(counter).toBe("Entries: 1");

    await page.evaluate(() => {
      document.querySelector("#reset")?.dispatchEvent(new Event("click"));
    });

    counter = await page.evaluate(
      () => document.querySelector("#status")?.textContent
    );

    expect(counter).toBe("Entries: 0");

    const tr = await page.evaluate(() =>
      document.querySelector("table tbody tr")
    );

    expect(tr).toBeNull();
  });

  test("Pause and restore events listening", async ({ page }) => {
    const entry = createNetworkRequestEntry();

    let buttonText = await page.evaluate(
      () => document.querySelector("#pause")?.textContent
    );

    let isStatusDotActive = await page.evaluate(() =>
      document
        .querySelector("#status-dot")
        ?.classList.contains("status-dot--recording")
    );

    expect(buttonText).toBe("Pause");
    expect(isStatusDotActive).toBe(true);

    await page.evaluate(() => {
      document.querySelector("#pause")?.dispatchEvent(new Event("click"));
    });

    buttonText = await page.evaluate(
      () => document.querySelector("#pause")?.textContent
    );

    isStatusDotActive = await page.evaluate(() =>
      document
        .querySelector("#status-dot")
        ?.classList.contains("status-dot--recording")
    );

    expect(buttonText).toBe("Restore");
    expect(isStatusDotActive).toBe(false);

    await page.evaluate(
      ([entry, testScopeKey]: any[]) => {
        (window as any)[testScopeKey].onRequestFinishedCallback(entry);
      },
      [entry, testScopeKey]
    );

    let tr = await page.evaluate(() =>
      document.querySelector("table tbody tr")
    );

    expect(tr).toBeNull();

    // Restore:
    await page.evaluate(() => {
      document.querySelector("#pause")?.dispatchEvent(new Event("click"));
    });

    await page.evaluate(
      ([entry, testScopeKey]: any[]) => {
        (window as any)[testScopeKey].onRequestFinishedCallback(entry);
      },
      [entry, testScopeKey]
    );

    const counter = await page.evaluate(
      () => document.querySelector("#status")?.textContent
    );

    expect(counter).toBe("Entries: 1");

    tr = await page.evaluate(() => document.querySelector("table tbody tr"));

    expect(tr).not.toBeNull();

    buttonText = await page.evaluate(
      () => document.querySelector("#pause")?.textContent
    );

    isStatusDotActive = await page.evaluate(() =>
      document
        .querySelector("#status-dot")
        ?.classList.contains("status-dot--recording")
    );

    expect(buttonText).toBe("Pause");
    expect(isStatusDotActive).toBe(true);
  });

  test("Filter out invalid resource type entries", async ({ page }) => {
    const entry = createNetworkRequestEntry();
    const invalidEntry = createNetworkRequestEntry({
      _resourceType: "foo",
    });

    await page.evaluate(
      ([entry, invalidEntry, testScopeKey]: any[]) => {
        (window as any)[testScopeKey].onRequestFinishedCallback(entry);
        (window as any)[testScopeKey].onRequestFinishedCallback(invalidEntry);
      },
      [entry, invalidEntry, testScopeKey]
    );

    const tr = await page.evaluate(() =>
      document.querySelector("table tbody tr")
    );

    const counter = await page.evaluate(
      () => document.querySelector("#status")?.textContent
    );

    const entryItems = await page.evaluate(() => {
      return Array.from(
        document.querySelector("table tbody tr")!.querySelectorAll("td")
      ).map(({ innerText }) => ({
        innerText,
      }));
    });

    expect(tr).toBeDefined();
    expect(counter).toBe("Entries: 1");

    const expects = [
      undefined,
      entry.request?.method,
      entry.response?.status.toString(),
      "/",
    ];

    for (const index in entryItems) {
      if (index === "0") continue;

      expect(entryItems[index].innerText).toBe(expects[index]);
    }
  });
});
