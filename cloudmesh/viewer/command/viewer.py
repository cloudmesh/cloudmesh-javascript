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
from pprint import pprint
import signal

class ViewerCommand(PluginCommand):

    # noinspection PyUnusedLocal
    @command
    def do_viewer(self, args, arguments):
        """
        ::

          Usage:
                viewer install
                viewer stop
                viewer start [OPTIONS...]

          This command starts the javascript GUI


        """

        def stop():
            found = []
            processes = Shell.ps()
            for p in processes:
                if 'cmdline' in p and p['cmdline']:
                    if 'javascript' in ' '.join(p['cmdline']):
                        found.append(p['pid'])
            for p in found:
                Console.ok(f"...killing process {p}")
                os.kill(p, signal.SIGKILL)

        if arguments.stop:

            stop()

        elif arguments.start:

            stop()

            import cloudmesh.viewer as viewer


            location = inspect.getfile(viewer)
            for i in range(0,3):
                location = os.path.dirname(location)
            if arguments.OPTIONS:
                options = " ".join(arguments.OPTIONS)
            else:
                options = ""
                options = "dev" # till its fixed
            electron = subprocess.Popen(f"yarn {options}",
                                        cwd=location,
                                        shell=True)

        elif arguments.install:
            stop()

            import cloudmesh.viewer as viewer
            location = inspect.getfile(viewer)
            for i in range(0,3):
                location = os.path.dirname(location)
            if arguments.OPTIONS:
                options = " ".join(arguments.OPTIONS)
            else:
                options = ""
                options = "dev" # till its fixed
            os.chdir(location)
            Shell.rmdir(path_expand(f"{location}/node_modules"))

            os.system("pwd")
            os.system(f"yarn install --force")

        return ""
