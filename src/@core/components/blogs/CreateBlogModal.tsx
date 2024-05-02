import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  Switch,
  TextareaAutosize,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import parsePhoneNumber, { AsYouType, isValidPhoneNumber } from 'libphonenumber-js'
import { PhoneInput } from 'react-international-phone'
import 'react-international-phone/style.css'

import TextField from '@mui/material/TextField'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icons Imports

import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import { useState, MouseEvent, ReactNode, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useAllTags } from 'src/@core/lib/react-query/blog/blogQueries'

type CreateRoleModalProps = {
  handleClose: () => void
  open: boolean
  isUpdate?: boolean
  staffDataUpdate?: any
}

type State = {
  title: string
  description: string
  thumbnail: string
  isPublished: boolean
  slug: string
  metaTitle: string
  tags: string[]
}

type Tags = {
  name: string
  count: number
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}))

const CreateBlogModal = ({ handleClose, open, isUpdate, staffDataUpdate }: CreateRoleModalProps) => {
  const { isLoading: isLoadingTag, isError, data: allTags, isFetched, refetch } = useAllTags()

  console.log('allTags', allTags)

  // ** State
  const [value, setValue] = useState('')
  const [values, setValues] = useState<State>({
    title: isUpdate ? staffDataUpdate?.user?.email : '',
    description: '',
    thumbnail: isUpdate ? staffDataUpdate?.user?.firstName : '',
    isPublished: false,
    slug: '',
    metaTitle: '',
    tags: []
  })

  const [error, setError] = useState({
    title: false,
    description: false,
    thumbnail: false,
    isPublished: false,
    slug: false,
    metaTitle: false,
    tags: false
  })

  const handleChange =
    (prop: keyof State, key?: boolean) =>
    (event: React.ChangeEvent<{ value: unknown }> | SelectChangeEvent<string[]>) => {
      if (prop === 'isPublished') {
        setValues({ ...values, [prop]: key !== undefined ? key : !values[prop] })
        setError({ ...error, [prop]: false })
      } else {
        const value = event.target.value as string[] // Cast the value to string array
        setValues({ ...values, [prop]: value })
        setError({ ...error, [prop]: false })
      }
    }

  const handleDescriptionChange = (value: string) => {
    setValues({ ...values, description: value })
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()

    console.log('values', values)
  }

  return (
    <BootstrapDialog fullScreen onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        {isUpdate ? 'Update Staff' : 'Create A Blog'}
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={() => {
          handleClose()
          //   resetValues()
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
        <form onSubmit={e => handleCreate(e)} style={{ padding: '30px 20px' }}>
          <Box sx={{ display: 'flex', gap: '15px' }}>
            <Box sx={{ width: '70%' }}>
              <TextField
                autoFocus
                fullWidth
                type='text'
                id='title'
                name='email'
                value={values.title}
                onChange={handleChange('title')}
                error={error.title}
                label='Blog Title'
                sx={{ marginBottom: 4 }}
                required
              />

              <ReactQuill
                style={{ height: '400px' }}
                placeholder='Blog description'
                theme='snow'
                // value={value}
                value={values.description}
                onChange={handleDescriptionChange}
                // onChange={setValue}
              />
            </Box>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  paddingBottom: '10px',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <img
                  width='220'
                  height='200'
                  // className={classes.img}
                  alt='Image'
                  src={'/images/profile.jpg'}
                />
                <label htmlFor='contained-button-file' style={{ marginTop: '5px' }}>
                  <Button variant='outlined' component='span'>
                    Select Image
                    <input
                      accept='image/*'
                      // className={classes.input}
                      id='contained-button-file'
                      multiple
                      type='file'
                      // onChange={this.handleUploadClick}
                    />
                  </Button>
                </label>
              </Box>

              <Typography variant='h6' sx={{ mt: 5 }}>
                Publish Blog
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    key={1}
                    checked={values.isPublished as boolean}
                    onChange={handleChange('isPublished', !values.isPublished)}
                    name='isPublished'
                  />
                }
                label={'Public'}
              />

              <TextField
                fullWidth
                type='text'
                id='title'
                name='email'
                value={values.slug}
                onChange={handleChange('slug')}
                label='Slug'
                sx={{ marginBottom: 4 }}
                required
                // error={error.email}
              />

              <TextField
                fullWidth
                type='text'
                id='title'
                name='metaTitle'
                value={values.metaTitle}
                onChange={handleChange('metaTitle')}
                label='Meta Title'
                sx={{ marginBottom: 4 }}
                required
                // error={error.email}
              />

              <FormControl fullWidth variant='filled' sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id='permissions'>Tags</InputLabel>
                <Select
                  required
                  labelId='permissions'
                  id='demo-simple-select'
                  name='permissions'
                  value={values.tags}
                  placeholder='Selec'
                  multiple
                  onChange={handleChange('tags')}
                  sx={{ marginBottom: 8 }}
                >
                  {!isLoadingTag &&
                    allTags?.tags?.map((tag: Tags, i: number) => (
                      <MenuItem key={i} value={tag?.name}>
                        {tag?.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  // fullWidth
                  size='large'
                  variant='contained'
                  type='submit'
                  // onClick={() => router.push('/')}
                >
                  Create Blog
                </Button>
              </Box>
            </Box>
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

export default CreateBlogModal
