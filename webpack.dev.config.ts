import path from "path";
import {
	Configuration as WebpackConfiguration,
	HotModuleReplacementPlugin
} from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import HtmlWebpackPlugin from "html-webpack-plugin";

interface Configuration extends WebpackConfiguration {
	devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
	mode: "development",
	output: {
		publicPath: "/"
	},
	entry: "./src/index.tsx",
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/i,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react",
							"@babel/preset-typescript"
						]
					}
				}
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: "asset/resource"
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js", ".css"]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "public/index.html"
		}),
		new HotModuleReplacementPlugin()
	],
	devtool: "inline-source-map",
	devServer: {
		static: path.join(__dirname, "build"),
		historyApiFallback: true,
		port: 3000,
		open: true,
		hot: true
	}
};

export default config;
