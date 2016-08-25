# Paperspace SDK (v0.0.0)

- - - -

**Heads up! This project is under construction!** We're offering this early, unstable, pre-alpha release to get early feedback and to see how it might get used in the wild. Use caution: Until we ship a release >= v1.0, expect to encounter bugs, and expect our documentation to be missing or inaccurate in places. We welcome your bug reports and suggestions via GitHub Issues!

- - - -

The **Paperspace SDK** is the official devkit for automating your [Paperspace](https://paperspace.com) account. It's currently available in JavaScript, and we plan to offer other languages and integrations in the future. For v0, we are offering basic actions such as creating machines and managing team members. This repo includes:

* [JavaScript API client](#programmatic) (for Node.js and the browser)
* [CLI](#cli)
* [API documentation](https://paperspace.github.io/paperspace-sdk)

## Getting started

Your system will need [Node.js](https://nodejs.org) v4+ installed. Check that you have a recent enough version by running `node -v` in your terminal. Node.js comes bundled with `npm`, the Node.js package management tool, which you'll use to install this SDK.

### Installation

Install the package from npm:

    $ npm install -g paperspace-sdk

The reason we recommend installing it globally is so the `paperspace` command will be available on your command line everywhere on your system. If you only want to make it available within an individual Node.js project, you can install it locally by omitting the `-g` flag.

### Setup

Before you can use this tool, you'll need a [Paperspace account](https://paperspace.com). For v0, you'll use your Paperspace.com login credentials (email/password) to obtain API access tokens. We'll be offering a more robust API token system soon.

## Usage

You can interact with Paperspace's API in two ways: programatically (from within JavaScript), or from the command line. Both tools are backed by the same underlying API client. The method and parameters are the same format for both.

### Programmatic

We'll be illustrating all examples using [ES5](http://speakingjs.com/es5/ch01.html) syntax and the CommonJS module format. For other systems like AMD, consider using a bundler such as Browserify.

Assuming you've installed the `paperspace-sdk` package, you can import the SDK with:

    var paperspace = require('paperspace-sdk');

Then create an instance of the client, passing in your authentication credentials:

    var ps = paperspace({
      authEmail: 'mrrobot@example.com',
      authPassword: 'secret123'
    });

If you already have an _access token_, you can pass that instead:

    var ps = paperspace({
      token: 'a03ikfdj29j0f...'
    });

We plan to provide a more robust auth system soon.

That's all you need to get going. The client will handle authenticating your requests transparently.

#### Calling the API programmatically

All of the methods are namespaced by category ("machines.create" or "invoices.show") and use the same function signature. For example:

    ps.machines.create({
      // parameters
    }, function (err, resp) {
      // callback
    });

That is, the first argument is parameters object, and the second is a error-first callback function.

For information on all the methods available, see the [API documentation](https://paperspace.github.io/paperspace-sdk).

### CLI

Assuming you've installed the `paperspace-sdk` package, you can call the Paperspace CLI with:

    $ paperspace --help

For authenticated requests, the Paperspace CLI will look in three places:

- CLI arguments: `--authEmail` and `--authPassword` (or `--token` if you have an access token)
- Environment variables: `PAPERSPACE_AUTH_EMAIL` and `PAPERSPACE_AUTH_PASSWORD` (or `PAPERSPACE_TOKEN`)

We plan to provide a more robust auth system soon.

#### Calling the API with the CLI

The CLI provides all methods as subcommands. For example:

    $ paperspace machines create --name "My Machine" --size "50GB" # etc.

For information on all the methods available, see the [API documentation](https://paperspace.github.io/paperspace-sdk).

## [API Documentation](https://paperspace.github.io/paperspace-sdk)

## HTTP endpoints

If you'd prefer to interact with our HTTP API directly, and roll your own client instead of using ours, our HTTP endpoints are also described in our [API documentation](https://paperspace.github.io/paperspace-sdk). If you've created an API client in a language other than JavaScript, please [let us know](mailto:support@paperspace.com) and we will link to it here.

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

Copyright &ncopy; 2016 Paperspace - All Rights Reserved
