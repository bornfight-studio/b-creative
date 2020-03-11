const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const safeParser = require("postcss-safe-parser");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV === "production";
const analyzeBundle = process.env.ANALYZE === "true";

const plugins = [
  new MiniCssExtractPlugin({
    filename: "style.css"
  }),
  // ProvidePlugin - Automatically load modules instead of having to import or require them everywhere.
  // @see https://webpack.js.org/plugins/provide-plugin/
  // recommended way is to load modules on demand by using async import
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    gsap: "gsap",
    is: "is_js"
  }),
  new webpack.DefinePlugin({
    "process.env.NODE_ENV": '"production"'
  }),
  new BrowserSyncPlugin(
    {
      host: "localhost",
      port: 3000,
      proxy: "<%= vhostName %>/<%= name %>",
      files: [
        "**/*.php",
        "**/*.html",
        "./static/dist/*.js",
        "./static/dist/*.css"
      ]
    },
    {
      reload: false
    }
  )
];

if (isProduction) {
  plugins.push(
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false,
          annotation: true
        },
        parser: safeParser,
        discardComments: {
          removeAll: true
        }
      }
    })
  );
}

if (analyzeBundle) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: "server"
    })
  );
}

module.exports = {
  entry: {
    bundle: "./static/js/index.js"
  },
  output: {
    path: path.join(__dirname, "static/dist"),
    filename: "[name].js",
    publicPath: "static/dist/"
  },
  devtool: "source-map",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "static/js"),
      style: path.resolve(__dirname, "static/scss")
    },
    modules: ["node_modules"],
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, "static/js"), /node_modules/],
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: !isProduction,
              url: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: plugins,
  externals: {}
};
