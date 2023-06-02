export const getDefaultReportTemplate = async () => {
  const response = await fetch("./defaultTemplate.mustache");

  if (!response.body) throw Error();

  const reader = response.body.getReader();

  const { value } = await reader.read();

  return new TextDecoder().decode(value);
};
