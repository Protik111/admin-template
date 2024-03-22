import Typography, { TypographyProps } from '@mui/material/Typography'
import { Button, CircularProgress, FormControlLabel, Grid, Switch } from '@mui/material'
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
import { useAllRole, useAllStaff, useStaffCreate, useStaffUpdate } from 'src/@core/lib/react-query/role/roleQueries'

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
  isUpdate?: boolean
  staffDataUpdate?: any
}

interface Permissions {
  read: boolean
  create: boolean
  update: boolean
  delete: boolean
}

interface RolePermissions {
  staff: Permissions
  role: Permissions
  user: Permissions
  blog: Permissions
}

interface State {
  name: string
  description: string
  permissions: RolePermissions
}

interface Perm {
  permissions: { name: string; id: string }[]
}

const AddRoleModal = ({ handleClose, open, isUpdate, staffDataUpdate }: CreateRoleModalProps) => {
  const { isLoading: createStaffLoading, mutate: createStaff, isSuccess } = useStaffCreate()
  const { isLoading: updateStaffLoading, mutate: updateStaff, isSuccess: updateIsSuccess } = useStaffUpdate()
  const { isLoading, isError, data, refetch } = useAllStaff()

  // ** State
  const [values, setValues] = useState<State>({
    name: isUpdate ? staffDataUpdate?.user?.email : '',
    description: isUpdate ? staffDataUpdate?.description : '',
    permissions: {
      staff: { read: false, create: false, update: false, delete: false },
      role: { read: false, create: false, update: false, delete: false },
      user: { read: false, create: false, update: false, delete: false },
      blog: { read: false, create: false, update: false, delete: false }
    }
  })

  const resetValues = () => {
    setValues({
      name: '',
      description: '',
      permissions: {
        staff: { read: false, create: false, update: false, delete: false },
        role: { read: false, create: false, update: false, delete: false },
        user: { read: false, create: false, update: false, delete: false },
        blog: { read: false, create: false, update: false, delete: false }
      }
    })
  }

  //   useEffect(() => {
  //     setValues({
  //       email: isUpdate ? staffDataUpdate?.user?.email : '',
  //       password: '',
  //       firstName: isUpdate ? staffDataUpdate?.user?.firstName : '',
  //       lastName: isUpdate ? staffDataUpdate?.user?.lastName : '',
  //       showPassword: false,
  //       permissions: [],
  //       phone: ''
  //     })
  //   }, [staffDataUpdate])

  //   const [perm, setPerm] = useState<Perm>({
  //     permissions: []
  //   })

  const [error, setError] = useState({
    name: false,
    description: false,
    permissions: false
  })

  const handleChange =
    (prop: keyof State, key?: string, permKey?: string, permVal?: boolean) =>
    (event: React.ChangeEvent<{ value: unknown }> | SelectChangeEvent<string[]>) => {
      if (prop === 'permissions') {
        setValues(prevState => ({
          ...prevState,
          permissions: {
            ...prevState.permissions,
            [key as string]: {
              ...prevState.permissions[key as keyof RolePermissions], // Correcting the type assertion
              [permKey as string]: permVal
            }
          }
        }))
      } else {
        console.log('event', event.target.value)
        const value = event.target.value as string[] // Cast the value to string array
        setValues({ ...values, [prop]: value })
        setError({ ...error, [prop]: false })
      }
    }

  console.log('vakk', values)

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault()
    const staffData = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      permission: values.permissions,
      password: values.password
    }
    if (staffData && !isUpdate) {
      createStaff(staffData)
    }

    if (staffData && isUpdate) {
      if (staffDataUpdate?.user?._id) {
        updateStaff({ id: staffDataUpdate?.user?._id, staffData }) // Pass the _id property along with staffData
      } else {
        console.error('No _id property found in staffDataUpdate')
      }
    }
  }

  useEffect(() => {
    if (isSuccess) {
      handleClose()
      resetValues()

      //calling get all staff refetch function
      refetch()
    }
  }, [isSuccess])

  useEffect(() => {
    if (updateIsSuccess) {
      handleClose()
    }
  }, [updateIsSuccess])

  const { isLoading: rolesLoading, isError: rolesError, data: allRoles, isFetched: isFetchedRoll } = useAllRole()

  useEffect(() => {
    if (allRoles && allRoles?.roles && allRoles?.roles?.length > 0) {
      const permissionsArray = allRoles.roles.map((role: any) => ({
        name: role?.name,
        id: role?._id
      }))
      //   setPerm(prevValues => ({
      //     ...prevValues,
      //     permissions: permissionsArray
      //   }))
    }
  }, [isFetchedRoll])

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  // console.log('staffDataUpdate from updateModal', staffDataUpdate)

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        {isUpdate ? 'Update Roll' : 'Add Roll'}
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={() => {
          handleClose()
          resetValues()
        }}
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
            type='text'
            id='name'
            name='name'
            value={values.name}
            onChange={handleChange('name')}
            label='Name'
            sx={{ marginBottom: 4 }}
            required
            error={error.name}
          />
          <TextField
            fullWidth
            type='description'
            id='description'
            name='description'
            value={values.description}
            onChange={handleChange('description')}
            label='Description'
            sx={{ marginBottom: 4 }}
            required
            error={error.description}
          />

          <Grid direction='column' gap='10'>
            {Object.entries(values?.permissions).map(([key, value]) => (
              <Box key={key}>
                <Typography variant='h6' sx={{ borderBottom: '1px solid #D3D3D3', textTransform: 'capitalize' }}>
                  {key}
                </Typography>

                {Object.entries(value).map(([permKey, permVal]) => (
                  <FormControlLabel
                    key={permKey}
                    control={
                      <Switch
                        checked={permVal as boolean}
                        onChange={handleChange('permissions', key, permKey, !permVal as boolean)}
                        name='gilad'
                      />
                    }
                    label={permKey}
                  />
                ))}
              </Box>
            ))}
          </Grid>

          <Box mt={5}>
            {isUpdate ? (
              <Button
                fullWidth
                size='large'
                variant='contained'
                type='submit'
                // onClick={() => router.push('/')}
              >
                {updateStaffLoading ? <CircularProgress size={22} color='secondary' /> : 'Update Role'}
              </Button>
            ) : (
              <Button
                fullWidth
                size='large'
                variant='contained'
                type='submit'
                // onClick={() => router.push('/')}
              >
                {createStaffLoading ? <CircularProgress size={22} color='secondary' /> : 'Add Role'}
              </Button>
            )}
          </Box>
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

export default AddRoleModal
