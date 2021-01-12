module.exports = {
	purge: {
		enabled: true,
		mode: 'all',
		preserveHtmlElements: false,
		content: ["./views/*.pug", "./views/include/*.pug"],
	},
	darkMode: false,
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
