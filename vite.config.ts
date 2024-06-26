import { fileURLToPath, URL } from "url";
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    },
    test: {
        globals: true,
        environment: 'jsdom',
        includeSource: ["src/**/*.{js,ts,vue}"],
        server: {
            deps: {
                inline: ['vuetify'],
            },
        },
    },
})
