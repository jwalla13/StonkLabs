import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles({
  table: {

  }
})

function createRow (field, value) {
  return { field, value }
}

function setData (currentStock) {
  const rows = []
  rows.push(createRow('Price', '$' + currentStock.currentStockInfo.Price))
  rows.push(createRow('Sector', currentStock.currentStockInfo.Sector))
  return rows
}

function BasicStockTable (props) {
  const currentStock = props.currentStock
  const rows = setData(currentStock)

  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.field}>
              <TableCell component='th' scope='row'>
                <b> {row.field} </b>
              </TableCell>
              <TableCell align='right'>{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicStockTable
