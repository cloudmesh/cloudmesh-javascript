import os
import subprocess
import inspect
import signal
import shutil

from cloudmesh.common.Shell import Shell
from cloudmesh.common.console import Console
from cloudmesh.common.util import path_expand


class Viewer:
    platform = Shell.terminal_type()
    import cloudmesh.viewer as viewer_pkg
    base_dir = inspect.getfile(viewer_pkg)

    for i in range(0, 3):
        base_dir = os.path.dirname(base_dir)

    @staticmethod
    def start(install_dir: str = None, build_dir: str = None, exe_cmd: str = None, branch: str = None):
        """
        Starts the Cloudmesh Dashboard app using the OS specific method and location.

        Arguments:
            - install_dir - The target directory to install the application in.
            - build_dir - The directory that the application will be built under.  This is usually a sub directory of
                          the 'dist' folder.
            - exe_cmd - The command to use to start the application.
            - branch - The git branch to switch to prior to starting.  This automatically triggers a new build.
        """
        if 'windows' == Viewer.platform:
            raise NotImplementedError

        if not os.path.isdir(install_dir):
            # If app is not installed ask it we should build it first.
            # Viewer.deploy() only builds if switching branches so we have to run it here.
            if branch is None:
                Viewer.build()

            # Run the deploy script
            Viewer.deploy(build_dir, install_dir, branch)

        # Start the app
        subprocess.run(exe_cmd, cwd=Viewer.base_dir, shell=True)

    @staticmethod
    def stop():
        """
        Stops all running JS processes.
        """
        found = []
        processes = Shell.ps()
        for p in processes:
            if 'cmdline' in p and p['cmdline']:
                if 'javascript' in ' '.join(p['cmdline']):
                    found.append(p['pid'])
        for p in found:
            Console.ok(f"...killing process {p}")
            os.kill(p, signal.SIGKILL)

    @staticmethod
    def deploy(src: str, dest: str, branch: str = None):
        """
        Deploys the app to the specified install location.

        If a new branch is specified a full build is triggered.  Otherwise, the app is deployed as is.

        Arguments:
            - src - The source directory to use for deploying
            - dest - The directory install target.
            - branch - An alternative git branch to use (default: current branch)
        """
        if branch is not None:
            # Checkout new branch
            subprocess.run(f"git checkout {branch}", cwd=Viewer.base_dir, shell=True)
            subprocess.run("git status", cwd=Viewer.base_dir, shell=True)
            # Remove node_modules
            Viewer.clean()
            # Run a new build.
            Viewer.build()

        if 'darwin' == Viewer.platform:
            # For mac we deploy to ~/Applications
            shutil.copytree(src, dest, dirs_exist_ok=True)
        elif 'linux' == Viewer.platform:
            # For linux we run directly from the unpacked build.
            pass
        elif 'windows' == Viewer.platform:
            raise NotImplementedError

    @staticmethod
    def uninstall(app_dir: str):
        """
        Removes the directory specified by the app_dir argument.

        Arguments:
            - app_dir - The directory to remove.
        """
        if 'linux' == Viewer.platform or 'darwin' == Viewer.platform:
            shutil.rmtree(app_dir)
        elif 'windows' == Viewer.platform:
            raise NotImplementedError

    @staticmethod
    def yarn_install():
        subprocess.run("yarn install", cwd=Viewer.base_dir, shell=True)

    @staticmethod
    def build(tag: str = "build"):
        """
        Runs a yarn install followed by a build target.

        Arguments:
            - tag - The yarn script target to execute. default: build
        """
        # Check that JS deps are installed and up to date.
        Viewer.yarn_install()
        # Run the build
        return subprocess.run(f"yarn run {tag}", cwd=Viewer.base_dir, shell=True)

    @staticmethod
    def clean():
        """
        Removes the node_modules directory.
        """
        try:
            shutil.rmtree('node_modules')
        except FileNotFoundError:
            pass

    @staticmethod
    def get_os_props(location: str = None):
        """
        Returns a dictionary containing OS specific key/values for the application.

        Keys:
        * exe_cmd - The name of the binary file.
        * install_dir - The path to the installation.
        * build_dir - The path to the build directory.

        Arguments:
            location - The base directory of the cloudmesh-javascript application.
        """
        # TODO Windows
        if Viewer.platform == 'darwin':
            return {
                "exe_cmd": f'open -a "Cloudmesh Dashboard.app"',
                "install_dir": os.path.join(path_expand('~/Applications'), "Cloudmesh Dashboard.app"),
                "build_dir": os.path.join(location, 'dist', 'mac', "Cloudmesh Dashboard.app")
            }
        elif Viewer.platform.startswith('linux'):
            build_dir = os.path.join(location, 'dist', 'linux-unpacked')
            return {
                "exe_cmd": os.path.join(build_dir, 'cloudmesh-javascript'),
                "install_dir": build_dir,
                "build_dir": build_dir
            }

        return {}
