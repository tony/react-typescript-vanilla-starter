import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";

const projectRoot = path.join(__dirname, "../");

interface IWebpackEnv {
  devServerHost: string;
  devServerPort: string;
  production: boolean;
  watch: boolean;
}

const defaultEnvironment: IWebpackEnv = {
  devServerHost: "localhost",
  devServerPort: "3099",
  production: true,
  watch: false
};

const getConfig = ({
  devServerHost,
  production,
  watch,
  devServerPort
} = defaultEnvironment): webpack.Configuration => ({
  context: projectRoot,
  ...(process.argv.some(arg => arg.includes("webpack-dev-server"))
    ? {
        devServer: {
          contentBase: "./dist",
          hot: true,
          open: true,
          port: parseInt(devServerPort, 10),
          publicPath: "/"
        }
      }
    : {}),
  devtool: production ? "source-map" : "inline-source-map",
  entry: [
    ...(watch
      ? [
          `webpack-dev-server/client?http://${devServerHost}:${devServerPort}`,
          "webpack/hot/dev-server"
        ]
      : []),
    "./src/entry.tsx"
  ],
  mode: production ? "production" : "development",
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
  watch
});

export default getConfig;
