const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PAGES_DIR = `${path.resolve(__dirname, 'src')}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 3003,
        static: {
            directory: path.join(__dirname, 'dist'),
          },
        watchFiles: {
            paths: ['./src/pug/**/*.pug'], 
              options: {
                usePolling: true,
              },
          },
    },
    module: {
        rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    options: {
                        pretty: true,
                    }
                },
                {
                test: /\.(jpe?g|png|svg)$/i,
                type: "asset",
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
                },
                // {
                //     test: /\.(eot|svg|ttf|woff|woff2)$/,
                //     use: ['file-loader']
                // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets'), 
                    to: path.resolve(__dirname, 'dist/assets')
                }
            ]
        }),
        ...PAGES.map(page => new HtmlWebpackPlugin ({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/,'.html')}`
        }))
    ]
}