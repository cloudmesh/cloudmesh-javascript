# Cloudmesh Javascript GUI Evaluation

## Overview

This document describes the various technologies that were considered for this project and the pros and cons of
each.

The goal of this project was to provide a GUI application that could run on Windows, Linux, and OS X
and interface with the Cloudmesh tool.  Security and port isolation were of utmost importance so technologies such
as a local server with a web front end were considered too risky even with proper controls in place.

Based on these requirements either an [Electron](https://electronjs.org) or some other type of application technology 
would be used.

## Web View Selection

For rendering the web view, several technologies were considered:

* [React](https://reactjs.org/)
* [Angular](https://angularjs.org/)
* [Vue](https://vuejs.org/)
* [Svelte](https://svelte.dev/)

React was chosen because of its rich library ecosystem, experience of the initial project developers,
and the likelihood of finding future developers with experience for further development.

## React Framework

In order to build the application in React, a framework was selected to help speed up development by eliminating
time spent on putting tooling together and making development more efficient overall.

### Nextron (Electron + NextJS)

[Nextron](https://github.com/saltyshiomix/nextron) is a framework that uses [NextJS](https://nextjs.org/) and Electron
to build Electron apps.  It isn't so much of a framework as it is glue code to make getting NextJS running in Electron
as easy as possible.

#### Pros

* Easy to use.
* Well documented with lots of helpful examples.
* Actively maintained.

#### Cons

### Create React App + Electron

[create-react-app](https://create-react-app.dev/) (CRA) is a popular tool for bootstrapping and developing a React application.
While it is possible to get it working inside Electron, the CRA team does not support running it in Electron.  As a
result, there are several significant issues that would make development difficult.

#### Pros

* Excellent tool for building React apps.
* Provides a rich set of features out of the box with little config required.

#### Cons

* Lack of first class Electron support makes development problematic.

### Electron React Boilerplate

[Electron React Boilerplate](https://electron-react-boilerplate.js.org/) provides a very expansive template for getting
started with React and Electron.  However, for this project, its features were overkill and the additional complexity 
added was too expensive to take on.

#### Pros

* Very expansive template.
* Lots of useful features for building a full featured React app in Electron.

#### Cons

* Overkill and bloated for this project's needs.

### Proton Native

[Proton Native](https://proton-native.js.org/) is a non Electron based framework that allows you to build React apps
for cross platform deployment.

#### Pros

* Low cpu/memory footprint.
* Uses React.

#### Cons

* Incomplete implementation of CSS standards.
* Problematic support for Mac on recent Node versions.
* Small user community.

### React Node GUI

[React Node GUI](https://react.nodegui.org/) is a non Electron base framework that allows you to build React apps for
cross platform deployment.

#### Pros

* Low cpu/memory footprint.
* Uses React.

#### Cons

* Incomplete implementation of CSS standards.
* Small user community.

## Decision

After implementing small test apps in Nextron and Electron React Boilerplate and considering the attributes of the
other options it was decided that we would proceed with Nextron for this application.


