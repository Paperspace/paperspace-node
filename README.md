# Paperspace API (v0.1.8)

![image](https://user-images.githubusercontent.com/585865/27562775-26b8acc6-5a9c-11e7-8270-2b80ca895bc5.png)

- - - -

**Heads up! This project is under construction!** We're offering this early, unstable, pre-alpha release to get early feedback and to see how it might get used in the wild. Use caution: Until we ship a release >= v1.0, expect to encounter bugs, and expect our documentation to be missing or inaccurate in places. We welcome your bug reports and suggestions via GitHub Issues!

- - - -

The **Paperspace API** is the official devkit for automating your [Paperspace](https://www.paperspace.com) account. It's currently available in JavaScript, and we plan to offer other languages and integrations in the future. For v0, we are offering basic actions such as creating machines and managing team members. This repo includes:

* [Paperspace CLI](#Paperspace CLI)
* [JavaScript API client](#Programmatic access via Paperspace-Node) (for Nodejs and web browsers)
* [API documentation](https://paperspace.github.io/paperspace-node)
* [Script Guide](scripts.md) for creating and using startup scripts

## Release Notes for v0.1.8

#### New features
* New paperspace login method for acquiring and caching api tokens from the command line
* New paperspace logout method
* Support for downloading job containers from private docker repositories on job create

#### Fixes
* Minor doc fixes

## Release Notes for v0.1.7

#### New features
* New states on returned machine objects: starting, stopping, restarting, serviceready, and upgrading
* Ability to wait on state serviceready when calling machines waitfor method
* New property on returned machine objects: updatesPending
* New releasePublicIp option on machines destroy method

#### Fixes
* Fix for jobs completing too quickly could cause jobs create output to hang
* Minor doc fixes

## Release Notes for v0.1.6

#### New Features
* Pre-built binaries are now available for Windows, Mac, and Linux.  These binaries enable you to run the paperspace-node command line tool without having to install Nodejs or any additional node modules.
* New methods for early access to jobs.  Please contact hello@paperspace.com for more information.

#### Breaking Changes
*BREAKING CHANGE #1* (for Nodejs apps which use the paperspace-node module):

In previous versions (up to 0.1.5) paperspace-node methods returned an HTTP response object on success, and application code needed
to dereference through the HTTP response body object to get attributes of the returned object.
For example, when getting the name of a machine you would have code like this:
```
paperspace.machines.show({ machineId: 'ps123abc' }, function callback(err, resp) {
    if (err) return err;
    console.log(resp.body.id);
});
```
The new convention is to return the 'body' object directly in the second callback parameter, e.g.:
```
paperspace.machines.show({ machineId: 'ps123abc' }, function callback(err, resp) {
    if (err) return err;
    console.log(resp.id);
});
```
This change simplifies code that works with the returned objects, and provides better encapsulation.  The command line version of the api already followed this convention.

*BREAKING CHANGE #2* (if building the command line app or a custom Nodejs app using the source):

paperspace-node now requires Nodejs 8.9.3 or later.  This Node version is specified in the package.json file in the root of the repository.
This change is to support stand-alone binaries of the paperspace-node command line tool that don't require a separate installation of Node.
Previously Node 4.2.3 or later was required, but that version of Node will soon no longer be maintained (after April 2018). You can read more about Node's support cycle here: [Node Releases](https://github.com/nodejs/Release)

#### Fixes
* Minor doc fixes

## Release Notes for v0.1.5

#### New features
* New method: machines update
* machines show method now includes last 10 events associated with the machine

#### Fixes
* Minor doc fixes

## Release Notes for v0.1.4

#### New features
* New method: machines availability

#### Fixes
* Minor doc fixes

## Release Notes for v0.1.3

#### New features
* New method: machines utilization

#### Fixes
* Minor doc fixes
* List method exact date searches now work
* List method null value searches now work

## Release Notes for v0.1.2

#### New features
* Support for [startup scripts](scripts.md)
* scripts namespace and methods
* Assign a new public ip address on machines create method
* Query filters on list methods
* Support for [paperspace terraform provider](https://github.com/Paperspace/paperspace-terraform)

#### Fixes
* fix for cli false input values being converted to strings
* minor doc fixes

#### Issues
* List method exact date searches don't find matches
* List method null value searches don't find matches

## Getting started

### Installation

Option 1: Download the pre-build binary for your plaftorm:

Pre-built binaries are available for:
* [Windows](https://s3.amazonaws.com/paperspace-node/v0.1.8/win/paperspace.exe)
* [Mac](https://s3.amazonaws.com/paperspace-node/v0.1.8/mac/paperspace)
* [Linux](https://s3.amazonaws.com/paperspace-node/v0.1.8/linux/paperspace)

After downloading, make sure the binary is permitted to run on your system by marking its permissions appropriately.
Also, add the directory containing the paperspace binary to your path using a method appropriate for your platform.

Option 2: Install the paperspace-node package from npm:

For this option your system will need [Node.js](https://nodejs.org) v8+ installed. Check that you have a recent enough version by running `node -v` in your terminal. Node.js comes bundled with `npm`, the Node.js package management tool, which you'll use to install this package.  Install the package using the -g option as follows:

    $ npm install -g paperspace-node

The reason we recommend installing it globally is so the `paperspace` command will be available on your command line everywhere on your system. If you only want to make it available only within an individual Node.js project, you can install it locally by omitting the `-g` flag.

### Setup a Paperspace Account

Before you can use this tool, you'll need a [Paperspace account](https://paperspace.com). You'll use this account to obtain Paperspace API keys.

### Obtaining an API key

After you have set up a Paperspace account, you can create your first API token and key by logging into your account via the Paperspace CLI: 

    $ paperspace login

   -or-

    $ paperspace login [<user@domain.com>] [<password>] [--apiToken <api token name>]

If you don't already have an api token in your paperspace account, this command will generate one.  If you already have and api key, the
first one listed in your account is downloaded.  If you have more than one you can use the `--apiToken` option to specify the one to
download.

Note: for security, please make sure access to the file `~/.papersapce/config.json` is protected in your environment.

You can clear your locally cached api key at any time by executing:

    $ paperspace logout

Alternatively you can create an API key by signing in to your [Paperspace account](https://paperspace.com). Click 'Launch Console' at top right. From your admin console, you should find an 'Account Info' section. There, you'll find a form where you can create API keys. You'll use the API keys you generate here to authenticate your requests.  You will need to pick and API token name for your API key, and also provide a description.

![image](https://user-images.githubusercontent.com/585865/27563650-f2bc289e-5aa0-11e7-990f-4ed6f9bd39e7.png)

Note: when creating an API token and key this way you need to copy the API key value immedately, as the API key value will not be visble
in the web user interface later.

## Usage

You can interact with Paperspace's API in three ways: from the command line using the Paperspace CLI, programatically (from within a Javascript Nodejs application), or by using an HTTP client of your choice and the Paperspace API HTTP enpoints documented here.

### Authentication 

For authenticated requests, the Paperspace CLI and Paperspace-Node module will look in three places for an api key:

1) Locally in the file `~/.papersapce/config.json`, which can be created via the Paperspace CLI by executing:

    $ paperspace login

(See the previous section on Obtaining and API Key for more information.)

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

If you do not pass an apiKey parameter when creating the paperspace object the paperspace-node module will look for the environment variable value named`PAPERSPACE_API_KEY` for an API key, or in the cached api key location created by the `paperspace login` command, `~/.paperspace/config.json`.  See the [Authentication](#Authentication) section above for more information.

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

Copyright 2018 Paperspace Co. - All Rights Reserved
