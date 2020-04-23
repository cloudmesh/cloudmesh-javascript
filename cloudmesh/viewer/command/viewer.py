import os
import subprocess
from cloudmesh.shell.command import PluginCommand
from cloudmesh.shell.command import command
from cloudmesh.viewer.Viewer import Viewer


class ViewerCommand(PluginCommand):

    # noinspection PyUnusedLocal
    @command
    def do_viewer(self, args, arguments):
        """
        ::

          Usage:
                viewer start [OPTIONS...] [--clean]
                viewer stop
                viewer deploy --uninstall
                viewer deploy [--branch=BRANCH]

          This command starts the javascript GUI

          Options:
            --branch=BRANCH  The branch to deploy
        """
        location = Viewer.base_dir

        # Get OS specific props (exe, build dir, etc.)
        os_props = Viewer.get_os_props(location)

        branch = None
        if arguments["--branch"]:
            branch = arguments["--branch"]

        if arguments.stop:
            Viewer.stop()

        elif arguments.start and 'dev' in args:
            # Run yarn install and then yarn run dev
            Viewer.yarn_install()
            subprocess.run("yarn run dev", cwd=location, shell=True)

        elif arguments.start:
            if arguments["--clean"]:
                # Clean install dir
                Viewer.uninstall(os_props['install_dir'])
                # Clean node_modules
                Viewer.clean()
            Viewer.start(os_props["install_dir"], os_props["build_dir"], os_props["exe_cmd"], branch)

        elif arguments.deploy and arguments["--uninstall"]:
            Viewer.uninstall(os_props['install_dir'])

        elif arguments.deploy:
            Viewer.build()
            Viewer.deploy(os_props["build_dir"], os_props["install_dir"], branch)
