import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import electron from 'electron'
import DataTable from '../components/DataTable';
import CloudmeshEnvChooser from "../components/CloudmeshEnvChooser";
import {
  getAllVMs
} from '../helpers/json-data-extractors';

import {
  getAllvmsmock
} from '../mock-json-allvms'

// prevent SSR webpacking
const ipcRenderer = electron.ipcRenderer || false;

const Home = () => {
  const [result, setResult] = useState('');
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
        let allVMs = getAllVMs(parsedData);

        // console.log('result received', getAllVMNames(parsedData))
        setResult(allVMs);
        console.log('result', allVMs)
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

  const renderResult = (obj) => {
      return <div
        key={obj}
        style={{
          background: "#ddd",
          border: "1px solid black",
          borderRadius: "4px",
          width: "400px",
          padding: "20px",
          margin: "10px"
        }}>
          <div>{obj.name}</div>
          <div>{obj.status}</div>
          <div>{obj.state}</div>
        </div>
  }

  return (
    <React.Fragment>
      <Head>
        <title>Home - Cloudmesh</title>
        <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" />
      </Head>
      <div style={{background: 'white'}}>
        <h2>Cloudmesh</h2>
        <div>vm list --output=json</div>
        <div>
          <CloudmeshEnvChooser binPath={cmsBin} onChange={onChange}/>
        </div>
        <div>
          Enter your CMS command: <input type="text" ref={inputRef}/>
          <button onClick={onClick}>Execute</button>
        </div>
        <div
          style={{display: 'flex'}}
  >{getAllvmsmock().map(renderResult)} {result && result.map(renderResult())}</div>
      </div>
      <DataTable />
    </React.Fragment>
  );
};

export default Home;
