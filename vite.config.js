import { defineConfig } from "vite";
import { resolve, dirname } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { readdir } from 'fs/promises';

const Checkpath = async () => {
    const dirnamex = resolve(__dirname, 'src')
    const result = {};
    const dir = await readdir(dirnamex)
    dir.forEach(d => {
        if (d.indexOf("_") == -1) {
            result[d.split('.')[0]] = resolve(__dirname, 'src', d)
        }
    })
    return result
}

export default defineConfig({
    root: 'src',
    plugins: [handlebars({
        partialDirectory: resolve(__dirname, 'src/_inculde'),
    })],
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: await Checkpath()
        },
        emptyOutDir: '../dist'
    },
    publicDir: '../public',
})

