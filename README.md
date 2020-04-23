# Cloudmesh Javascript GUI

## Overview

Cloudmesh Javascript GUI is a front end for the Cloudmesh system.

## Requirements

* [Cloudmesh](https://cloudmesh.github.io/cloudmesh-manual/installation/install.html)
* [NodeJS](https://nodejs.org/en/) - 12.x
* [Yarn](https://yarnpkg.com/) - 1.22.x

## Getting started

The following commands clone the repo from github, activate the CMS python environment,
installs the `cms viewer` command, and starts the Cloudmesh Dashboard.

```bash
git clone git@github.com:cloudmesh/cloudmesh-javascript.git
cd cloudmesh-javascript
source ~/ENV3/bin/activate
pip install -e .
cms viewer start
```

## CMS `viewer` command

A CMS `viewer` command has been implemented to automate working with the Cloudmesh Dashboard
as much as possible.  The viewer provides commands for deploying (installing), starting,
stopping, and uninstalling.

### Command summary
```bash
cms viewer start
cms viewer stop
cms viewer start [OPTIONS...]
cms viewer deploy
cms viewer deploy --uninstall
cms viewer deploy --branch=BRANCH
```

#### cms viewer start

Starts the `Cloudmesh Dashboard` application in production mode.

To start in dev mode append `dev` to the command.

e.g.
`cms viewer start dev`

#### cms viewer stop

Stops all Cloudmesh Dashboard processes started by `cms viewer start`.

#### cms viewer deploy [OPTIONS]

Builds and installs the Cloudmesh Dashboard application.

Options:
* `--uninstall` - removes the installed application
* `--branch=BRANCH` - Switches the git repo to the specified `BRANCH` prior to deploying.


## Developer Guide

### Development with Hot Reloading

This command will start a development mode that allows for hot reloading
of code changes. A test app with dev console should appear and reload
with each edit of code.

```bash
yarn
yarn run dev
```

### Building Binaries

To build the application binaries for all architectures run the following.

```bash
yarn run build:all
```

This will produce binaries in the `dist` directory.  Mac binaries can
only be built on OS X.

Other targets include:

```bash
yarn run build:win32
yarn run build:win64
yarn run build:mac
yarn run build:linux
``` 
## Prior Art

For previous efforts see [this doc](docs/prior_art.md).

## Evaluation

[Details](./docs/evaluation.md) on our selection of technologies used in this project.

## Contributors

* <https://github.com/cloudmesh/cloudmesh-javascript/graphs/contributors>



