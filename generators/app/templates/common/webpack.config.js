// Import required modules
const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const BrowserSyncPlugin = require("browser-sync-v3-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

module.exports = (env, argv) => {
    const mode = argv.mode;
    console.log(`Running in ${mode} mode...`);
    console.log(env);

    // Define the proxy URL for BrowserSync
    const proxy = "http://<%= vhost %>/<%= name %>";

    // Define the entry points for the webpack build
    const entry = {
        bundle: "./static/js/index.js",
        <%_ if (react) { _%>
        example_app: "./static/js/example_app/index.js",
        <%_ } _%>
        style: ["./static/scss/style.scss"],
    };

    // Define the plugins to be used in the webpack build
    const plugins = [
        // Start BrowserSync and reload the page when files change
        new BrowserSyncPlugin(
            {
                proxy: proxy,
                files: ["static/dist/*.js", "static/dist/*.css", "**/*.php", "**/*.html"],
                injectCss: true,
                open: false,
            },
            {
                reload: false,
            },
        ),
        // Remove empty script tags from the JS output
        new RemoveEmptyScriptsPlugin({ verbose: false }),
        // Extract CSS into separate files
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        <%_ if (react) { _%>
        // Provide React globally so it can be used without importing it
        new webpack.ProvidePlugin({
            React: "react",
        }),
        <%_ } _%>
    ];

    // Add a source map for easier debugging in development mode
    if (mode === "development") {
        plugins.push(
            new webpack.SourceMapDevToolPlugin({
                filename: "[file].map[query]",
            }),
        );
    }

    // Define the webpack configuration object
    return {
        // Define the entry points from `entry` variable
        entry: entry,
        // Define the output directory and file names
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "static", "dist"),
            clean: {
                keep: /.gitkeep|vendor.js/
            },
        },
        <%_ if (react) { _%>
        // Add support for importing .jsx files in addition to .js files
        resolve: { extensions: [".js", ".jsx"] },
        <%_ } else { _%>
        // Add support for importing only .js files
        resolve: { extensions: [".js"] },
        <%_ } _%>
        // Define the plugins to be used from `plugins` variable
        plugins: plugins,
        module: {
            rules: [
                {
                    <%_ if (react) { _%>
                    // Handle .js and .jsx files with babel-loader
                    test: /\.(js|jsx)$/,
                    <%_ } else { _%>
                    // Handle .js files with babel-loader
                    test: /\.(js)$/,
                    <%_ } _%>
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    // Handle .scss files with sass-loader, css-loader, and MiniCssExtractPlugin
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Extract CSS into separate file
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                // Disable URL handling in CSS
                                url: false,
                            },
                        },
                        // Compile SCSS to CSS
                        "sass-loader",
                    ],
                },
                {
                    // Match .css files
                    test: /\.css$/i,
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                // Disable URL handling in CSS
                                url: false,
                            },
                        },
                    ],
                },
            ],
        },
        // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
        optimization: {
            splitChunks: {
                chunks: "all", // Optimization should be applied to all chunks, including the entry chunk and the chunks created by import().
                minSize: 20000, // Minimum size in bytes of a chunk before it can be split. In this case, a chunk must be at least 20 kilobytes before it can be split.
                minRemainingSize: 0, // Minimum size in bytes of the remaining chunk after splitting. If the remaining chunk is smaller than this size, it won't be split. In this case, there is no minimum size requirement.
                minChunks: 1, // Minimum number of chunks that must share a module before the module is split into a separate chunk. In this case, any module that is used in at least one chunk will be split into a separate chunk.
                maxAsyncRequests: 30, // Maximum number of parallel requests for the chunks that are loaded asynchronously. In this case, a maximum of 30 parallel requests will be made.
                maxInitialRequests: 30, // Maximum number of parallel requests for the chunks that are loaded on the initial page load. In this case, a maximum of 30 parallel requests will be made.
                enforceSizeThreshold: 50000, // Threshold size in bytes for enforcing the minRemainingSize option. If the remaining chunk after splitting is larger than this size, the minRemainingSize option will be enforced. In this case, the threshold is 50 kilobytes.
                /**
                 * `cacheGroups` is an Object that allows you to group chunks
                 * and customize their behavior. The vendor cache group is
                 * used to group all modules from the node_modules folder into
                 * a single chunk, which is named vendor. The default cache
                 * group is used to group modules that don't belong to the
                 * node_modules folder into a separate chunk, which is named
                 * based on the chunk's ID. Both cache groups have a priority
                 * option that determines the order in which they are
                 * processed.
                 *
                 * The reuseExistingChunk option is set to true for both cache
                 * groups to allow them to reuse existing chunks when possible.
                 */
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                        name: "vendor",
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            },
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            pure_funcs: ["console.log"],
                        },
                    },
                }),
            ],
        },
    };
};
