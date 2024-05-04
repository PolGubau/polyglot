import { Config } from 'tailwindcss';
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				background: '#fafafa',
				dark: '#9a3412',
				main: '#fdba74'
			}
		}
	},
	plugins: []
} satisfies Config;
