const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ESLintPlugin = require('eslint-webpack-plugin');
// const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// env
// eslint-disable-next-line no-underscore-dangle
const __DEV__ = process.env.NODE_ENV !== 'production';

// paths
const resolveSrc = (p) => path.resolve(__dirname, 'src', p);
const outputPath = path.resolve(__dirname, 'dist');
const publicPath = __DEV__ ? '' : `./`;

function getCssLoaders(modules = false) {
  return [
    require.resolve('style-loader'),
    require.resolve('cache-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        modules: modules
          ? {
              localIdentName: '[name]_[local]_[hash:base64:5]',
              exportLocalsConvention: 'camelCase',
            }
          : false,
        url: !__DEV__,
        importLoaders: 2,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          plugins: [
            autoprefixer({
              remove: false,
            }),
          ],
        },
      },
    },
    require.resolve('less-loader'),
  ].filter(Boolean);
}

const config = {
  mode: 'development',
  context: __dirname,
  entry: resolveSrc('./index.tsx'),
  output: {
    filename: 'js/[name].js',
    path: outputPath,
    publicPath,
  },
  devtool: 'cheap-module-eval-source-map',

  optimization: {
    minimize: false,
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'common', // the same as entry common
          test: 'common', // the same as entry common
          enforce: true, // unknown usage
        },
      },
    },
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname, '../'), 'node_modules'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          // NOTE: !!! cache-loader会让一些针对代码编译的配置不能及时生效，因为配置虽然变了但是代码文件未修改
          // 它会直接去读cache，导致那些代码不能被新的配置编译
          //
          // 遇到这种问题时考虑关掉cache-loader 或者多编译几次
          require.resolve('cache-loader'),
          {
            loader: require.resolve('babel-loader'),
            options: {
              babelrc: false,
              plugins: [
                // 作用待定
                // [
                //   require.resolve('@babel/plugin-transform-runtime'),
                //   {
                //     absoluteRuntime: false,
                //     corejs: false,
                //     helpers: true,
                //     regenerator: true,
                //     useESModules: false,
                //   },
                // ],

                // proposal
                require.resolve('@babel/plugin-proposal-optional-chaining'),
                require.resolve('@babel/plugin-proposal-class-properties'),

                // react-refresh必须放在最后
                // @see: https://babeljs.io/docs/en/plugins#plugin-ordering
                __DEV__ && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
              presets: [
                [
                  require.resolve('@babel/preset-env'),
                  {
                    // puppeteer Chrome 81
                    targets: {
                      chrome: '81',
                    },
                  },
                ],
                require.resolve('@babel/preset-react'),
                [
                  require.resolve('@babel/preset-typescript'),
                  {
                    isTSX: true,
                    allExtensions: true,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.module?\.less$/,
        use: getCssLoaders(true),
      },
      {
        test: /\.less$/,
        use: getCssLoaders(false),
        exclude: /\.module?\.less$/,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: require.resolve('file-loader'),
      },
    ],
  },
  plugins: [
    // 使用eslint-plugin-import 进行限制，关掉这个，以加快build
    // new CaseSensitivePathsPlugin(),

    // 允许在项目中使用环境变量
    new webpack.DefinePlugin({
      'process.env.__DEV__': __DEV__,
    }),

    // 命令行进度条，会占用不少时间
    // new ProgressBarPlugin(),

    // new ESLintPlugin({
    //   extensions: ['.js', '.jsx', '.ts', '.tsx'],
    //   fix: true,
    // }),

    // typescript typo check
    new ForkTsCheckerWebpackPlugin({
      async: __DEV__,
      typescript: {
        enabled: true,
        mode: 'write-references',
        configFile: path.resolve(__dirname, './tsconfig.json'),
        typescriptPath: require.resolve('typescript'),
        diagnosticOptions: {
          syntactic: true,
          semantic: true,
          declaration: true,
          global: true,
        },
      },
    }),

    // 打包依赖分析
    // new BundleAnalyzerPlugin(),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),

    // react fast refresh
    __DEV__ && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),

  devServer: {
    contentBase: outputPath,
    disableHostCheck: true,
    compress: true,
    port: 3001,
    hot: true,
    https: false,
  },

  stats: {
    all: undefined,
    colors: true,
    children: false,
    modules: false,
  },
  performance: { hints: false },
};

module.exports = config;
