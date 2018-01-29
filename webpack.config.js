module.exports = {
    entry: __dirname + "/src/index",
    target: "web",
    output: {
        path: __dirname,
        filename: "./public/bundle.js",
        publicPath: "./public"
    },
    devServer: {
        contentBase: __dirname + "/src",
    },
    module: {
        loaders: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"]
            },
            {
                test: /(\.css)$/,
                loaders: ["style", "css"]
            }
        ]
    }
};
