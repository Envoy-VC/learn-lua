import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
	logo: <span>My Project</span>,
	project: {
		link: 'https://github.com/Envoy-VC/learn-lua',
	},
	chat: {
		link: 'https://discord.com',
	},
	docsRepositoryBase: 'https://github.com/Envoy-VC/learn-lua',
	sidebar: {
		autoCollapse: true,
		defaultMenuCollapseLevel: 0,
	},

	footer: {
		text: 'Nextra Docs Template',
	},
};

export default config;
