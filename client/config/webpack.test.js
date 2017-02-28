const helpers = require('./helpers');

/**
 * Webpack Plugins
 */
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

/**
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = {

  /**
   * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
   *
   * Do not change, leave as is or it wont work.
   * See: https://github.com/webpack/karma-webpack#source-maps
   */
  devtool: 'inline-source-map',

  /**
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {

    /**
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['.ts', '.js'],

    /**
     * Make sure root is src
     */
    modules: [helpers.root('src'), 'node_modules'],

  },

  /**
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {

    /**
     * An array of automatically applied loaders.
     *
     * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
     * This means they are not resolved relative to the configuration file.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    rules: [

      /**
       * Tslint loader support for *.ts files
       *
       * See: https://github.com/wbuchwalter/tslint-loader
       */
      {
        enforce: 'pre',
        test: /\.ts$/,
        use: {
          loader: 'tslint-loader',
          options: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src',
          },
        },
        exclude: [helpers.root('../node_modules')],
      },

      /**
       * Source map loader support for *.js files
       * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
       *
       * See: https://github.com/webpack/source-map-loader
       */
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          helpers.root('../node_modules/rxjs'),
          helpers.root('../node_modules/@angular'),
          helpers.root('../node_modules/angular2-moment'),
        ]
      },

      /**
       * Typescript loader support for .ts and Angular 2 async routes via .async.ts
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader
       */
      {
        test: /\.ts$/,
        use: [
          {
            loader: '@angularclass/hmr-loader',
            options: {
              pretty: false,
              prod: true,
            },
          },
          {
            loader: 'awesome-typescript-loader',
            options: {
              compilerOptions: {
                removeComments: true,
              },
            },
          },
          'angular2-template-loader',
        ],
      },

      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        use: 'json-loader'
      },

      /*
       * Otherwise, we're always using style-loader
       */
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              context: helpers.root('src'),
            },
          },
        ],
        exclude: [/\.component\.css$/]
      },

      /*
       * We're importing component sass-styles as css-modules
       */
      {
        test: /\.component\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: true,
              sourceMap: true,
              localIdentName: '[hash:base64:10]',
              context: helpers.root('src'),
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [helpers.root('src')],
            },
          },
        ]
      },

      /*
       * Otherwise, we're using just a style-loader
       */
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              context: helpers.root('src'),
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [helpers.root('src')],
            },
          },
        ],
        exclude: [/\.component\.scss$/]
      },

      /**
       * Raw loader support for *.html
       * Returns file content as string
       *
       * See: https://github.com/webpack/raw-loader
       */
      { test: /\.html$/, use: 'raw-loader', exclude: [helpers.root('src/index.html')] },

    ],
  },

  /**
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [

    new LoaderOptionsPlugin({
      debug: true,
    }),

    /**
     * Plugin: ContextReplacementPlugin
     * Description: Provides context to Angular's use of System.import
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
     * See: https://github.com/angular/angular/issues/11580
     */
    new ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src'), // location of your src
      {
        // your Angular Async Route paths relative to this root directory
      }
    ),

    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    // NOTE: when adding more properties make sure you include them in custom-typings.d.ts
    new DefinePlugin({
      ENV: JSON.stringify(ENV),
      HMR: false,

      'process.env': {
        ENV: JSON.stringify(ENV),
        NODE_ENV: JSON.stringify(ENV),
        HMR: false,
      },
    }),

  ],

  /**
   * Include polyfills or mocks for various node stuff
   * Description: Node configuration
   *
   * See: https://webpack.github.io/docs/configuration.html#node
   */
  node: {
    global: true,
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false,
    dns: 'mock',
    net: 'mock',
  }

};
