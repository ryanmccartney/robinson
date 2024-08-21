const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: { path: path.join(__dirname, "/build"), filename: "bundle.js" },
    module: {
        rules: [
            { test: /.js$/, exclude: /node_modules/, use: { loader: "babel-loader" } },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
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
