window.__test_utils = {
  onRequestFinishedCallback: undefined,
  resetOnRequestFinishedCallback: () => {
    this.onRequestFinishedCallback = undefined;
  },
};

window.chrome = {
  devtools: {
    network: {
      onRequestFinished: {
        addListener: (cb) => {
          window.__test_utils.onRequestFinishedCallback = cb;
        },
      },
    },
  },
};
