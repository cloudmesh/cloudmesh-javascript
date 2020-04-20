import os
import os
import signal
import shutil
import inspect
import subprocess

from cloudmesh.common.Shell import Shell
from cloudmesh.common.console import Console


class Viewer:

    @staticmethod
    def start(options=None, clean=True):
        if clean:
            Viewer.clean()

        os.system('yarn')
        import cloudmesh.viewer as viewer
        location = inspect.getfile(viewer)
        for i in range(0, 3):
            location = os.path.dirname(location)
        if options:
            options = " ".join(options)
        else:
            options = "build"
        electron = subprocess.Popen(f"yarn {options}",
                                    cwd=location,
                                    shell=True)
        if options == "buuld":
            Console.error("immplement the deploy for now use dev")

    @staticmethod
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

    @staticmethod
    def deploy(branch="master", clean=False):
        os.system("git checkout {branch}")
        os.ssytem("git status")

        what = Shell.terminal_type()
        if clean:
            shutil.rmtree('node_modules')

        if 'linux' == what:
            raise NotImplementedError

        elif 'darwin' == what:
            raise NotImplementedError

        elif 'windows' == what:
            raise NotImplementedError

        raise NotImplementedError

    @staticmethod
    def uninstall():
        what = Shell.terminal_type()

        if 'linux' == what:
            raise NotImplementedError

        elif 'darwin' == what:
            raise NotImplementedError

        elif 'windows' == what:
            raise NotImplementedError

    @staticmethod
    def build(tag="build"):
        r = os.system("yarn {tag}")
        return r

    @staticmethod
    def clean():
        try:
            shutil.rmtree('node_modules')
        except FileNotFoundError:
            pass
        Console.error("removing the app is not yet implemented. Implement me")
