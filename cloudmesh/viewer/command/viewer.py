import inspect
import os
import signal
import subprocess

from cloudmesh.common.Shell import Shell
from cloudmesh.common.console import Console
from cloudmesh.shell.command import PluginCommand
from cloudmesh.shell.command import command


class ViewerCommand(PluginCommand):

    # noinspection PyUnusedLocal
    @command
    def do_viewer(self, args, arguments):
        """
        ::

          Usage:
                viewer stop
                viewer start [OPTIONS...] [--clean]
                viewer deploy --uninstall
                viewer deploy [--branch=BRANCH]

          This command starts the javascript GUI

          Options:
            --branch=BRANCH  THe branch to deploy [default: master]

        """

        if arguments.stop:

            from cloudmesh.viewer.Viewer import Viewer
            Viewer.stop()

        elif arguments.start:

            clean = arguments["--clean"] is not None
            from cloudmesh.viewer.Viewer import Viewer
            Viewer.start(options=arguments.OPTIONS, clean=clean)

        elif arguments.deploy and arguments["--uninstall"]:

            from cloudmesh.viewer.Viewer import Viewer
            Viewer.uninstall()

        elif arguments.deploy:

            from cloudmesh.viewer.Viewer import Viewer
            branch=arguments["--branch"]
            Viewer.deploy(branch=branch, clean=True)


        return ""
