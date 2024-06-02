# HAR Report

## About

Chromium extension for using [HAR](<https://en.wikipedia.org/wiki/HAR_(file_format)>) data to generate reports using predefined templates for XHR and fetch request types.

<img width="600" alt="har_report_10" src="https://github.com/piotrkabacinski/HARilized/assets/3975783/873e569f-88f3-44b3-b2bd-7efcef62d7da">

To test it, simply load project's `dist` content as browser [extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).

## Development

```bash
npm i

# Playwright needs only chromium for testing, it can be installed manually:
npx playwright install chromium
```

```bash
npm t
```

```bash
npm run build
```

Each update requires manual update of the extension in the browser.
