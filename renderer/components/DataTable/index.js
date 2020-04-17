import React, { useState } from 'react'
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid'

import Paper from '@material-ui/core/Paper'
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  ColumnChooser,
  TableColumnVisibility,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

const styles = (theme) => ({
  tableStriped: {
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
    },
  },
})

const TableComponentBase = ({ classes, ...restProps }) => (
  <Table.Table {...restProps} className={classes.tableStriped} />
)

const TableComponent = withStyles(styles, { name: 'TableComponent' })(
  TableComponentBase
)

export default ({ rows = [] }) => {
  console.log('rows', rows[1]);
  const [columns] = useState([
    { name: 'hostname', title: 'Hostname' },
    { name: 'ip_public', title: 'Public IP' },
    { name: 'status', title: 'Status' },
    { name: metadata.image, title: 'Image' }
  ])

  // Use sorting state from other components to change sorting parameters
  const [sorting, setSorting] = useState([
    { columnName: 'name', direction: 'asc' },
  ])
  const [pageSizes] = useState([5, 10, 15, 0])
  const [filters, setFilters] = useState([{ columnName: 'name', value: '' }])
  const [tableColumnExtensions] = useState([
    { columnName: 'actions', width: 100 },
  ])
  const [tableColumnVisibilityColumnExtensions] = useState([
    { columnName: 'name', togglingEnabled: false },
  ])
  const [hiddenColumnNames, setHiddenColumnNames] = useState([])

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <FilteringState filters={filters} onFiltersChange={setFilters} />
        <IntegratedFiltering />
        <PagingState defaultCurrentPage={0} defaultPageSize={5} />
        <IntegratedPaging />
        <SortingState sorting={sorting} onSortingChange={setSorting} />
        <IntegratedSorting />
        <Table
          tableComponent={TableComponent}
          columnExtensions={tableColumnExtensions}
        />
        <TableColumnVisibility
          hiddenColumnNames={hiddenColumnNames}
          onHiddenColumnNamesChange={setHiddenColumnNames}
          columnExtensions={tableColumnVisibilityColumnExtensions}
        />
        <Toolbar />
        <ColumnChooser />
        <TableFilterRow />
        <TableHeaderRow showSortingControls />
        <PagingPanel pageSizes={pageSizes} />
      </Grid>
    </Paper>
  )
}
