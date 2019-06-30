import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

const projectRoot = path.join(__dirname, "../");

interface IWebpackEnv {
  devServerHost: string;
  devServerPort: number;
  production: boolean;
  watch: boolean;
}

const defaultEnvironment: IWebpackEnv = {
  devServerHost: "localhost",
  devServerPort: 3000,
  production: true,
  watch: false
};

const getConfig = (env = defaultEnvironment): webpack.Configuration => ({
  context: projectRoot,
  ...(env.watch
    ? {
        devServer: {
          contentBase: "./dist",
          hot: true,
          open: true,
          port: env.devServerPort,
          publicPath: "/"
        }
      }
    : {}),
  devtool: env.production ? "source-map" : "inline-source-map",
  entry: [
    ...(env.watch
      ? [
          `webpack-dev-server/client?http://${env.devServerHost}:${env.devServerPort}`,
          "webpack/hot/dev-server"
        ]
      : []),
    "./src/entry.tsx"
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
            configFile: "./.babelrc"
          }
        }
      },
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "./tsconfig.json"
          }
        }
      }
    ]
  },
  output: {
    filename: "cv.js",
    path: path.resolve(projectRoot, "dist")
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  watch: env.watch
});

export default getConfig;
