# Paperspace API Release Notes

## Release Notes for v0.1.11

#### New features
* New cluster and machineType functionality supported: send jobs to a gradient-node based on the cluster name or clusterId
    * For more information on running gradient-node see the [Gradient Private Cloud](https://docs.paperspace.com/gradient/private-cloud/about) docs
* Send jobs to a specific node by specifying node attributes
* Changed default handling of machineType: cluster preferences come first
* Jobs create automatically records the git commit hash for local workspaces using git
* Raised job workspace upload limit to 500 MB

### Fixes
* Fix for job create returning before final job state known but after logs received 

## Release Notes for v0.1.10

#### New features
* New dynamicPublicIp parameter for machines create and machines update methods.
* New ports parameter for jobs create to allow network services to be exposed through jobs while they are running.  Also displays links to the exposed endpoints in the jobs create output.
* New summary parameter for jobs list which formats the output as a text table.
* Added Google TPU machineType for Gradient jobs create.
* Improved job logging responsiveness.

#### Fixes
* Fix for NODE_ENV settings from other projects overriding paperspace-node config defaults
* Minor doc fixes

## Release Notes for v0.1.9

#### New features
* New jobs machineTypes method for discovering available job machine types.

#### Fixes
* Fix for paperspace cached api key overriding an explicit api key parameter in paperspace-node apps.
* Minor doc fixes

## Release Notes for v0.1.8

#### New features
* New paperspace login method for acquiring and caching api tokens from the command line
* New paperspace logout method
* Support for downloading job containers from private docker repositories on job create
* Support for downloading job workspace from private git repositories on job create
* Added paperspace --version option to check the version of the CLI tool

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

## Release Notes for v0.1.1

* First version
