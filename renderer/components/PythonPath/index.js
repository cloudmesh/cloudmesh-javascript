import React, { useState } from 'react'

const PythonPath = ({ path = 'Not set', onChange }) => {
  const [pathField, setPathField] = useState(null)

  const handleOnChange = () => {
    onChange(pathField)
  }

  return (
    <div>
      <div>Python path</div>
      <div>{path}</div>
      <div>
        <form onSubmit={handleOnChange}>
          <label>
            Change / set your Python environment
            <div>
              <input
                name="pythonPath"
                onChange={(e) => setPathField(e.target.value)}
              />
              <button type="submit">Save</button>
            </div>
          </label>
        </form>
      </div>
    </div>
  )
}

export default PythonPath
