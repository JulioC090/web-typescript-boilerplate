const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const PUBLIC_DIR = "public";

const DEV_SETTINGS = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  mode: "development",

  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "public"),
    },
    hot: true,
  },

  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.ts$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
        exclude: /node_modules/,
      },
    ],
  },

  output: {
    filename: "[name]-[hash].js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, PUBLIC_DIR, "index.html"),
      inject: "body",
    }),
  ],

  target: "web",
};

const PROD_SETTINGS = {
  entry: path.resolve(__dirname, "src", "index.ts"),
  mode: "production",

  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.ts$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/,
        exclude: /node_modules/,
      },
    ],
  },

  output: {
    filename: "[name]-bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, PUBLIC_DIR, "assets"),
          to: path.resolve(__dirname, "dist", "assets"),
        },
      ],
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, PUBLIC_DIR, "index.html"),
      inject: "body",
    }),
  ],

  target: "web",
};

module.exports = (env) => {
  return env.mode === "PROD" ? PROD_SETTINGS : DEV_SETTINGS;
};
