enum ColorClass {
  green = "success",
  yellow = "redirect",
  red = "fail",
}

export const getStatusColor = (status: number): string => {
  if (status < 200) return "";

  if (status < 300) return ColorClass.green;

  if (status < 400) return ColorClass.yellow;

  return ColorClass.red;
};
