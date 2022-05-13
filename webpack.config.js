// Generated using webpack-cli https://github.com/webpack/webpack-cli
const path = require("path");

const config = {
  entry: path.resolve(__dirname, "./index.ts") ,
  output: {
    library: {
      name: 'hevcDetector',
      type: 'var',
      export: 'default',
    },
    filename: 'index.js',
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'umd',
    globalObject: 'this'
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
    extensions: [".ts"],
  },
};

module.exports = () => {
  return config;
};
