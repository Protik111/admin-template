import Typography, { TypographyProps } from '@mui/material/Typography'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import parsePhoneNumber, { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { useTheme } from '@mui/material/styles'
import { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'

import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icons Imports
import Google from 'mdi-material-ui/Google'
import Github from 'mdi-material-ui/Github'
import Twitter from 'mdi-material-ui/Twitter'
import Facebook from 'mdi-material-ui/Facebook'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { ChangeEvent, useState, MouseEvent, ReactNode, useEffect } from 'react'
import { useAllRole, useAllStaff, useStaffCreate } from 'src/@core/lib/react-query/role/roleQueries'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

type CreateRoleModalProps = {
  handleClose: () => void
  open: boolean
}

interface State {
  email: string
  password: string
  firstName: string
  lastName: string
  showPassword: boolean
  permissions: string[]
  phone: string
}

const CreateRoleModal = ({ handleClose, open }: CreateRoleModalProps) => {
  const { mutate: createStaff, isSuccess } = useStaffCreate()
  const { isLoading, isError, data, refetch } = useAllStaff()

  // ** State
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    showPassword: false,
    permissions: [],
    phone: ''
  })

  const [error, setError] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    permissions: false,
    phone: false
  })

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<{ value: unknown }> | SelectChangeEvent<string[]>) => {
      const value = event.target.value as string[] // Cast the value to string array
      setValues({ ...values, [prop]: value })
      setError({ ...error, [prop]: false })
    }

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault()
    const staffData = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      permission: values.permissions,
      password: values.password
    }
    if (staffData) {
      createStaff(staffData)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      handleClose()

      //calling get all staff refetch function
      refetch()
    }
  }, [isSuccess])

  /**
   * @desc all roll will be implemented later in the state
   */

  // const { isLoading, isError, data } = useAllRole()

  // console.log('data', data)

  // useEffect(() => {
  //   if (data && data.roles && data.roles.length > 0) {
  //     const permissionsArray = data.roles.flatMap((role: any) => Object.keys(role.permissions))
  //     setValues(prevValues => ({
  //       ...prevValues,
  //       permissions: permissionsArray
  //     }))
  //   }
  // }, [data])

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        Create Staff
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme => theme.palette.grey[500]
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <form onSubmit={handleAddStaff} style={{ padding: '30px 20px' }}>
          <TextField
            autoFocus
            fullWidth
            type='email'
            id='email'
            name='email'
            value={values.email}
            onChange={handleChange('email')}
            label='Email'
            sx={{ marginBottom: 4 }}
            required
            error={error.email}
          />
          <TextField
            fullWidth
            type='firstname'
            id='firstname'
            name='firstname'
            value={values.firstName}
            onChange={handleChange('firstName')}
            label='First Name'
            sx={{ marginBottom: 4 }}
            required
            error={error.firstName}
          />
          <TextField
            fullWidth
            type='lastName'
            id='lastName'
            name='lastName'
            value={values.lastName}
            onChange={handleChange('lastName')}
            label='Last Name'
            sx={{ marginBottom: 4 }}
            required
            error={error.lastName}
          />
          <FormControl fullWidth>
            <InputLabel htmlFor='auth-login-password'>Password *</InputLabel>
            <OutlinedInput
              label='Password'
              value={values.password}
              id='auth-login-password'
              onChange={handleChange('password')}
              type={values.showPassword ? 'text' : 'password'}
              required
              error={error.password}
              sx={{ marginBottom: 4 }}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    edge='end'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    aria-label='toggle password visibility'
                  >
                    {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id='permissions'>Role</InputLabel>
            <Select
              labelId='permissions'
              id='demo-simple-select'
              name='permissions'
              value={values.permissions}
              multiple // Enable multiple selection
              onChange={handleChange('permissions')}
              sx={{ marginBottom: 4 }}
            >
              <MenuItem value='65bfb0846c34d40f8b798b87'>Admin Role</MenuItem>
            </Select>
          </FormControl>

          {/* <FormControl fullWidth>
            <PhoneInput defaultCountry='bd' value={values.phone} onChange={phone => handleChange('phone')} />
          </FormControl> */}

          <Button
            fullWidth
            size='large'
            variant='contained'
            type='submit'
            // onClick={() => router.push('/')}
          >
            Create Role
            {/* {isLoading ? <CircularProgress size={'16px'} color='info' /> : 'Login'} */}
          </Button>
        </form>
      </DialogContent>
      {/* <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      </DialogActions> */}
    </BootstrapDialog>
  )
}

export default CreateRoleModal
