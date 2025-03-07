import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	base: '/newsTest',
	plugins: [react()],
	resolve: {
		alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
	},
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern',
			},
		},
	},
});
