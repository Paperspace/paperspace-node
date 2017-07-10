# Paperspace API (v0.1.1)

![image](https://user-images.githubusercontent.com/585865/27562775-26b8acc6-5a9c-11e7-8270-2b80ca895bc5.png)

- - - -

**Heads up! This project is under construction!** We're offering this early, unstable, pre-alpha release to get early feedback and to see how it might get used in the wild. Use caution: Until we ship a release >= v1.0, expect to encounter bugs, and expect our documentation to be missing or inaccurate in places. We welcome your bug reports and suggestions via GitHub Issues!

- - - -

The **Paperspace API** is the official devkit for automating your [Paperspace](https://www.paperspace.com) account. It's currently available in JavaScript, and we plan to offer other languages and integrations in the future. For v0, we are offering basic actions such as creating machines and managing team members. This repo includes:

* [JavaScript API client](#programmatic) (for Node.js and the browser)
* [CLI](#cli)
* [API documentation](https://paperspace.github.io/paperspace-node)
* [Script Guide](scripts.md) for creating and using startup scripts

## Getting started

Your system will need [Node.js](https://nodejs.org) v4+ installed. Check that you have a recent enough version by running `node -v` in your terminal. Node.js comes bundled with `npm`, the Node.js package management tool, which you'll use to install this package.

### Installation

Install the package from npm:

    $ npm install -g paperspace-node

The reason we recommend installing it globally is so the `paperspace` command will be available on your command line everywhere on your system. If you only want to make it available within an individual Node.js project, you can install it locally by omitting the `-g` flag.

### Setup

Before you can use this tool, you'll need a [Paperspace account](https://paperspace.com). You'll use this account to obtain Paperspace API keys.

### Obtaining an API key

First, sign in to your [Paperspace account](https://paperspace.com). Click 'Launch Console' at top right. From your admin console, you should find an 'Account Info' section. There, you'll find a form where you can create API keys. You'll use the API keys you generate here to authenticate your requests.

![image](https://user-images.githubusercontent.com/585865/27563650-f2bc289e-5aa0-11e7-990f-4ed6f9bd39e7.png)

## Usage

You can interact with Paperspace's API in three ways: programatically (from within JavaScript), from the command line (using the Paperspace CLI), or using an HTTP client of your choice and the Paperspace API HTTP enpoints documented here. The JavaScript libabry and the CLI are backed by the same underlying API client.

### Programmatic

We'll be illustrating all examples using [ES5](http://speakingjs.com/es5/ch01.html) syntax and the CommonJS module format. For other systems like AMD, consider using a bundler such as Browserify.

First install the `paperspace-node` package in your project directory using:

    $ npm install paperspace-node

Within your node.js app you can import the package with:

    var paperspace_node = require('paperspace-node');

Then create an instance of the client, passing in your authentication credentials:

    var paperspace = paperspace_node({
      apiKey: '0b3c5f...' // <~ Copy+paste your key here
    });

#### Calling the API programmatically

All of the methods are namespaced by category ("machines.create" or "invoices.show") and have the same function signature. For example:

    paperspace.machines.create({
      // parameters
    }, function (err, resp) {
      // callback
    });

That is, the first argument is parameters object, and the second is a error-first callback function.

For information on all the methods available, see the [API documentation](https://paperspace.github.io/paperspace-node).

### CLI

Assuming you've installed the `paperspace-node` package, you can invoke the Paperspace CLI with:

    $ paperspace --help

For authenticated requests, the Paperspace CLI will look in two places:

- CLI argument: `--apiKey`
- Environment variable: `PAPERSPACE_API_KEY`

#### Calling the API with the CLI

The CLI provides all methods as subcommands. For example:

    $ paperspace machines create --name "My Machine" --size 50 # etc.

For information on all the methods available, see the [API documentation](https://paperspace.github.io/paperspace-node).

## [API Documentation](https://paperspace.github.io/paperspace-node)

## HTTP endpoints

If you'd prefer to interact with our HTTP API directly, and roll your own client instead of using ours, our HTTP endpoints are also described in our [API documentation](https://paperspace.github.io/paperspace-node).

NOTE: the HTTP endpoints are subject to change in the future.  We recommend using one of the programmatic APIs whenever possible to maintain forward compatibility.

### Address for HTTP endpoints

If making HTTP requests directly to the Paperspace HTTP endpoints use the following address for each request: `https://api.paperspace.io`

### Authenticating to HTTP endpoints

In order to use the HTTP API directly you must specify the `x-api-key` header with the value of the API key obtained using the procedure above.

## Other clients

If you've created an API client in a language other than JavaScript, please [let us know](mailto:support@paperspace.com) and we will link to it here.

## Sample Apps

See the directory [samples](samples/) for a few simple samples of using the node API, and the CLI in a bash script.  Note: the [jq](https://stedolan.github.io/jq/) tool is used in the bash sample for parsing JSON data.

## Contributing

We welcome contributions to this project. Please adhere to the established coding conventions within the project and submit changes using pull requests.

## Bugs / Support / Troubleshooting

For bugs with the API client, command-line utility, or the HTTP API, please file tickets using GitHub Issues on this repo. We'll do our best to respond as quickly as we can. Keep in mind that Paperspace is a small team and you may need to allow up to a week for a response.

Other issues, such as those related to your Paperspace account, your team or team members, billing, or technical issues with your Paperspace machines should be directed to [support@paperspace.com](mailto:support@paperspace.com).

## Security

Think you've discovered a security flaw or exploit? We offer bug bounties for responsible vulnerability disclosures that match our criteria. Please contact us directly at [support@paperspace.com](mailto:support@paperspace.com) and we will respond as quickly as we can.

## Disclaimer

**Use the Paperspace API with care.** This tool is provided as-is (please see our LICENSE). Know that many actions provided via our public API can result in billing charges for Paperspace services. Please be aware of Paperspace's billing policies before performing any of these actions; you'll see charges reflected in your invoice at the end of the month. Some actions, such as deactivating machines, are irreversible, resulting in permanent loss of data. Paperspace cannot recover lost data such as mistakenly deleted account information, and may only be able to give limited assistance if an action is performed mistakenly. API access will be disabled for accounts not in good standing. Keeping your account credentials secret is your responsibility. You may only use Paperspace's API to store, retrieve, query, serve, and execute content that is owned, licensed or lawfully obtained by you.

## License

This project is open source, under the ISC license. See LICENSE.txt.

## Copyright

Copyright :copyright: 2017 Paperspace - All Rights Reserved
