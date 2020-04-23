from __future__ import print_function
from cloudmesh.shell.command import command
from cloudmesh.shell.command import PluginCommand
from cloudmesh.common.console import Console
from cloudmesh.common.util import path_expand, yn_choice
from pprint import pprint
from cloudmesh.common.debug import VERBOSE
from cloudmesh.common.Shell import Shell
import inspect
import os
import subprocess
from pprint import pprint
import signal
from sys import platform
from shutil import copytree, rmtree


class ViewerCommand(PluginCommand):

    # noinspection PyUnusedLocal
    @command
    def do_viewer(self, args, arguments):
        """
        ::

          Usage:
                viewer stop
                viewer start [OPTIONS...]
                viewer deploy --uninstall
                viewer deploy --branch=BRANCH
                viewer deploy

          This command starts the javascript GUI


        """
        import cloudmesh.viewer as viewer
        location = inspect.getfile(viewer)

        for i in range(0, 3):
            location = os.path.dirname(location)

        # Get OS specific props (exe, build dir, etc.)
        os_props = ViewerCommand._get_os_props(location)

        # TODO: rework this method after refactoring start, stop, and deploy
        if arguments.stop:
            found = []
            processes = Shell.ps()
            for p in processes:
                if 'cmdline' in p and p['cmdline']:
                    if 'javascript' in ' '.join(p['cmdline']):
                        found.append(p['pid'])
            for p in found:
                Console.ok(f"...killing process {p}")
                os.kill(p, signal.SIGKILL)

        elif arguments.start and 'dev' in args:
            # Run yarn install and then yarn run dev
            ViewerCommand._install(location)
            subprocess.run(f"yarn run dev",
                           cwd=location,
                           shell=True)

        elif arguments.start:
            if not os.path.isdir(os_props['app_install_dir']):
                should_deploy = yn_choice("Cloudmesh is not deployed, do you want to deploy it?", "y", 3)
                if should_deploy:
                    ViewerCommand._install(location)
                    ViewerCommand._build(location)
                    ViewerCommand._deploy(os_props['app_build_dir'], os_props['app_install_dir'])
                    os.system(os_props['app_exe_cmd'])
                else:
                    Console.error("No application found to start, please deploy first.")
            else:
                os.system(os_props['app_exe_cmd'])

        elif arguments.deploy and arguments["--uninstall"]:
            if platform == 'darwin' or platform.startswith("linux"):
                try:
                    rmtree(os_props['app_install_dir'])
                except Exception as e:
                    print(e)
            else:
                Console.error(f"Not yet implemented for {platform}")

        elif arguments.deploy:
            if arguments["--branch"]:
                branch = arguments["--branch"]
                ViewerCommand._switch_branch(branch)

            ViewerCommand._install(location)
            ViewerCommand._build(location)
            ViewerCommand._deploy(os_props['app_build_dir'], os_props['app_install_dir'])

        return ""

    # Private static methods

    @staticmethod
    def _deploy(src, dest):
        """
        Deploy method
        """
        if platform == 'darwin':
            try:
                copytree(src, dest, dirs_exist_ok=True)
            except Exception as e:
                Console.error(e)
        elif platform.startswith("linux"):
            pass
        else:
            Console.error(f"Not yet implemented for {platform}")

    @staticmethod
    def _get_os_props(location):
        # TODO Windows
        if platform == 'darwin':
            return {
                "app_exe_cmd": 'open -a "Cloudmesh Dashboard.app"',
                "app_install_dir": os.path.join(path_expand('~/Applications'), 'Cloudmesh Dashboard.app'),
                "app_build_dir": os.path.join(location, 'dist', 'mac', 'Cloudmesh Dashboard.app')
            }
        elif platform.startswith('linux'):
            build_dir = os.path.join(location, 'dist', 'linux-unpacked')
            return {
                "app_exe_cmd": os.path.join(build_dir, 'cloudmesh-javascript'),
                "app_install_dir": build_dir,
                "app_build_dir": build_dir
            }

        return {}

    @staticmethod
    def _switch_branch(branch: str):
        """
        Git branch switching
        """
        try:
            os.system(f"git checkout {branch}")
        except Exception as e:
            Console.error(e)

    @staticmethod
    def _install(location: str):
        """
        yarn install
        """
        return subprocess.run(f"yarn install",
                              cwd=location,
                              shell=True)

    @staticmethod
    def _build(location: str):
        return subprocess.run(f"yarn run build",
                              cwd=location,
                              shell=True)
