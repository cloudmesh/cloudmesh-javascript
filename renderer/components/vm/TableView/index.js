import React from 'react'
import PropTypes from 'prop-types'
import DataTable from '../../DataTable'

import Button from '@material-ui/core/Button'
import RefreshIcon from '@material-ui/icons/Refresh'

const TableView = ({ vmData = [], onRefresh = () => {} }) => {
  return (
    <>
      <div>
        <Button onClick={onRefresh} color="primary" variant="outlined">
          <RefreshIcon />
        </Button>
      </div>
      <div>{vmData && <DataTable rows={vmData} />}</div>
    </>
  )
}

TableView.propTypes = {
  vmData: PropTypes.arrayOf(PropTypes.object),
  onRefresh: PropTypes.func,
}

export default TableView
