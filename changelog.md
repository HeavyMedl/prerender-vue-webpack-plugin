# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2020-11-14

### Fixed

- Plugin was expecting `options.context` for template data which didn't match the documentation. Passing `options.templateContext` now behaves as expected.
- Webpack compilation `afterEmit` tap is firing when application assets are emitted and when `VueSSRServerPlugin` emits the server bundle file. Introduced logic that ensures the assets needed for rendering the Vue app and inlining CSS via Critters is available when executing the HTML transformations regardless of order to call of `afterEmit`.

## [2.0.0] - 2020-11-13

### Changed

- Removed `vue-server-renderer` as a direct dependency of the plugin as clients versions of `vue-loader`/`vue-template-compiler` may cause build conflicts. The package is now defined as a peer dependency. `PrerenderVueWebpackPlugin` is now a default export.

```javascript
const PrerenderVueWebpackPlugin = require("prerender-vue-webpack-plugin");
```
