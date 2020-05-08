# CMS `viewer` command

A CMS `viewer` command has been implemented to automate working with the Cloudmesh Dashboard
as much as possible.  The viewer provides commands for deploying (installing), starting,
stopping, and uninstalling.

## Command summary
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

### cms viewer start 

Starts the `Cloudmesh Dashboard` application in production mode.

To start in dev mode append `dev` to the command.

e.g.
`cms viewer start dev`

Options:
* dev - Start in development hot reloading mode.
* `--branch=BRANCH` - Switches the git repo to the specified `BRANCH` prior to deploying.

### cms viewer stop

Stops all Cloudmesh Dashboard processes started by `cms viewer start`.

### cms viewer deploy

Builds and installs the Cloudmesh Dashboard application.

Options:
* `--uninstall` - removes the installed application
* `--branch=BRANCH` - Switches the git repo to the specified `BRANCH` prior to deploying.
