{
  const testScopeKey = "__mock_utils";

  window[testScopeKey] = {
    storage: {},
    onRequestFinishedCallback: undefined,
    resetOnRequestFinishedCallback: () => {
      this.onRequestFinishedCallback = undefined;
    },
    resetStorage: () => {
      this.storage = {};
    }
  };

  window.chrome = {
    runtime: {
      id: "mock",
    },
    storage: {
      local: {
        set: async (value = {}) => {
          Object.assign(window[testScopeKey].storage, value);
        },
        get: async (key) => {
          return {
            [key]: window[testScopeKey].storage[key],
          };
        },
      },
    },
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
