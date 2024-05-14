import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
	server: {
		proxy: {
			'/auth': {
				target: 'https://jinjigo-server.onrender.com',
				changeOrigin: true,
			},
		},
	},
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})
