module.exports = {
    entry: __dirname + "/src/index",
    target: "web",
    output: {
<<<<<<< HEAD
        filename: "public/bundle.js",
        publicPath: "public"
        // filename: "bundle.js",
        // publicPath: "/"
=======
        path: __dirname,
        filename: "./public/bundle.js",
        publicPath: "./public"
>>>>>>> fde72efd108d318247f21039197bc7e8e31a0ce3
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
