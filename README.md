# Cloudmesh Javascript GUI

## Overview

Cloudmesh Javascript GUI is a front end for the Cloudmesh system.

## Requirements

* [Cloudmesh](https://cloudmesh.github.io/cloudmesh-manual/installation/install.html)
* [NodeJS](https://nodejs.org/en/) - 12.x
* [Yarn](https://yarnpkg.com/) - 1.22.x 

**Note**:

* The Yarn JS package installer conflicts with the Hadoop Yarn command so `yarnpkg` is used 
to avoid clashes.
* Only NodeJS 12.x is supported at this time.  Using other versions of NodeJS
may result in errors during the compilation steps.


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
cms viewer start [dev] [OPTIONS...] [--clean]
cms viewer stop
cms viewer deploy [--uninstall] [OPTIONS...]
```

Options:
    --branch=BRANCH The git branch to use.
    
e.g.
```bash
# Remove previous builds and start a fresh one.
cms viewer start --clean

# Start in dev hot reloading mode
cms start dev

# Build and install the application
cms viewer deploy

# Build and deploy using the 'develop' branch
# This will switch your local git repo branch.
cms viewer deploy --branch=develop

# Remove any previous installations
cms viewer deploy --uninstall
```

#### cms viewer start [OPTIONS...]

Starts the `Cloudmesh Dashboard` application in production mode.

To start in dev mode append `dev` to the command.

e.g.
`cms viewer start dev`

Options:
* dev - Start in development hot reloading mode.
* `--branch=BRANCH` - Switches the git repo to the specified `BRANCH` prior to deploying.

#### cms viewer stop

Stops all Cloudmesh Dashboard processes started by `cms viewer start`.

#### cms viewer deploy [OPTIONS...]

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
yarnpkg
yarnpkg run dev
```

### Building Binaries

To build the application binaries for all architectures run the following.

```bash
yarnpkg run build:all
```

This will produce binaries in the `dist` directory.  Mac binaries can
only be built on OS X.

Other targets include:

```bash
yarnpkg run build:win32
yarnpkg run build:win64
yarnpkg run build:mac
yarnpkg run build:linux
``` 
## Prior Art

For previous efforts see [this doc](docs/prior_art.md).

## Evaluation

[Details](./docs/evaluation.md) on our selection of technologies used in this project.

## Contributors

* <https://github.com/cloudmesh/cloudmesh-javascript/graphs/contributors>



