export const sleep = (time = 0): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
