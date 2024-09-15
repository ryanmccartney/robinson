const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/build"),
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].[contenthash].js",
    },
    optimization: {
        splitChunks: {
            chunks: "all",
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        unused: true,
                        dead_code: true,
                    },
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: { loader: "babel-loader" },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
        new ESLintPlugin({
            overrideConfig: {
                rules: {
                    semi: "error",
                    "prefer-const": "error",
                },
                parser: "@babel/eslint-parser",
                parserOptions: {
                    sourceType: "module",
                    allowImportExportEverywhere: true,
                },
            },
        }),
    ],
    devServer: {
        hot: true,
        port: 3000,
        historyApiFallback: true,
        allowedHosts: "all",
        proxy: [
            {
                context: ["/api"],
                target: "http://backend:3100",
            },
        ],
    },
};
