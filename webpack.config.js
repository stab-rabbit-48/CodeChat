const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './index.html',
    })
  ],
  devServer: {
    historyApiFallback: true, 
    static: {
      publicPath: '/dist',
      directory: path.resolve(__dirname, 'dist'),
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    port:8080,
    proxy: {
      '/': 'http://localhost:3000',
    },
    hot: false, 
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['', '.js', '.jsx'],
  },
};
