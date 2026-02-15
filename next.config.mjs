/** @type {import('next').NextConfig} */
import { createRequire } from 'module';

//import { NextScript } from 'next/document';
//const require = createRequire(import.meta.url);
const nextConfig = {
    distDir: 'build',
    reactStrictMode: false,
    //output: 'standalone',
    /*cacheHandler: require.resolve('./src/cache-handler.js'),
    cacheMaxMemorySize: 100, *///Mb
    /*basePath: '/categories',*/
    //webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        // Customize the config here
        //console.log('isServer', isServer)
        /*if (isServer) {
            config.output.publicPath = "";
        }*/
        // Example: Add a new rule for SVG files using @svgr/webpack
        /*config.module.rules.push({
            test: /\.worker\.mjs$/,
            use: {
                loader: "worker-loader", options: {
                    name: 'worker.mjs',
                    publicPath: '/_next/',
                },
            },
            //options: { inline: true },
        });*/
        // Example: Modify experiments (e.g., for WebAssembly)
        // config.experiments = {
        //   ...config.experiments,
        //   asyncWebAssembly: true,
        // };

        // Important: return the modified config
        //return config;
    //},
    experimental: {
        /*nextScriptWorkers: true,
        webpackBuildWorker: true,*/
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
