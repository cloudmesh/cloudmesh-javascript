import React from 'react'
import Paper from '@material-ui/core/Paper'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui'

const SizeFormatter = ({ value = 0 }) =>
  Number(value / (1024 * 1024 * 1024)).toFixed(2)

const SizeTypeProvider = (props) => (
  <DataTypeProvider formatterComponent={SizeFormatter} {...props} />
)

const columns = [
  {
    name: 'name',
    title: 'Name',
    getCellValue: (row) => row?.cm?.name ?? undefined,
  },
  {
    name: 'region_name',
    title: 'Location',
    getCellValue: (row) => row?.location?.region_name ?? undefined,
  },
  {
    name: 'driver',
    title: 'Driver',
    getCellValue: (row) => row?.cm?.driver ?? undefined,
  },
  {
    name: 'size',
    title: 'Size (GB)',
  },
]

const ImagesTable = ({ rows = [] }) => (
  <Paper>
    <Grid rows={rows} columns={columns}>
      <SizeTypeProvider for={['size']} />
      <Table />
      <TableHeaderRow />
    </Grid>
  </Paper>
)

export default ImagesTable
