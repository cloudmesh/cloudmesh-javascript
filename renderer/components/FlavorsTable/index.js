import React from 'react'
import Paper from '@material-ui/core/Paper'
import { DataTypeProvider } from '@devexpress/dx-react-grid'
import {
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  PagingPanel,
  Table,
  TableHeaderRow,
  TableFilterRow,
} from '@devexpress/dx-react-grid-material-ui'
import SizeFilter from '../SizeFilter'

const columns = [
  {
    name: 'name',
    title: 'Name',
    getCellValue: (row) => row?.cm?.name ?? undefined,
  },
  {
    name: 'ram',
    title: 'RAM',
  },
  {
    name: 'vcpus',
    title: 'vCPUs',
  },
  {
    name: 'disk',
    title: 'Disk',
  },
  {
    name: 'updated',
    title: 'Updated',
  },
]

const FlavorsTable = ({ rows = [] }) => (
  <Paper>
    <Grid rows={rows} columns={columns}>
      <DataTypeProvider
        for={['ram', 'vcpus', 'disk']}
        availableFilterOperations={[
          'equal',
          'notEqual',
          'greaterThanOrEqual',
          'lessThanOrEqual',
        ]}
        editorComponent={SizeFilter}
      />
      <SortingState
        defaultSorting={[{ columnName: 'name', direction: 'asc' }]}
      />
      <IntegratedSorting />
      <FilteringState defaultFilters={[]} />
      <IntegratedFiltering />
      <PagingState defaultCurrentPage={0} pageSize={10} />
      <IntegratedPaging />
      <Table />
      <TableHeaderRow showSortingControls={true} />
      <TableFilterRow showFilterSelector={true} />
      <PagingPanel />
    </Grid>
  </Paper>
)

export default FlavorsTable
