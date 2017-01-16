var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var autoprefixer = require('autoprefixer');
var env = process.env.WEBPACK_ENV;
var libraryName = 'Jkeyboard';
var plugins = [], outputFile;

if (env === 'build') {
    plugins.push(new UglifyJsPlugin({ minimize: true }));
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}

var config = {
    entry: __dirname + '/src/app.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        publicPath: __dirname,
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /(\.jsx|\.js)$/,
                loader: 'babel',
                include: __dirname + '/src',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'postcss', 'sass'],
                include: __dirname + '/src'
            }
        ]
    },
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    postcss: [
        autoprefixer({
            browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7']
        })
    ],
    plugins: plugins
};

module.exports = config;