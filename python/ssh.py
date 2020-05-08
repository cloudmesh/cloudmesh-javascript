#!/usr/bin/env python3
import sys
from cloudmesh.common import Shell

arg_string = ' '.join(sys.argv[1:])
Shell.terminal(f'ssh {arg_string}')
