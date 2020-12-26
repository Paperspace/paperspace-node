# Paperspace CORE API (v0.1.17)

![image](https://gblobscdn.gitbook.com/assets%2F-MPHG6Ba26iNF13utTV6%2F-MPHYY90lGrr6EYQda2-%2F-MPHcBGaFsrMS4o3pK49%2FPaperspace-Core-API2.jpg?alt=media&token=68814ad8-5b9e-4e32-bc3e-0b7b0dc1aec8)

- - - -

**Heads up! This project is in beta!** We welcome your bug reports and suggestions via GitHub Issues!

- - - -

The **Paperspace CORE API** is the official devkit for automating your [Paperspace](https://www.paperspace.com) account. It is currently available through the use of standard HTTP requests as well as a [JavaScript client ](#programmatic-access-via-paperspace-node) for Node.js. We plan to offer other languages and integrations in the future. This repository includes:

* [JavaScript API client](#programmatic-access-via-paperspace-node) (for Node.js)
* [API documentation](https://docs.paperspace.com/paperspace-core-api/)
* [Script Guide](scripts.md) for creating and using startup scripts

## [Release Notes](releasenotes.md)

## Getting started

### Installation

#### Install the paperspace-node package from npm

For this option you will need [Node.js](https://nodejs.org) v8.12.0 or later. Check your Node.js version by running `node -v`. Node.js comes bundled with `npm`, the Node.js package management tool, which you'll use to install this package.  Install the package using the -g option as follows:

    $ npm install -g paperspace-node

We recommend installing the paperspace-node package globally so that the `paperspace` command will be available on your command line everywhere on your system. If you want to make it available only within an individual Node.js project, you can install it for use only in the current directory by omitting the `-g` flag.

### Setup a Paperspace Account

Before you can use this tool, you'll need a [Paperspace account](https://paperspace.com). You'll use this account to obtain a Paperspace API key.

After creating your Paperspace account check your email to confirm your account before logging in.

### Obtaining an API key

Once you have created a Paperspace Account you will need to obtain a API key.

Your API key allows you to access the Paperspace CORE API via conventional HTTP requests or from within apps that you develop.  

There is currently only one way to create an API key: from within the section of your Paperspace [console](https://console.paperspace.com/).

#### Obtain an API key via your Paperspace Console

You can create an API key from within your Paperspace console under the API section. Login to your Paperspace [console](https://console.paperspace.com/), visit your team settings page, locate the API section, and follow the instructions to create a new API key.

![image](https://gblobscdn.gitbook.com/assets%2F-MPHG6Ba26iNF13utTV6%2F-MPHHhZfbOlON5PSGssR%2F-MPHQboL5Tb8LGmyElah%2Fimage.png?alt=media&token=2cbc4cc3-4982-483f-8b1a-c7adb961cb78)

You'll use the API keys generated here to authenticate your requests.

## Usage

You can interact with CORE API in two ways: by using an HTTP client of your choice and the Paperspace API HTTP endpoints or programmatically from within a Javascript Node.js application.

### Authentication

For authenticated requests, the Paperspace-Node module will look for an api key:

An environment variable: `PAPERSPACE_API_KEY`.  Example:

    $ export PAPERSPACE_API_KEY=1ba4f98e7c0...
    $ paperspace machines show --machineId "ps123abc"

See the previous section on [Obtaining an API key](#obtaining-an-api-key) for more information.


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

For information on all the methods available, see the [API documentation](https://docs.paperspace.com/paperspace-core-api/).

## Paperspace API HTTP endpoints

If you'd prefer to build your own client instead of using the Paperspace-Node library, you can use the Paperspace API HTTP endpoints directly, as described in the [API documentation](https://docs.paperspace.com/paperspace-core-api/).

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

Copyright 2021 Paperspace Co. - All Rights Reserved
