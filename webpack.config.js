var OpenBrowserPlugin = require('open-browser-webpack-plugin');
module.exports = {
    entry: "./main.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style!css"
        }]
    },
    plugins: [
    new OpenBrowserPlugin({
        url: 'http://localhost:3300'
    })
    ]
};