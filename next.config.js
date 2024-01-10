const { webpack } = require('next/dist/compiled/webpack/webpack');

const withNextra = require('nextra')({
	theme: 'nextra-theme-docs',
	themeConfig: './theme.config.tsx',
});

module.exports = withNextra({
	webpack: (config, options) => {
		config.resolve.fallback = {
			path: false,
			fs: false,
			child_process: false,
			crypto: false,
			url: false,
			module: false,
		};

		return config;
	},
});
