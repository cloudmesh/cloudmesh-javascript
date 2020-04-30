import React, { useState } from 'react'
import { ipcRenderer } from 'electron'
import { CMS_COMMAND_SEND } from '../../../main/constants'
import IconButton from '@material-ui/core/IconButton'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite'
import Typography from '@material-ui/core/Typography'
import StopIcon from '@material-ui/icons/Stop'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { green, red, yellow } from '@material-ui/core/colors'
import {
  SortingState,
  IntegratedSorting,
  PagingState,
  IntegratedPaging,
  FilteringState,
  IntegratedFiltering,
  SelectionState,
  IntegratedSelection,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableFilterRow,
  ColumnChooser,
  TableColumnVisibility,
  Toolbar,
  TableSelection,
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

const useStyles = makeStyles((theme) => ({
  green: {
    color: '#fff',
    backgroundColor: green[500],
  },
  yellow: {
    color: theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
}))

const controlVm = async (command, vmName) => {
  if (ipcRenderer) {
    ipcRenderer.invoke(CMS_COMMAND_SEND, ['vm', command, vmName])
  }
}

const TableComponentBase = ({ classes, ...restProps }) => (
  <Table.Table {...restProps} className={classes.tableStriped} size="small" />
)

const TableComponent = withStyles(styles, { name: 'TableComponent' })(
  TableComponentBase
)

export default ({ rows = [] }) => {
  const classes = useStyles()

  let statusColor
  if (status === 'ACTIVE') {
    statusColor = 'green'
  } else if (status === 'SHUTOFF') {
    statusColor = 'red'
  } else if (status === 'ERROR') {
    statusColor = 'yellow'
  }

  const [columns, setColumns] = useState([
    { name: 'hostname', title: 'Hostname' },
    { name: 'ip_public', title: 'Public IP' },
    {
      name: 'status',
      title: 'Status',
      getCellValue: (row) => (
        <Typography color={statusColor}>{row.status}</Typography>
      ),
    },
    {
      name: 'image',
      title: 'Image',
      getCellValue: (row) => row.metadata && row.metadata.image,
    },
    {
      name: 'flavor',
      title: 'Flavor',
      getCellValue: (row) => row.metadata && row.metadata.flavor,
    },
    {
      name: 'actions',
      title: 'Actions',
      getCellValue: (row) => (
        <div>
          <IconButton
            size="small"
            onClick={() => controlVm('start', row.hostname)}>
            <PlayCircleFilledWhiteIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => controlVm('stop', row.hostname)}>
            <StopIcon />
          </IconButton>
        </div>
      ),
    },
  ])

  // Use sorting state from other components to change sorting parameters
  const [sorting, setSorting] = useState([
    { columnName: 'hostname', direction: 'asc' },
  ])
  const [pageSizes] = useState([10, 20, 30, 0])
  const [filters, setFilters] = useState([{ columnName: 'name', value: '' }])
  const [tableColumnExtensions] = useState([
    { columnName: 'actions', width: 100 },
  ])
  const [tableColumnVisibilityColumnExtensions] = useState([
    { columnName: 'hostname', togglingEnabled: false },
  ])
  const [hiddenColumnNames, setHiddenColumnNames] = useState([])
  const [selection, setSelection] = useState([])

  return (
    <Paper>
      <Grid rows={rows} columns={columns}>
        <FilteringState filters={filters} onFiltersChange={setFilters} />
        <IntegratedFiltering />

        <PagingState defaultCurrentPage={0} defaultPageSize={20} />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <IntegratedPaging />
        <IntegratedSelection />
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
        <TableSelection showSelectAll />
        <PagingPanel pageSizes={pageSizes} />
      </Grid>
    </Paper>
  )
}
