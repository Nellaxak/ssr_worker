/** @type {import('next').NextConfig} */
import { createRequire } from 'module';
import worker_threads, { parentPort, workerData } from 'node:worker_threads';

//import { NextScript } from 'next/document';
const require = createRequire(import.meta.url);
const nextConfig = {
    distDir: 'build',
    reactStrictMode: false,
    /*cacheHandler: require.resolve('./src/cache-handler.js'),
    cacheMaxMemorySize: 100, *///Mb
    /*basePath: '/categories',*/
    experimental: {
        /*nextScriptWorkers: true,
        webpackBuildWorker: true,*/
        experimental: {
            turbo: false, // Disables Turbopack for build/deploy
        },
        /*turbopack: {
      root: '../../', // Adjust based on your monorepo structure
    },*/
        /*serverComponentsExternalPackages: ['worker_threads'],*/
    },
    //destination: '/categories?viewtype=main&page=0',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/categories?viewtype=main&page=0&scroll=start',
                permanent: true
            },
        ]
    },
};
export default nextConfig;
