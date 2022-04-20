const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const miniSVGDataURI = require("mini-svg-data-uri");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: "assets/[name]_[hash][ext]",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            // options: {
            //   modules: true, // 防止模块污染
            // },
          },
          'sass-loader'
        ],
      },
      // svg 文件
      {
        test: /\.svg$/i,
        type: "asset",
        generator: {
          dataUrl(content) {
            content = content.toString();
            return miniSVGDataURI(content);
          },
        },
      },
      // 图片文件
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: "asset", // 一般会转换为 "asset/resource"
        generator: {
          filename: "images/[name]_[hash][ext]", // 独立的配置
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb （低于8kb都会压缩成 base64）
          }
        },
      },
      // 字体文件
      {
        test: /\.(otf|eot|woff2?|ttf|svg)$/i,
        type: "asset", // 一般会转换为 "asset/inline"
        generator: {
          filename: "fonts/[name]_[hash][ext]",
        },

      },
      // 数据文件
      {
        test: /\.(txt|xml)$/i,
        type: "asset/source", // 一般会转换成 "asset/source"
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/popup.html',
      filename: 'popup.html'
    }),
    new CopyPlugin({
      patterns: [
        { from: "public" },
      ],
    }),
  ],
};