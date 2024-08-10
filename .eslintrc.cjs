module.exports = {
	extends: [
		'eslint:recommended',
		'next/core-web-vitals',
		'plugin:@typescript-eslint/strict-type-checked',
		'plugin:@typescript-eslint/stylistic-type-checked'
	],
	plugins: ['@typescript-eslint', 'simple-import-sort'],
	parserOptions: {
		project: './tsconfig.json'
	},
	overrides: [
		// override "simple-import-sort" config
		{
			files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
			rules: {
				'simple-import-sort/imports': [
					'warn',
					{
						groups: [
							// Packages `next` related packages come first.
							['^next', '^@?\\w'],
							// Internal packages.
							['^(@|components)(/.*|$)'],
							// Side effect imports.
							['^\\u0000'],
							// Parent imports. Put `..` last.
							['^\\.\\.(?!/?$)', '^\\.\\./?$'],
							// Other relative imports. Put same-folder imports and `.` last.
							['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
							// Style imports.
							['^.+\\.?(css)$']
						]
					}
				]
			}
		}
	],
	ignorePatterns: ['tailwind.config.ts', 'environment.d.ts', 'next.config.mjs', 'postcss.config.mjs'],
	rules: {
		'simple-import-sort/exports': 'warn',
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': 'error'
	}
}
