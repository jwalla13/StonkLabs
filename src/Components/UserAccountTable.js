import React from 'react'
import { Button } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const UserTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Id</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>First Name</TableCell>
        <TableCell>Last Name</TableCell>
        <TableCell>Password</TableCell>
      </TableRow>
    </TableHead>
  )
}

const UserTableBody = props => {
  const rows = props.characterData.map((row, index) => {
    return (
      <TableRow key={index}>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.firstname}</TableCell>
        <TableCell>{row.lastname}</TableCell>
        <TableCell>{row.password}</TableCell>
        <TableCell>
          <Button onClick={() => props.removeCharacter(index)}>Delete</Button>
        </TableCell>
      </TableRow>
    )
  })

  return <TableBody>{rows}</TableBody>
}

const UserAccountTable = props => {
  const { characterData, removeCharacter } = props

  return (
    <TableContainer component={Paper}>
      <Table>
        <UserTableHead />
        <UserTableBody characterData={characterData} removeCharacter={removeCharacter} />
      </Table>
    </TableContainer>
  )
}

export default UserAccountTable
