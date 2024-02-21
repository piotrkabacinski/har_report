export const getDefaultReportTemplate = async () => {
  const response = await fetch("./defaultTemplate.mustache");

  if (!response.body) throw `No template response`;

  const reader = response.body.getReader();

  const { value } = await reader.read();

  return new TextDecoder().decode(value);
};
