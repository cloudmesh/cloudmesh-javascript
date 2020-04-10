import React, {useState} from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Grid,
  Table,
  TableHeaderRow,
} from '@devexpress/dx-react-grid-material-ui';

export default () => {
    const [columns] = useState([
        {name: 'colname', title: 'Col Title'}
    ]);
    const [rows] = useState([
        {colname: 'field 1'},
        {colname: 'field 2'}
    ]);

    console.log(rows, columns);

    return (
        <Paper>
            <Grid
                rows={rows}
                columns={columns}
            >
                <Table />
                <TableHeaderRow />
            </Grid>
        </Paper>
    )
}