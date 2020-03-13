import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import electron from 'electron'
import CloudmeshEnvChooser from "../components/CloudmeshEnvChooser";
import {
  getAllVMNames
} from '../helpers/json-data-extractors';

// prevent SSR webpacking
const ipcRenderer = electron.ipcRenderer || false;

const Home = () => {
  const [result, setResult] = useState('nothing to report');
  const [cmsBin, setCmsBin] = useState('');

  const inputRef = useRef(null)

  const onClick = (evt) => {
    console.log('renderer sends', inputRef.current.value)
    if (ipcRenderer) {
      ipcRenderer.send('run-cms', inputRef.current.value);
    }
  };
  useEffect(() => {
    if (ipcRenderer) {
      const cmsBin = ipcRenderer.sendSync('get-cms-binary');
      setCmsBin(cmsBin)
    }

    // Cleanup the listener on unmount.
    return () => { }
  }, []);

  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.on('result', (event, data) => {
        const parsedData = JSON.parse(data);

        let vmNames = getAllVMNames(parsedData);

        // console.log('result received', getAllVMNames(parsedData))
        setResult(vmNames);
      });
    }

    // Cleanup all listeners on unmount.
    return () => {
      if (ipcRenderer) {
        ipcRenderer.removeAllListeners('result');
      }
    };
  }, []);

  const onChange = (e) => {
    if (ipcRenderer) {
      const binary = e?.target?.files[0]?.path
      if (binary) {
        ipcRenderer.send('set-cms-binary', binary);
        setCmsBin(binary)
      }
    }
  }


  return (
    <React.Fragment>
      <Head>
        <title>Home - Cloudmesh</title>
        <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
      </Head>
      <div style={{background: 'white'}}>
        <h2>Cloudmesh</h2>
        <h2>vm list --output=json</h2>
        <div>
          <CloudmeshEnvChooser binPath={cmsBin} onChange={onChange}/>
        </div>
        <div>
          Enter your CMS command: <input type="text" ref={inputRef}/>
          <button onClick={onClick}>Execute</button>
        </div>
        <pre>{result}</pre>
      </div>
    </React.Fragment>
  );
};

export default Home;
