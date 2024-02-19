{
  const testScopeKey = "__mock_utils";

  window[testScopeKey] = {
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
            window[testScopeKey].onRequestFinishedCallback = cb;
          },
        },
      },
    },
  };
}
