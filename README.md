# Paperspace API (v0.1.16-rc4)

![image](https://user-images.githubusercontent.com/585865/27562775-26b8acc6-5a9c-11e7-8270-2b80ca895bc5.png)

- - - -

**Heads up! This project is under construction!** We welcome your bug reports and suggestions via GitHub Issues!

- - - -

The **Paperspace API** is the official devkit for automating your [Paperspace](https://www.paperspace.com) account. It is currently available in [JavaScript](#programmatic-access-via-paperspace-node) and [Python](https://github.com/Paperspace/paperspace-python), and we plan to offer other languages and integrations in the future. Currently we are offering basic actions such as creating Paperspace machines and Gradient jobs. This repository includes:

* [Paperspace CLI](#paperspace-cli) (command line interface)
* [JavaScript API client](#programmatic-access-via-paperspace-node) (for Node.js)
* [API documentation](https://paperspace.github.io/paperspace-node)
* [Script Guide](scripts.md) for creating and using startup scripts

## [Release Notes](releasenotes.md)

## Getting started

### Installation

#### Option 1: Download the pre-built 'paperspace' binary for your plaftorm

Head over to the [releases](https://github.com/Paperspace/paperspace-node/releases) section to download the latest version of the paperspace CLI for Linux, Mac, and Windows.

After downloading, make sure the 'paperspace' binary is permitted to run on your system by marking its permissions appropriately.
Also, add the directory containing the 'paperspace' binary to your path using a method appropriate for your platform.

#### Option 2: Install the paperspace-node package from npm

For this option you will need [Node.js](https://nodejs.org) v8.12.0 or later. Check your Node.js version by running `node -v`. Node.js comes bundled with `npm`, the Node.js package management tool, which you'll use to install this package.  Install the package using the -g option as follows:

    $ npm install -g paperspace-node

We recommend installing the paperspace-node package globally so that the `paperspace` command will be available on your command line everywhere on your system. If you want to make it available only within an individual Node.js project, you can install it for use only in the current directory by omitting the `-g` flag.

### Setup a Paperspace Account

Before you can use this tool, you'll need a [Paperspace account](https://paperspace.com). You'll use this account to obtain a Paperspace API key.

After creating your Paperspace account check your email to confirm your account before logging in.

### Obtaining an API key

Once you have created a Paperspace Account you will need to obtain a API key.

Your API key allows you to access the Paperspace APIs and Gradient features from the command line, or from within apps that you develop.  Each API key has an API Token name associated with it.

There are two ways to create an API key, either via the Paperspace CLI, or from within the [API](https://www.paperspace.com/console/account/api) section of your Paperspace console.

#### Option 1: Obtain an API key via Paperspace CLI

You can create your first API key by logging into your account via the Paperspace CLI:

    $ paperspace login

   -or-

    $ paperspace login [<user@domain.com>] [<password>] [--apiToken <api token name>]

If you don't already have an API key in your paperspace account, this command will generate one and give it a default API token name of 'API token'.

If you already have one or more API keys in your account, the API key associated with the first API token listed in your account is downloaded.  If you want to use a particular API key you can specify the associated API token name using the '--apiToken' option.

Note: your API key is cached in a file in your home directory: `~/.papersapce/config.json`. For security, please make sure access to the file is protected so only you can access it.

You can clear your locally cached API key at any time by executing:

    $ paperspace logout

> Note: Currently only email login is supported in the CLI - if you're using AD, SAML or GitHub to login to Paperspace, you will need t obtain an API key to log in with the CLI.


#### Option 2: Obtain an API key via your Paperspace Console

Alternatively you can create an API key from within your Paperspace console under the [API](https://www.paperspace.com/console/account/api) section. Login to your [Paperspace console](https://www.paperspace.com/console), scroll to the API section in the left navigation bar, and click [CREATE AN API KEY](https://www.paperspace.com/console/account/api). Follow the instructions there.

You will need to pick and API token name for your API key, and also provide a description.  You can copy actual the API key value associated with the API token name only at the time of initial creation.  If you need to access your API key in the future, you can instead access it by API token name using the 'paperspace login' command.

![image](https://user-images.githubusercontent.com/11018661/37693302-1f5d9100-2c95-11e8-9fa8-d000f1d40421.png)

You'll use the API keys generate here to authenticate your requests.

## Usage

You can interact with Paperspace's API in three ways: from the command line using the Paperspace CLI, programatically (from within a Javascript Nodejs application), or by using an HTTP client of your choice and the Paperspace API HTTP enpoints documented here.

### Authentication

For authenticated requests, the Paperspace CLI and Paperspace-Node module will look in three places for an api key:

1) Locally in the file `~/.paperspace/config.json`, which can be created via the Paperspace CLI by executing:

    $ paperspace login

See the previous section on [Obtaining an API key](#obtaining-an-api-key) for more information.

2) An environment variable: `PAPERSPACE_API_KEY`.  Example:

    $ export PAPERSPACE_API_KEY=1ba4f98e7c0...
    $ paperspace machines show --machineId "ps123abc"

3) A command argument: `--apiKey`.  Example:

    $ paperspace machines show --apiKey "1ba4f98e7c0..." --machineId "ps123abc"



### Paperspace CLI

Assuming you've installed the `paperspace-node` package or downloaded one of the pre-built executables, you can invoke the Paperspace CLI with:

    $ paperspace --help

You can check the version of the Paperspace CLI with:

    $ paperspace --version

#### Calling methods with the Paperspace CLI

The CLI provides all methods as subcommands, using this scheme: `paperspace <namespace> <subcommand>`. For example:

    $ paperspace machines create --apiKey "1ba4f98e7c0..." --machineName "My Machine" --size 50 ...

For information on all the methods available, see the [API documentation](https://paperspace.github.io/paperspace-node).

### Programmatic access via Paperspace-Node

You can use the Paperspace APIs programmatically by creating a Javascript Nodejs application and importing the Paperspace-Node module.

We'll be illustrating all examples using [ES5](http://speakingjs.com/es5/ch01.html) syntax and the CommonJS module format. For other systems like Asynchronous Module Definition, consider using a bundler such as Browserify.

First install the `paperspace-node` package in your project directory using:

    $ npm install paperspace-node

Within your node.js app you can import the package with:

    var paperspace_node = require('paperspace-node');

Then create an instance of the client, optionally passing in your API key:

    var paperspace = paperspace_node({
      apiKey: '1ba4f98e7c0...' // <- paste your api key here
    });

   -or-

    var paperspace = paperspace_node();

If you do not pass an apiKey parameter when creating the paperspace object the paperspace-node module will look for the environment variable value named`PAPERSPACE_API_KEY` for an API key, or in the cached api key location created by the `paperspace login` command, `~/.paperspace/config.json`.  See the [Authentication](#authentication) section above for more information.

You can get the paperspace-node version programmatically via the VERSION attribute:

    var version = paperspace_node.VERSION;

#### Calling the API programmatically

All of the methods are namespaced by category ("machines.create" or "invoices.show") and have the same function signature. For example:

    paperspace.machines.create({
      // parameters
    }, function (err, res) {
      // callback
    });

That is, the first argument is parameters object, and the second is a error-first callback function.

For information on all the methods available, see the [API documentation](https://paperspace.github.io/paperspace-node).

## Paperspace API HTTP endpoints

If you'd prefer to build your own client instead of using the Paperspace-Node library, you can use the Paperspace API HTTP endpoints directly, as described in the [API documentation](https://paperspace.github.io/paperspace-node).

NOTE: the HTTP endpoints are subject to change in the future.  We recommend using one of the programmatic APIs whenever possible to maintain forward compatibility.

### Address for the Paperspace API HTTP endpoints

If making HTTP requests directly to the Paperspace API endpoints use the following address for each request: `https://api.paperspace.io`

### Authenticating to the Paperspace API

In order to use the HTTP API directly you must specify the `x-api-key` header with the value of your API key.

## Other clients

If you've created an API client in a language other than JavaScript, please let us know at [support@paperspace.com](mailto:support@paperspace.com) and we will link to it here.

## Sample Apps

See the directory [samples](https://github.com/Paperspace/paperspace-node/tree/master/samples) for a few simple samples of using the node API, and the CLI in a bash script.  Note: the [jq](https://stedolan.github.io/jq/) tool is used in the bash sample for parsing JSON data.

## Contributing

We welcome contributions to this project. Please adhere to the established coding conventions within the project and submit changes using pull requests.

Additional information for developers is here: [developers.md](developers.md)

## Bugs / Support / Troubleshooting

For bugs with the API client, command-line utility, or the HTTP API, please file tickets using GitHub Issues on this repo. We'll do our best to respond as quickly as we can. Keep in mind that Paperspace is a small team and you may need to allow up to a week for a response.

Other issues, such as those related to your Paperspace account, your team or team members, billing, or technical issues with your Paperspace machines should be directed to [support@paperspace.com](mailto:support@paperspace.com).

## Security

Think you've discovered a security flaw or exploit? Please contact us directly at [support@paperspace.com](mailto:support@paperspace.com) and we will respond as quickly as we can.

## Disclaimer

**Use the Paperspace API with care.** This tool is provided as-is (please see our LICENSE). Know that many actions provided via our public API can result in billing charges for Paperspace services. Please be aware of Paperspace's billing policies before performing any of these actions; you'll see charges reflected in your invoice at the end of the month. Some actions, such as deactivating machines, are irreversible, resulting in permanent loss of data. Paperspace cannot recover lost data such as mistakenly deleted account information, and may only be able to give limited assistance if an action is performed mistakenly. API access will be disabled for accounts not in good standing. Keeping your account credentials secret is your responsibility. You may only use Paperspace's API to store, retrieve, query, serve, and execute content that is owned, licensed or lawfully obtained by you.

## License

This project is open source, under the ISC license. See LICENSE.txt.

## Copyright

Copyright 2018 Paperspace Co. - All Rights Reserved
