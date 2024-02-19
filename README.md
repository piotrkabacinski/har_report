# HAR Parser

## About

Chromium extension for parsing [HAR](<https://en.wikipedia.org/wiki/HAR_(file_format)>) data and generating reports using predefined templates (default definition: `src/defaultTemplate.mustache`).

Project is in early stage of development (proof of concept 🚧) and includes only `XHR` and `fetch` requests.

<img src="https://gcdnb.pbrd.co/images/CDMYmiiM4kph.jpg?o=1" width="500" />

To test it, simply load project's `dist` content as browser [extension](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked).

## Development

```bash
npm i
```

```bash
npm t
```

```bash
npm run build
```

Each update requires manual update of the extension in the browser.
