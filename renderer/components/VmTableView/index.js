import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const VmTableView = ({ vmData = null, onRefresh = () => {} }) => {
  const cms = vmData?.cms ?? null
  const output = vmData?.output ?? []
  return (
    <>
      <h2>VM Table View</h2>
      <button onClick={onRefresh}>Refresh</button>
      <table>
        {output.map(({name, ip_public, status}) => (
          <tr>
            <td>{name}</td>
            <td>{ip_public}</td>
            <td>{status}</td>
          </tr>
        ))}
      </table>
    </>
  )
}

VmTableView.propTypes = {
  vmData: PropTypes.object,
  onRefresh: PropTypes.func,
}

export default VmTableView
