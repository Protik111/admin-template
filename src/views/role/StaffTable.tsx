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
import CircularProgress from '@mui/material/CircularProgress'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { useAllStaff } from 'src/@core/lib/react-query/role/roleQueries'
import { useEffect, useState } from 'react'
import { LinearProgress } from '@mui/material'

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

const statusObj: StatusObj = {
  applied: { color: 'info' },
  rejected: { color: 'error' },
  current: { color: 'primary' },
  resigned: { color: 'warning' },
  professional: { color: 'success' }
}

interface Staff {
  _id: string
  user: {
    firstName: string
    lastName: string
    email: string
    role: string
    phone: {
      countryCode: string
      number: string
    }
  }
}

const StaffTable = () => {
  const { isLoading, isError, data } = useAllStaff()
  const [staffData, setStaffData] = useState([])

  useEffect(() => {
    if (data && data.success) {
      setStaffData(data.staffs)
    }
  }, [data])

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

  console.log('staffData', staffData)

  return (
    <Card>
      <TableContainer>
        <Table aria-label='table in dashboard'>
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
            {isLoading ? (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            ) : (
              staffData?.map((staff: Staff) => (
                <TableRow key={staff?._id} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>
                      {staff?.user?.firstName} {staff?.user?.lastName}
                    </Typography>
                  </TableCell>
                  <TableCell>{staff?.user?.email}</TableCell>
                  <TableCell>{staff?.user?.role}</TableCell>
                  <TableCell>{staff?.user?.phone?.countryCode + staff?.user?.phone?.number}</TableCell>
                  <TableCell>
                    <Button color='error' variant='contained'>
                      <span style={{ color: 'white' }}>Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default StaffTable
