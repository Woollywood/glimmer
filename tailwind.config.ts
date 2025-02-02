import type { Config } from 'tailwindcss';

export default {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			container: {
				padding: '2rem',
				center: true,
			},
			colors: {
				'body-bg': 'rgb(var(--ui-body-bg))',
				'body-color': 'rgb(var(--ui-body-color))',
				'emphasis-color': 'rgb(var(--ui-emphasis-color))',
				'secondary-color': 'rgb(var(--ui-secondary-color))',
				'secondary-bg': 'rgb(var(--ui-secondary-bg))',
				'tertiary-color': 'rgb(var(--ui-tertiary-color))',
				'tertiary-bg': 'rgb(var(--ui-tertiary-bg))',

				heading: {
					DEFAULT: 'var(--ui-heading-color)',
				},
				primary: {
					DEFAULT: 'rgb(var(--ui-primary))',
					foreground: 'rgb(var(--ui-primary-text-emphasis))',
					subtle: 'rgb(var(--ui-primary-bg-subtle))',
					border: 'rgb(var(--ui-primary-border-subtle))',
				},
				secondary: {
					DEFAULT: 'rgb(var(--ui-secondary))',
					foreground: 'rgb(var(--ui-secondary-text-emphasis))',
					subtle: 'rgb(var(--ui-secondary-bg-subtle))',
					border: 'rgb(var(--ui-secondary-border-subtle))',
				},
				success: {
					DEFAULT: 'rgb(var(--ui-success))',
					foreground: 'rgb(var(--ui-success-text-emphasis))',
					subtle: 'rgb(var(--ui-success-bg-subtle))',
					border: 'rgb(var(--ui-success-border-subtle))',
				},
				info: {
					DEFAULT: 'rgb(var(--ui-info))',
					foreground: 'rgb(var(--ui-info-text-emphasis))',
					subtle: 'rgb(var(--ui-info-bg-subtle))',
					border: 'rgb(var(--ui-info-border-subtle))',
				},
				warning: {
					DEFAULT: 'rgb(var(--ui-warning))',
					foreground: 'rgb(var(--ui-warning-text-emphasis))',
					subtle: 'rgb(var(--ui-warning-bg-subtle))',
					border: 'rgb(var(--ui-warning-border-subtle))',
				},
				danger: {
					DEFAULT: 'rgb(var(--ui-danger))',
					foreground: 'rgb(var(--ui-danger-text-emphasis))',
					subtle: 'rgb(var(--ui-danger-bg-subtle))',
					border: 'rgb(var(--ui-danger-border-subtle))',
				},
				light: {
					DEFAULT: 'rgb(var(--ui-light))',
					foreground: 'rgb(var(--ui-light-text-emphasis))',
					subtle: 'rgb(var(--ui-light-bg-subtle))',
					border: 'rgb(var(--ui-light-border-subtle))',
				},
				dark: {
					DEFAULT: 'rgb(var(--ui-dark))',
					foreground: 'rgb(var(--ui-dark-text-emphasis))',
					subtle: 'rgb(var(--ui-dark-bg-subtle))',
					border: 'rgb(var(--ui-dark-border-subtle))',
				},

				link: {
					DEFAULT: 'rgb(var(--ui-link-color))',
					hover: 'rgb(var(--ui-link-hover-color))',
				},
				highlight: {
					DEFAULT: 'rgb(var(--ui-highlight-color))',
					bg: 'rgb(var(--ui-highlight-bg))',
				},
				code: 'rgb(var(--ui-code-color))',

				gray: {
					100: 'rgb(var(--ui-gray-100))',
					200: 'rgb(var(--ui-gray-200))',
					300: 'rgb(var(--ui-gray-300))',
					400: 'rgb(var(--ui-gray-400))',
					500: 'rgb(var(--ui-gray-500))',
					600: 'rgb(var(--ui-gray-600))',
					700: 'var(--ui-gray-700)',
					800: 'var(--ui-gray-800)',
					900: 'rgb(var(--ui-gray-900))',
				},

				border: {
					DEFAULT: 'var(--ui-border-color)',
					translucent: 'var(--ui-border-color-translucent)',
					style: 'var(--ui-border-style)',
				},

				focusRing: 'var(--ui-focus-ring-color)',

				form: {
					valid: {
						color: 'rgb(var(--ui-form-valid-color))',
						border: 'rgb(var(--ui-form-valid-border-color))',
					},
					invalid: {
						color: 'rgb(var(--ui-form-invalid-color))',
						border: 'rgb(var(--ui-form-invalid-border-color))',
					},
				},
			},
			borderRadius: {
				DEFAULT: 'var(--ui-border-radius)',
				sm: 'var(--ui-border-radius-sm)',
				lg: 'var(--ui-border-radius-lg)',
				xl: 'var(--ui-border-radius-xl)',
				'2xl': 'var(--ui-border-radius-2xl)',
				pill: 'var(--ui-border-radius-pill)',
			},
			boxShadow: {
				DEFAULT: 'var(--ui-box-shadow)',
				sm: 'var(--ui-box-shadow-sm)',
				lg: 'var(--ui-box-shadow-lg)',
				inset: 'var(--ui-box-shadow-inset)',
			},
			width: {
				border: 'var(--ui-border-width)',
				'focus-ring': 'var(--ui-focus-ring-width)',
			},
			opacity: {
				'focus-ring': 'var(--ui-focus-ring-opacity)',
			},
			fontFamily: {
				primary: ['var(--font-primary)', 'sans-serif'],
			},
			keyframes: {
				'caret-blink': {
					'0%,70%,100%': { opacity: '1' },
					'20%,50%': { opacity: '0' },
				},
			},
			animation: {
				'caret-blink': 'caret-blink 1.25s ease-out infinite',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;
