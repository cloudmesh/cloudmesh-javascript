# Cloudmesh Javascript GUI

## Overview

Cloudmesh Javascript GUI is a front end for the Cloudmesh system.

## Prior Art

For previous efforts see [this doc](docs/prior_art.md).

## Evaluation

[Details](./docs/evaluation.md) on our selection of technologies used in this project.

## User Guide

Add instructions here on how to download the binary files.

## Developer Guide

### Requirements

* Cloudmesh with cms command installed.
* [Yarn](https://yarnpkg.com/) v1.x

### Installation

Regular install if you have cloudmesh installed:

```bash
$ git clone git@github.com:cloudmesh/cloudmesh-javascript.git
$ cd cloudmesh-javascript
$ yarn
```

Install with cloudmesh-installer:

(Experimental) This will not only install cloudmeh-javascript but all
cloudmesh repos needed for it to work. It will then also install all of
it.

```bash
$ pip install cloudmesh-installer -U
$ cloudmesh-installer get cloudmesh-javascript
```


### Development with Hot Reloading

This command will start a development mode that allows for hot reloading
of code changes. A test app with dev console should appear and reload
with each edit of code.

```bash
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

## Contributors

* <https://github.com/cloudmesh/cloudmesh-javascript/graphs/contributors>



