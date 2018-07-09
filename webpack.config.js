
const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    devServer: {
        contentBase: './'
    }
};