import React from 'react'
import PropTypes from 'prop-types'
import DataTable from '../../DataTable'

const TableView = ({ vmData = [], onRefresh = () => {} }) => {
  return (
    <>
      <h2>VM Table View</h2>
      <button onClick={onRefresh}>Refresh</button>
      <DataTable rows={vmData} />
    </>
  )
}

TableView.propTypes = {
  vmData: PropTypes.arrayOf(PropTypes.object),
  onRefresh: PropTypes.func,
}

export default TableView
