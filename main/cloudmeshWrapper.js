// import { spawn } from 'child_process';
import { spawn } from 'cross-spawn';

/**
 * Cloudmesh command wrapper.
 */
class CloudmeshWrapper {
  /**
   * @param cms
   */
  constructor(cms = 'cms') {
    this.cms = cms;
    // this.printInputs(cms);
  }

  // const printInputs = (inp) => {
  //     console.log("Printing inputs to Cloudmesh wrapper...")
  //     console.log(inp)
  // }

  // exec({
  //   cmsCommand = 'cms',
  //   args = [],
  //   onStdout = (response) => {console.log(response)},
  //   onStderr = () => {},
  //   onError = () => {},
  //   onClose = () => {},
  // }) {
  //   console.log('this.cms', this.cms, '\n',
  //    'cmsCommand', cmsCommand, '\n',
  //    'args', args, '\n')
  //   const cms = spawn(this.cms, [cmsCommand, ...args]);
  //   cms.stdout.on('data', data => onStdout(data));
  //   cms.stderr.on('data', data => onStderr(data));
  //   cms.on('error', error => onError(error));
  //   cms.on('close', exitCode => onClose(exitCode));
  // }

  exec({
        cmsCommand = [],
        onStdout = (response) => {
            // console.log('response', response.toString())
        },
        onStderr = () => {},
        onError = () => {},
        onClose = () => {},
  }) {
    // console.log('this.cms', this.cms, '\n',
    //  'cmsCommand', cmsCommand, '\n',
    //  'args', args, '\n')
    const cms = spawn(this.cms, [...cmsCommand]);
    cms.stdout.on('data', data => onStdout(data));
    cms.stderr.on('data', data => onStderr(data));
    cms.on('error', error => onError(error));
    cms.on('close', exitCode => onClose(exitCode));
  }
}

export default CloudmeshWrapper;
