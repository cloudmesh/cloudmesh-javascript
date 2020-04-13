import React from 'react'
import PropTypes from 'prop-types'

const VmTableView = ({ vmData = null, onRefresh = () => {} }) => {
  const output = vmData?.output ?? []
  return (
    <>
      <h2>VM Table View</h2>
      <button onClick={onRefresh}>Refresh</button>
      <table>
        <tbody>
          {output.map(({ id, name, ip_public, status }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{ip_public}</td>
              <td>{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

VmTableView.propTypes = {
  vmData: PropTypes.object,
  onRefresh: PropTypes.func,
}

export default VmTableView
