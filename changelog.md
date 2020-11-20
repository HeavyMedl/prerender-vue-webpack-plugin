# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.0] - 2020-11-20

### Fixed

- Now passing `serverBundle` when instantiating a bundle renderer rather than the raw bundle source. This ensures that dependent bundles of the Vue app are properly referenced and can be rendered. Associating `serverBundle.entry` with `{@link this.entry}` in the case where we have multiple Vue applications.

### Changed

- On any exception in the `apply` webpack hook, we write the contents of `{@link this.template}` to the output path. This helps downstream processes that may rely on some form of output existing.

### Added

- Using `mkdirp` to attempt to recursively create the directory passed as an option to the plugin instance (`this.outputPath`). This helps guarantee that the directoy exists before attempting to write there.

## [2.0.2] - 2020-11-14

### Changed

- Rather than checking the aggregated entry points to determine if we're ready to execute, we check/save the emitted asset from the chunk name of the compilation. This effectually guarantees the presence of the emitted assets we need.
- Updated docs/exmaple

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
