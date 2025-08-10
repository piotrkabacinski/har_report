# HAR Report

## About

Chromium extension for using [HAR](<https://en.wikipedia.org/wiki/HAR_(file_format)>) data to generate reports using predefined templates for XHR and fetch request types.

<img width="600" alt="har_report" src="https://github.com/user-attachments/assets/a83243fb-ec17-47d1-b8d2-1b4f3788fa38">

See HAR Report at [chrome web store](https://chromewebstore.google.com/detail/har-report/dahgmfemcfeekmkecfpnbpgbkflenhgc?authuser=0&hl=pl).

## Development

```bash
npm i

# Playwright needs only chromium for testing, it can be installed manually:
npx playwright install chromium
```

```bash
npm t

npm run lint
```

```bash
npm run build
```

To test it, simply load project's `dist` content as browser [extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).

Each update requires manual update of the extension in the browser.
