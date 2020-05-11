# Developer Guide

## Technology overview

* Electron - https://www.electronjs.org/
* NextJS - https://nextjs.org/
* Nextron - https://www.npmjs.com/package/nextron
* React - https://reactjs.org/
* Material-UI - https://material-ui.com/
* Formik - https://jaredpalmer.com/formik/
* React Grid - https://devexpress.github.io/devextreme-reactive/react/grid/

### Electron

Electron is the main wrapper around the React application that allows us to 
build a cross platform application.

### NextJS

NextJS is a framework for building React applications that provides many features
such as page routing, CSS-in-JS, optimized builds and more.  

### Nextron

Nextron is the glue that connects Electron and NextJS together.  The github repo
has a lot of useful examples and information about working with Electron and NextJS. 

### React

React is the Javascript view layer that was chosen for this particular application.

### Material-UI

This is the UI library that was selected to provide a consistent look and
feel across the entire application.  Many of the UI compoments that were
used came from this library.

### Formik

This is a React form handling library that was used for pages such as the
Cloudmesh Settings page to orchestrate simplify form handling.

### React Grid

For the VM list page, the table component was provided by React Grid.  This library
has many options for handling large data tables such as pagination, sorting, filtering
and many more.  It also works with the Material-UI look and feel out of the box.

## Project Directory Structure

```
  ├── cloudmesh - Code for the Cloudmesh viewer command
  ├── docs      - Documentation
  ├── main      - Code for the main thread of the app.
  ├── python    - Python code that is bundled and executed in the app.
  ├── renderer  - Code for the UI thread of the app.
  │   ├── components - React components.
  │   ├── fields     - Field definitions for the Cloudmesh configuration editor.
  │   ├── helpers    - Small helper functions.
  │   ├── hooks      - Custom react hooks used for interacting with CMS.
  │   ├── pages      - Page components for the application.
  │   ├── public     - Static assest directory.
  │   └── styles     - Global CSS styles.
  └── resources      - Icon files.
```

## Development with Hot Reloading

This command will start a development mode that allows for hot reloading
of code changes. A test app with dev console should appear and reload
with each edit of code.

For `Mac` or `Linux`:
```bash
cms viewer start dev
```
or 
```bash
yarnpkg run dev
```

For `Windows`, only use: 
```bash
yarnpkg run dev
```

## Building Binaries

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

To build a binary for the current architecture you can simply run
```bash
yarnpkg run build
```

