var path = require("path");
var BundleTracker = require("webpack-bundle-tracker");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  context: __dirname,
  
  entry: {
    index: "./src/index.js",
    completed: "./src/CompletedRoot.js",
    login: "./src/Login.js",
    register: "./src/Register.js",
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        shared: {
          name: 'shared',
          chunks: 'all',
          enforce: true,
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },

  output: {
    path: path.resolve("../static/files/"),
    filename: "js/[name].js",
    chunkFilename: "js/[name].js",
  },

  plugins: [
    new BundleTracker({
      path: path.resolve("../"),
      filename: "webpack-stats.json",
      logTime: true,
      indent: 3,
      integrity: true,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].css",
    }),
  ],

  module: {
    rules: [
      // we pass the output from babel loader to react-hot loader
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
    ],
  },

  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx"],
  },
};
