import React from 'react'

const PythonPath = ({ path = 'Not set', onChange }) => {
  const handleOnChange = e => {
    const path = e?.target?.files[0]?.path
    onChange(path)
  }
  return (
    <>
      <dl>
        <dt>Python environment</dt>
        <dd>{path}</dd>
      </dl>
      <label>
        Change / set your Python environment
        <input type="file" name="pythonPath" onChange={handleOnChange} />
      </label>
    </>
  )
}

export default PythonPath
