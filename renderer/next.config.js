module.exports = {
  exportPathMap: async function () {
    return {
      "/": { page: "/home" },
    };
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
    }

    return config;
  },
};
