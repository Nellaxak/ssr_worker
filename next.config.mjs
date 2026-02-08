/** @type {import('next').NextConfig} */
//import { createRequire } from 'module';
//const require = createRequire(import.meta.url);
const nextConfig = {
    distDir: 'build',
    reactStrictMode: false,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    // Customize the config here

    // Example: Add a new rule for SVG files using @svgr/webpack
    config.module.rules.push({
      test: /\.worker\.js$/,
        use: { loader: "worker-loader" },
    });
    // Example: Modify experiments (e.g., for WebAssembly)
    // config.experiments = {
    //   ...config.experiments,
    //   asyncWebAssembly: true,
    // };
    
    // Important: return the modified config
    return config;
  },
    /*cacheHandler: require.resolve('./src/cache-handler.js'),
    cacheMaxMemorySize: 100, *///Mb
    /*basePath: '/categories',*/
    /*experimental: {
        nextScriptWorkers: true,
        webpackBuildWorker: true,*/
        /*turbo: false, // Disables Turbopack for build/deploy
        /*turbopack: {
      root: '../../', // Adjust based on your monorepo structure
    },*/
        /*serverComponentsExternalPackages: ['worker_threads'],*/
    /*},*/
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
