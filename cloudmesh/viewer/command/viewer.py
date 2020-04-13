from __future__ import print_function
from cloudmesh.shell.command import command
from cloudmesh.shell.command import PluginCommand
from cloudmesh.common.console import Console
from cloudmesh.common.util import path_expand
from pprint import pprint
from cloudmesh.common.debug import VERBOSE
from cloudmesh.common.Shell import Shell
import inspect
import os
import subprocess
class ViewerCommand(PluginCommand):

    # noinspection PyUnusedLocal
    @command
    def do_viewer(self, args, arguments):
        """
        ::

          Usage:
                viewer [OPTIONS...]

          This command starts the javascript GUI

          Arguments:
              FILE   a file name

          Options:
              -f      specify the file

        """

        import cloudmesh.viewer as viewer
        location = inspect.getfile(viewer)
        for i in range(0,3):
            location = os.path.dirname(location)
        if arguments.OPTIONS:
            options = " ".join(arguments.OPTIONS)
        else:
            options = ""
        electron = subprocess.Popen(f"yarn {options}",
                                    cwd=location,
                                    shell=True)

        return ""
