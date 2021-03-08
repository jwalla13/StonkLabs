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
  rows.push(createRow('Day High', '$' + currentStock.currentStockInfo.DayHigh))
  rows.push(createRow('Day Low', '$' + currentStock.currentStockInfo.DayLow))
  rows.push(createRow('52 - Week Change', currentStock.currentStockInfo.PercentChange + '%'))
  rows.push(createRow('Volume', currentStock.currentStockInfo.Volume))
  return rows
}

function DetailedStockTable (props) {
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

export default DetailedStockTable
