import { faker } from "@faker-js/faker";

export const createRequest = (
  request: Partial<chrome.devtools.network.Request["request"]> = {}
): chrome.devtools.network.Request["request"] => ({
  method: faker.helpers.arrayElement(["GET", "POST", "PATCH", "PUT"]),
  url: faker.internet.url(),
  queryString: [],
  cookies: [],
  httpVersion: "h3",
  headers: [],
  headersSize: 0,
  bodySize: faker.number.int({ max: 100 }),
  ...request,
});

export const createResponse = (
  response: Partial<chrome.devtools.network.Request["response"]> = {}
): chrome.devtools.network.Request["response"] => ({
  status: faker.helpers.arrayElement([200, 404, 500, 422]),
  statusText: "",
  httpVersion: "h3",
  headers: [],
  cookies: [],
  content: {
    size: faker.number.int({ max: 1000 }),
    mimeType: "text/html",
    text: faker.hacker.phrase(),
  },
  redirectURL: "",
  headersSize: -1,
  bodySize: faker.number.int({ max: 1000 }),
  _transferSize: faker.number.int({ max: 1000 }),
  ...response,
});

export const createNetworkRequest = (
  request: Partial<chrome.devtools.network.Request> = {}
): Partial<chrome.devtools.network.Request> => ({
  _resourceType: faker.helpers.arrayElement(["xhr", "fetch"]),
  startedDateTime: faker.date.anytime().toISOString(),
  request: createRequest(),
  response: createResponse(),
  ...request,
});
