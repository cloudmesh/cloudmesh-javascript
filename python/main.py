#!/usr/bin/env python3
import sys
import re
import json
from cloudmesh.cloud import Shell

# Compile the regex for extracting JSON objects.
json_obj_re = re.compile(r'({[\S\s]*})', re.MULTILINE)

# Regexes for matching cms commands with and without STDOUT
cms_with_stdout_re = re.compile(r'vm (list|status|info) ')
cms_no_stdout_re = re.compile(r'vm (start|stop|terminate|delete) ')


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

    :param output: The cms output to print.
    :param kwargs: Any key/value arguments to pass to print.
    :return: None
    """
    try:
        # Extract the JSON object returned from CMS.
        match = json_obj_re.search(output)
        # Run it through the JSON loader/dumper to produce compressed JSON.
        json_obj = json.loads(match.group(1))
        # Print the compressed output.
        print(json.dumps(json_obj), **kwargs)

    except json.JSONDecodeError as e:
        error(f'Invalid JSON received from cms: {e}')


if __name__ == '__main__':
    # Read commands from STDIN.
    for line in sys.stdin:
        command = line.rstrip()

        # Quit when we receive an 'exit' command.
        if command == 'exit':
            exit(0)
        # CMS commands that produce JSON output.
        elif cms_with_stdout_re.search(command):
            print_cms(Shell.cms(command))
        elif cms_no_stdout_re.search(command):
            Shell.cms(command)
        # Catch all for everything else.
        else:
            error(f'Command {command} not supported or allowed.')
