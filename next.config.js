module.exports = {
    webpack: (config) => {
      // Disable the canvas alias
      config.resolve.alias.canvas = false;
  
      return config;
    },
  };
  