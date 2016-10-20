# Note for developers

A brief guide for developers who want to contribute to this repo.

### Overview

This repo is responsible for two overall things:

* **Docs** covering SDK usage
* **Code** that implements the JavaScript client and CLI

#### Docs

The generated HTML docs are located inside the `docs/` folder.

These generated files are checked into Git because we are using GitHub Pages for hosting. GitHub Pages automatically serves a static site for the docs when changes are pushed to the `gh-pages` branch. The `index.html` file is the root.

To generate the docs, we are using [JSDoc 3](http://usejsdoc.org/). To regenerate the docs afresh, run the following:

    npm run docs

To configure how the docs are generated, including plugin support, see `jsdoc.json`. The template used to generate the pages is currently ([Docdash](https://github.com/clenemt/docdash)).

The actual documentation contents are written as source code comments in the JavaScript code within this repo. See `lib/machines/create` for one example.

#### Code

The source code in this repo handles two use cases:

* CLI
* Programmatic usage via a JavaScript client

##### CLI

The CLI executable is `./bin/paperspace`. (Also note the `"bin"` field inside the `package.json`.) When this package is installed via npm as a global module, the paperspace executable becomes available on the end user's system.

The CLI handler code is in `cli/index.js`. This is just a very small wrapper over the JavaScript client. It mostly just handles sending command line args into the correct function.

##### JavaScript

The entry module for the JavaScript client is `lib/index.js`. 

Implementation of the individual methods provided by the API are located in the subfolders: `lib/*/*.js`, e.g. `lib/machines/create.js`.

Although the JavaScript entry module loads these individual implementations into a single root interface that can be accessed with `require('paperspace-sdk')`, it is also set up so they can be required a la carte: `require('paperspace-sdk/lib/machines/create')`. Start following the code in `lib/paperspace.js` to understand how this happens.

###### Configuration

There is a small config file at `lib/config.js`. Parts of this are loaded conditionally depending on the current `NODE_ENV`. To connect to the production Paperspace API web service, the `NODE_ENV` should be `production`.

###### Tests

There aren't any tests yet, although there are a number of tests run automatically by the Paperspace API itself to verify that it is compatible with this client code.
