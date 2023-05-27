import mustache from "mustache";

export const createReport = async (
  entry: chrome.devtools.network.Request,
  template: string
): Promise<string> => {
  const text = await new Promise<string>((resolve) => {
    entry.getContent((body) => {
      resolve(body);
    });
  });

  entry.response.content = {
    ...entry.response.content,
    text,
  };

  console.log("Report created for", entry.request.url);

  return mustache.render(`${template.trim()}`, entry);
};
