// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'
import Button from '@mui/material/Button'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'

interface RowType {
  name: string
  email: string
  role: string
  phone: string
  action: string
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const rows: RowType[] = [
  {
    name: 'Kazi',
    email: 'eebsworth2m@sbwire.com',
    role: 'Admin',
    action: '',
    phone: '01775454545'
  },
  {
    name: 'Dollon',
    email: 'eebsworth2m@sbwire.com',
    role: 'Admin',
    action: '',
    phone: '01775454545'
  },
  {
    name: 'Arefin',
    email: 'eebsworth2m@sbwire.com',
    role: 'Admin',
    action: '',
    phone: '01775454545'
  },
  {
    name: 'Shakil',
    email: 'eebsworth2m@sbwire.com',
    role: 'Admin',
    action: '',
    phone: '01775454545'
  },
  {
    name: 'Julfikar',
    email: 'eebsworth2m@sbwire.com',
    role: 'Admin',
    action: '',
    phone: '01775454545'
  },
  {
    name: 'Mujhahid',
    email: 'eebsworth2m@sbwire.com',
    role: 'Admin',
    action: '',
    phone: '01775454545'
  },
  {
    name: 'Protik',
    email: 'eebsworth2m@sbwire.com',
    role: 'Admin',
    action: '',
    phone: '01775454545'
  }
]

const statusObj: StatusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

const StaffTable = () => {
  return (
    <Card>
      <TableContainer>
        <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: RowType) => (
              <TableRow hover key={row.name} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>{row.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  <Button color='error' variant='contained'>
                    <span style={{ color: 'white' }}>Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default StaffTable
