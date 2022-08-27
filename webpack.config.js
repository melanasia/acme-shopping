//var webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = {
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // plugins: [
  //   new webpack.DefinePlugin({
  //     "process.env.PUBLISHABLE_KEY": JSON.stringify(
  //       process.env.PUBLISHABLE_KEY
  //     ),
  //     "process.env.SECRET_KEY": JSON.stringify(process.env.SECRET_KEY),
  //   }),
  // ],
  plugins: [new Dotenv()],
};
