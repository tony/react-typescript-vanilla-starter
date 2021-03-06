import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

const projectRoot = path.join(__dirname, "../");

interface IWebpackEnv {
  devServerHost: string;
  devServerPort: string;
  open: boolean;
  production: boolean;
  watch: boolean;
}

const defaultEnvironment: IWebpackEnv = {
  devServerHost: "localhost",
  devServerPort: "3014",
  open: false,
  production: false,
  watch: false,
};

const getConfig = (env: IWebpackEnv): webpack.Configuration => ({
  context: projectRoot,
  ...(process.argv.some((arg) => arg.includes("webpack-dev-server"))
    ? {
        devServer: {
          contentBase: "./dist",
          host: env.devServerHost,
          hot: true,
          open: env.open,
          port: parseInt(env.devServerPort, 10),
          publicPath: "/",
        },
      }
    : {}),
  devtool: env.production ? "source-map" : "inline-source-map",
  entry: [
    ...(process.argv.some((arg) => arg.includes("webpack-dev-server"))
      ? [
          `webpack-dev-server/client?http://${env.devServerHost}:${env.devServerPort}`,
          "webpack/hot/dev-server",
        ]
      : []),
    "./src/entry.tsx",
  ],
  mode: env.production ? "production" : "development",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.tsx$/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: true,
            configFile: "./.babelrc",
          },
        },
      },
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "./tsconfig.json",
          },
        },
      },
    ],
  },
  output: {
    filename: "app.js",
    path: path.resolve(projectRoot, "dist"),
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  watch: env.watch,
});

export default (
  env: IWebpackEnv // Merge default environment params
) => getConfig({ ...defaultEnvironment, ...env });
