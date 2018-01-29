module.exports = {
    entry: __dirname + "/src/index",
    target: "web",
    output: {
        filename: "public/bundle.js",
        publicPath: "public"
        // filename: "bundle.js",
        // publicPath: "/"
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
