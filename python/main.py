#!/usr/bin/env python3
import sys
import re
import json
from ast import literal_eval
from cloudmesh.common import Shell

# Compile the regex for extracting JSON or Cms data structures.
data_obj_re = re.compile(r'([\[{][\S\s]*[}\]])', re.MULTILINE)

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
    json_response = {
        "cms": cms_command,
        "output": None
    }

    try:
        # Extract the JSON or Cms string object returned from CMS.
        match = data_obj_re.search(output)
        if match:
            """
            The flat output format returns an array of Cms dict structures as a string.
            If the flat output format is detected then we use the ast.literal_eval
            method to parse the string back into Cms objects and then serialize this
            into JSON.  Values such as 'None' are converted into null for JSON compatibility.
            """
            if "--output=flat" in cms_command['args']:
                json_response['output'] = literal_eval(match.group(1))
            else:
                # Run it through the JSON loader/dumper to produce compressed JSON.
                json_response['output'] = json.loads(match.group(1))

        # Print the compressed output.
        print(json.dumps(json_response), **kwargs)
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
        "args": ["--output=json"]
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
