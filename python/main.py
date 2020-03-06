#!/usr/bin/env python3
import sys
import re
from cloudmesh.cloud import Shell

extra_space_re = re.compile(r'\s+', re.MULTILINE)
list_preamble_re = re.compile(r'List \w+\s+\{', re.IGNORECASE)


def error(*args, **kwargs):
    """
    Print messages to STDERR.

    :param args: The message or other unnamed arguments to pass to print.
    :param kwargs: Any key/value arguments to pass to print.
    :return: None
    """
    print(*args, file=sys.stderr, **kwargs)


def print_cms(output, **kwargs):
    """
    Prints the output from the cms command.  Removes extraneous labels and whitespace before
    printing.

    :param output:
    :param kwargs:
    :return: None
    """
    output = list_preamble_re.sub('{', output)
    output = output.replace('\n', '')
    output = extra_space_re.sub(' ', output)
    print(output, **kwargs)
    print('END', **kwargs)


if __name__ == '__main__':
    for line in sys.stdin:
        command = line.rstrip()

        if command == 'exit':
            exit(0)
        elif command.startswith('vm list'):
            print_cms(Shell.cms(command))
        else:
            error(f'Command {command} not supported or allowed.')
