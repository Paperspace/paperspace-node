# Note for developers

A brief guide for developers who want to contribute to this repo.

### Overview

This repo is responsible for two overall things:

* **Docs** covering API usage
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
* Programmatic usage via a JavaScript/Nodejs client

##### CLI

The CLI executable is `./bin/paperspace`. (Also note the `"bin"` field inside the `package.json`.) When this package is installed via npm as a global module, the paperspace executable becomes available on the end user's system.

The CLI handler code is in `cli/index.js`. This is just a very small wrapper over the JavaScript client. It mostly just handles sending command line args into the correct function.

##### JavaScript

The entry module for the JavaScript client is `lib/index.js`.

Implementation of the individual methods provided by the API are located in the subfolders: `lib/*/*.js`, e.g. `lib/machines/create.js`.

Although the JavaScript entry module loads these individual implementations into a single root interface that can be accessed with `require('paperspace-node')`, it is also set up so they can be required a la carte: `require('paperspace-node/lib/machines/create')`. Start following the code in `lib/paperspace.js` to understand how this happens.

###### Configuration

There is a small config file at `lib/config.js`. Parts of this are loaded conditionally depending on the current `NODE_ENV`. To connect to the production Paperspace API web service, the `NODE_ENV` should be `production`.  The values for the production api and logs server names can be overriden with these enviroment variables:

PAPERSPACE_CONFIG_HOST
PAPERSPACE_CONFIG_LOG_HOST

#### Building

The paperspace cli requires node 8.6.3 or later, and uses a `package.json` and `package.json-lock` file to maintain a list of required dependencies.
Upon cloning the repository from github, or pulling a new version, run the following in the root of the repository to update the runtime and development dependencies:

    npm install

Note: if you already have a different version installed locally or globally, you may need to run these commands first:

    npm uninstall paperspace
    npm uninstall -g paperspace

##### Building binaries

The npm module `pkg` is used to build the paperspace cli binaries for linux, macos, and windows.
You can build local versions of the binaries by running the following at the root of the repository:

    pkg .

###### Tests

There aren't any tests yet, although there are a number of tests run automatically by the Paperspace API itself to verify that it is compatible with this client code.
