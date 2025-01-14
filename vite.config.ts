import path from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { checker } from 'vite-plugin-checker';

// https://vite.dev/config
export default defineConfig({
	plugins: [
		react(),
		checker({
			overlay: false,
			typescript: { tsconfigPath: './tsconfig.json' },
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
