import Typography, { TypographyProps } from '@mui/material/Typography'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

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
import { ChangeEvent, useState, MouseEvent, ReactNode } from 'react'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

type CreateRoleModalProps = {
  handleClose: (event: React.MouseEvent<HTMLButtonElement>) => void
  open: boolean
}

interface State {
  email: string
  password: string
  firstName: string
  lastName: string
  showPassword: boolean
  permissions: string[]
}

const CreateRoleModal = ({ handleClose, open }: CreateRoleModalProps) => {
  // ** State
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    showPassword: false,
    permissions: []
  })

  const [error, setError] = useState({
    email: false,
    password: false,
    firstName: false,
    lastName: false,
    permissions: false
  })

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<{ value: unknown }> | SelectChangeEvent<string[]>) => {
      const value = event.target.value as string[] // Cast the value to string array
      setValues({ ...values, [prop]: value })
      setError({ ...error, [prop]: false })
    }

  const handleAddStaff = () => {
    console.log('err')
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  console.log('values', values)

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        Create Role
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
        <form noValidate onSubmit={handleAddStaff} style={{ padding: '30px 20px' }}>
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
            autoFocus
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
            autoFocus
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
              <MenuItem value='10'>Ten</MenuItem>
              <MenuItem value='20'>Twenty</MenuItem>
              <MenuItem value='30'>Thirty</MenuItem>
            </Select>
          </FormControl>

          <Button
            fullWidth
            size='large'
            variant='contained'
            sx={{ marginBottom: 7 }}
            type='submit'
            // onClick={() => router.push('/')}
          >
            TEst
            {/* {isLoading ? <CircularProgress size={'16px'} color='info' /> : 'Login'} */}
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Save changes
        </Button>
      </DialogActions>
    </BootstrapDialog>
  )
}

export default CreateRoleModal
