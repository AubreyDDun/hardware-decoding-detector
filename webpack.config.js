// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");

const config = {
  entry: "./lib/hevc-detector.ts",
  output: {
    library: {
      name: 'hevcDetector',
      type: 'var',
      export: 'default',
    },
    filename: 'hevc-detector.js',
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = () => {
  return config;
};
