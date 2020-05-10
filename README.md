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

The following commands clone the repo from github,
installs the `cms viewer` command, and starts the Cloudmesh Dashboard, building
it first if it needs to.

```bash
cloudmesh-installer get javascript
cms viewer start
```

This assumes that you are starting with Cloudmesh, yarn, and NodeJS installed.

## Main Overview

* [Dashboard Features](docs/features.md) - Feature overview.
* [cms viewer](docs/cms_viewer.md) - Description of how to build and run the Cloudmesh Dashboard via the `cms viewer` command.
* [For Developers](docs/developers.md) - Information for developers of Cloudmesh Dashboard.

## Prior Art

For previous efforts see [this doc](docs/prior_art.md).

## Evaluation

[Details](./docs/evaluation.md) on our selection of technologies used in this project.

## Contributors

* <https://github.com/cloudmesh/cloudmesh-javascript/graphs/contributors>



