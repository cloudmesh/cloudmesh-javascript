import React, { useState } from 'react'
import { ipcRenderer } from 'electron'
import { CMS_COMMAND_SEND_SYNC } from '../../../main/constants'
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
import Link from 'next/link'
import InfoIcon from '@material-ui/icons/Info'
import CardActions from '@material-ui/core/CardActions'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined'
import StopOutlinedIcon from '@material-ui/icons/StopOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import PlayArrowOutlinedIcon from '@material-ui/icons/PlayArrowOutlined'


import clases from './index.module.css'

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
    ipcRenderer.invoke(CMS_COMMAND_SEND_SYNC, ['vm', command, vmName])
  }
}

const TableComponentBase = ({ classes, ...restProps }) => (
  <Table.Table {...restProps} className={classes.tableStriped} size="small" />
)

const TableComponent = withStyles(styles, { name: 'TableComponent' })(
  TableComponentBase
)

/*
 * @param {rows} all the row data
 * @param {selectedRows} array of indices of selected row numbers
 * @return {null}
 * Write the code for performing an action on multiple rows here
 */
// const TableActions = ({ rows, selectedRows = [] }) => {
//   const startAllVms = () => {
//     selectedRows.forEach((rowNumber) => {
//       controlVm('start', rows[rowNumber]['hostname'])
//     })
//   }
//   const stopAllVms = () => {
//     selectedRows.forEach((rowNumber) => {
//       controlVm('stop', rows[rowNumber]['hostname'])
//     })
//   }

//   return (
//     <div className={clases.tableActionsContainer}>
//       <div className={clases.tableActions}>
//         <IconButton
//           size="small"
//           onClick={() => startAllVms()}
//           title="Start selected VMs">
//           <PlayCircleFilledWhiteIcon />
//         </IconButton>
//         <IconButton
//           size="small"
//           onClick={() => stopAllVms()}
//           title="Stop selected VMs">
//           <StopIcon />
//         </IconButton>
//       </div>
//     </div>
//   )
// }

// Modify this component to inject custom styles or props to each cell
// To change table's row height - change top and bottom padding value in style (padding: top right bottom left)
const TableCell = ({ cell, ...restProps }) => {
  return (
    <Table.Cell
      {...restProps}
      style={{
        padding: '2px 5px 2px 10px', // top, right, bottom, left
      }}
    />
  )
}

// Modify this component to inject custom styles or props to each row
const TableRow = ({ row, ...restProps }) => {
  return <Table.Row {...restProps} />
}

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

  const [vmTableAction, setVmTableAction] = useState('') // start / stop / delete
  const [columns, setColumns] = useState([
    { name: 'name', title: 'Name' },
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
          <Link href="/vm/details/[name]" as={`/vm/details/${row.name}`}>
            <IconButton size="small">
              <InfoOutlinedIcon />
            </IconButton>
          </Link>
          <IconButton
            size="small"
            onClick={() => controlVm('start', row.hostname)}>
            <PlayArrowOutlinedIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => controlVm('stop', row.hostname)}>
            <StopOutlinedIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => controlVm('delete', row.hostname)}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </div>
      ),
    },
  ])

  if(vmTableAction) {
    selectedRows.forEach((rowNumber) => {
      controlVm(vmTableAction, rows[rowNumber]['hostname'])
    })
    setVmTableAction('')
  }

  // Use sorting state from other components to change sorting parameters
  const [sorting, setSorting] = useState([
    { columnName: 'hostname', direction: 'asc' },
  ])
  const [pageSizes] = useState([10, 20, 30, 0])
  const [filters, setFilters] = useState([{ columnName: 'name', value: '' }])
  const [tableColumnExtensions] = useState([
    { columnName: 'actions', width: 140 },
  ])
  const [tableColumnVisibilityColumnExtensions] = useState([
    { columnName: 'hostname', togglingEnabled: false },
  ])
  const [hiddenColumnNames, setHiddenColumnNames] = useState([])
  const [selection, setSelection] = useState([])

  return (
    <Paper>
      {/*<TableActions rows={rows} selectedRows={selection} />*/}
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
          cellComponent={TableCell}
          rowComponent={TableRow}
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
