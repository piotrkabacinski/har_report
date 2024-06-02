# HAR Report

## About

Chromium extension for using [HAR](<https://en.wikipedia.org/wiki/HAR_(file_format)>) data to generate reports using predefined templates for XHR and fetch request types.

<img src="https://gcdnb.pbrd.co/images/CDMYmiiM4kph.jpg?o=1" width="500" />

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
