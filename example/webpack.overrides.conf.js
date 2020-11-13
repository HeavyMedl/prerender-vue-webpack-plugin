const https = require('https');
const phin = require('phin');
const {
  PrerenderVueWebpackPlugin,
} = require('../index');
const config = require('./config.json');

/**
 * Brings in a custom Webpack manifest to pull the URLs of the external
 * CSS assets used by the application that we want to inline. Then, adds
 * them to the {@link compilation} so that Critters can process them.
 *
 * @param   {Object}  compiler     Webpack compiler object
 * @param   {Object}  compilation  Webpack compilation object
 *
 * @return  {void}
 */
async function addExternalStylesheets(compiler, compilation) {
  const { externals = {} } = config;
  const manifest = JSON.parse(
    compilation.assets['manifest.json'].source(),
  );
  return Promise.all(
    Object.keys(externals).map(async (externalKey) => {
      const cssUrl = Object.values(manifest[externalKey]).find(
        (asset) => /\.css(\?[^.]+)?$/.test(asset),
      ) || '';
      try {
        const { body } = await phin({
          url: cssUrl,
          timeout: 2000,
          core: {
            agent: new https.Agent({
              rejectUnauthorized: false,
            }),
          },
        });
        const cssSource = body.toString();
        // eslint-disable-next-line no-param-reassign
        compilation.assets[externalKey] = {
          source() {
            return cssSource;
          },
          size() {
            return cssSource.length;
          },
        };
      } catch (error) {
        console.log(error);
      }
    }),
  );
}
module.exports = {
  plugins: [
    new PrerenderVueWebpackPlugin({
      entry: 'details',
      root: '#app',
      template: 'src/main/resources/templates/details.html',
      templateContext: {},
      hook: addExternalStylesheets,
      inlineCSS: {
        entries: ['global-style', 'details-style'],
        externals: ['bootstrap.css'],
      },
      critters: {
        inlineFonts: true,
      },
    }),
  ],
};
