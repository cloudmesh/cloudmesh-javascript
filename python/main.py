#!/usr/bin/env python3
import sys
import re
import json
from cloudmesh.cloud import Shell

# Compile the regex for extracting JSON objects.
json_obj_re = re.compile(r'({[\S\s]*})', re.MULTILINE)

# Dict for validating CMS operations and indicating those that produce STDOUT.
valid_operations = {
    "vm": ['list', 'status', 'info', 'start', 'stop', 'terminate', 'delete']
}


def error(*args, **kwargs):
    """
    Print messages to STDERR.

    :param args: The message or other unnamed arguments to pass to print.
    :param kwargs: Any key/value arguments to pass to print.
    :return: None
    """
    print(*args, file=sys.stderr, **kwargs)


def print_cms(cms_command, output, **kwargs):
    """
    Prints the output from the CMS command.  Removes extraneous labels and whitespace before
    printing.

    :param cms_command: The CMS command object that was passed to CMS.
    :param output: The CMS output to print.
    :param kwargs: Any key/value arguments to pass to print.
    :return: None
    """
    try:
        # Extract the JSON object returned from CMS.
        match = json_obj_re.search(output)
        if match:
            # Run it through the JSON loader/dumper to produce compressed JSON.
            json_obj = json.loads(match.group(1))
        else:
            json_obj = json.loads("{}")

        json_obj['cms'] = cms_command

        # Print the compressed output.
        print(json.dumps(json_obj), **kwargs)
    except json.JSONDecodeError as jsonError:
        error(f'Invalid JSON received from CMS: {jsonError}')


if __name__ == '__main__':
    """
    This script reads CMS commands in JSON format from STDIN, passes them on to the cloudmesh
    system, and returns the response as JSON.
    
    CMS command format -
    {
        "command": "<CMS COMMAND>",
        "operation": "<CMS OPERATION>",
        "args": ["<OPERATION ARGS>"]
    }
    e.g.
    {
        "command": "vm",
        "operation": "list",
        "args": ["<OPERATION ARGS>"]
    }
    
    
    """
    # Read commands from STDIN.
    for line in sys.stdin:
        cmd_obj = {}
        try:
            cmd_obj = json.loads(line)
        except json.JSONDecodeError as e:
            error(f"ERROR: Couldn't parse JSON command object: {e}.")
            continue

        try:
            cmd = cmd_obj['command']
            op = cmd_obj['operation']
            full_cmd = f"{cmd} {op} {' '.join(cmd_obj.get('args', []))}"

            # Quit when we receive an 'exit' command.
            if cmd == 'exit':
                exit(0)
            elif op in valid_operations[cmd]:
                print_cms(cmd_obj, Shell.cms(full_cmd))
            # Catch all for everything else.
            else:
                error(f'Command {full_cmd} not supported or allowed.')
        except KeyError as e:
            error(f'ERROR: "command" and "operation" keys are required.')
            continue
