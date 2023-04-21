const path = require("path");
const webpack = require("webpack");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

module.exports = (env, argv) => {
    const mode = argv.mode;
    console.log(`Running in ${mode} mode...`);
    console.log(env);

    const proxy = "http://localhost/b-creative-webpack/";

    const entry = {
        bundle: "./static/js/index.js",
        example_app: "./static/js/example_app/index.js",
        style: ["./static/scss/style.scss"],
    };

    const plugins = [
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
        new RemoveEmptyScriptsPlugin({ verbose: true }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new webpack.ProvidePlugin({
            React: "react",
        }),
    ];

    if (mode === "development") {
        plugins.push(
            new webpack.SourceMapDevToolPlugin({
                filename: "[file].map[query]",
            }),
        );
    }

    return {
        entry: entry,
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "static", "dist"),
            clean: true,
        },
        resolve: { extensions: [".js", ".jsx"] },
        plugins: plugins,
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                url: false,
                            },
                        },
                        "sass-loader",
                    ],
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                url: false,
                            },
                        },
                    ],
                },
            ],
        },
        optimization: {
            // https://webpack.js.org/plugins/split-chunks-plugin/#optimizationsplitchunks
            splitChunks: {
                chunks: "all",
                minSize: 20000,
                minRemainingSize: 0,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                enforceSizeThreshold: 50000,
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
        },
    };
};
