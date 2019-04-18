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

    yarn run docs

To configure how the docs are generated, including plugin support, see `jsdoc.json`. The template used to generate the pages is currently ([Docdash](https://github.com/clenemt/docdash)).

The actual documentation contents are written as source code comments in the JavaScript code within this repo. See `lib/machines/create` for one example.

#### Code

The source code in this repo handles two use cases:

* CLI
* Programmatic usage via a JavaScript/Nodejs client

##### CLI

The CLI executable is `./bin/paperspace`. (Also note the `"bin"` field inside the `package.json`.) When this package is installed via yarn/npm as a global module, the paperspace executable becomes available on the end user's system.

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

    yarn install

Note: if you already have a different version installed locally or globally, you may need to run these commands first:

    yarn uninstall paperspace
    yarn uninstall -g paperspace

##### Building binaries

The yarn module `pkg` is used to build the paperspace cli binaries for linux, macos, and windows.
You can build local versions of the binaries by running the following at the root of the repository:

    pkg .

###### Tests

There aren't any tests yet, although there are a number of tests run automatically by the Paperspace API itself to verify that it is compatible with this client code.

#### Developing in conjunction with another repository

If you are developing this repository in conjunction with another, you can [`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/) your local version of the @paperspace/client-sdk into the host repository:

```
yarn link
```

After this, you want to run `yarn link @paperspace/client-sdk` in the host repository to activate it.

**NB**: Once you are done developing @paperspace/client-sdk remember to run `yarn unlink @paperspace/client-sdk` in the host repository and `yarn unlink` in the root of this repository! This link will stay active, even if you switch branches or pull the latest changes until you unlink them.

**NBB**: Yarn does not work very well with passphrase prompts - [it basically ignores them](https://github.com/yarnpkg/yarn/issues/3699) - so if you use that for you ssh-key, please use [`ssh-add`](https://www.ssh.com/ssh/add) to remember your authentication for the given session.

#### Publish a new version

This repository is set up to publish a new version on a new tag. To publish a new version, first pull latest changes from development, and checkout a new release branch, where `<new-version>` is the new version you are about to publish. If you are not quite sure about your change yet you can use a [pre-release version](https://semver.org/#spec-item-9) before you release an actual version change:
```
$ git pull --rebase
$ git checkout -b release_v<new-version>
```

Add a new section in the [releasenotes.md](releasenotes.md) document and change the version in the head of [this](#note-for-developers).

After this run `yarn version` (pro-tip: use `--patch`, `--minor` or `--major` flags to automatically increment the version) and type in the new version:
```
$ yarn version
info Current version: 1.0.0
question New version: <new-version> # Do not prefix with 'v'!
...
✨ Successfully released version v<new-version>! The tag build process will publish it ✨
```
Yarn will run `preversion` and `postversion` scripts to commit the version change and the new tag. CircleCI will pick up on the newly created tag and automatically publish the version.

Be sure to create a pull request to merge your version change back into development!

That's it! Now you can install it with either `yarn add @paperspace/client-sdk@latest` or `yarn add @paperspace/client-sdk@<new-version>`.

**NB**: Even if the version number is lower than a previously released version, it will be installed as the latest version!

**NBB**: You cannot publish over an existing version. The best way to handle this situation is to release a new patch or minor version.
