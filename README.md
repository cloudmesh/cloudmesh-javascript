# Cloudmesh Javascript GUI

## Overview

Cloudmesh Javascript GUI is a front end for the Cloudmesh system.

## Requirements

* [Cloudmesh](https://cloudmesh.github.io/cloudmesh-manual/installation/install.html)
* [NodeJS](https://nodejs.org/en/) - 12.x
* [Yarn](https://yarnpkg.com/) - 1.22.x 

*Note*: The Yarn JS package installer conflicts with the Hadoop Yarn command so `yarnpkg` is used 
to avoid clashes.

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

## Main Overview

* [Dashboard Features](docs/features.md) - Feature overview.
* [cms viewer](docs/cms_viewer.md) - Description of how to build and run the Cloudmesh Dashboard via the `cms viewer` command.

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



