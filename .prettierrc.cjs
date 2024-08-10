/** @type {import("prettier").Config} */
module.exports = {
	semi: false,
	endOfLine: 'lf',
	trailingComma: 'none',
	arrowParens: 'avoid',
	singleQuote: true,
	useTabs: true,
	jsxSingleQuote: true,
	printWidth: 120,
	tabWidth: 2,
	plugins: ['prettier-plugin-tailwindcss']
}
