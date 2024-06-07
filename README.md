# HAR Report

## About

Chromium extension for using [HAR](<https://en.wikipedia.org/wiki/HAR_(file_format)>) data to generate reports using predefined templates for XHR and fetch request types.

<img width="600" alt="har_report" src="https://github.com/piotrkabacinski/HARilized/assets/3975783/abe3fada-c04f-486c-a55f-de4d66a2ff5c">

To test it, simply load project's `dist` content as browser [extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).

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

Each update requires manual update of the extension in the browser.
