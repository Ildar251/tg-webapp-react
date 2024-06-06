module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.resolve.fallback = {
          ...webpackConfig.resolve.fallback,
          "path": require.resolve("path-browserify"),
          "os": require.resolve("os-browserify/browser")
        };
        return webpackConfig;
      }
    }
  };
  