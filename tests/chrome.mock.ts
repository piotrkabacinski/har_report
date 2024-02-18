export let onRequestFinishedCallback: ((request: any) => void) | undefined;

export const resetOnRequestFinishedCallback = () => {
  onRequestFinishedCallback = undefined;
};

export const chrome = {
  devtools: {
    network: {
      onRequestFinished: {
        addListener: (cb: typeof onRequestFinishedCallback) => {
          onRequestFinishedCallback = cb;
        },
      },
    },
  },
};
