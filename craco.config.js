module.exports = {
  webpack: {
    configure: (config) => {
			// Remove CRA's TypeScript checker (the thing that makes the error overlay)
			config.plugins = config.plugins.filter(
				(plugin) =>
					plugin.constructor?.name !== "ForkTsCheckerWebpackPlugin"
			);

			return config;
		},
    resolve: {
      fallback: {
        fs: false,
      },
    },
  },
};
