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
import { useState, MouseEvent, ReactNode, useEffect, ChangeEvent } from 'react'
import dynamic from 'next/dynamic'
import { useAllTags, useBlogCreate, useBlogUpdate } from 'src/@core/lib/react-query/blog/blogQueries'

type UpdateBlogModalProps = {
  handleClose: () => void
  open: boolean
  isUpdate?: boolean
  blogDataUpdate?: any
}

export type BlogState = {
  id?: string
  title: string
  description: string
  thumbnail: File | string
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

const CreateBlogModal = ({ handleClose, open, isUpdate, blogDataUpdate }: UpdateBlogModalProps) => {
  const { isLoading: isLoadingTag, isError, data: allTags, isFetched, refetch } = useAllTags()
  const { isLoading: createBlogLoading, mutate: createBlog, isSuccess } = useBlogCreate()
  const { isLoading: updateBlogLoading, mutate: updateBlog, isSuccess: blogIsSuccess } = useBlogUpdate()

  // ** State
  const [value, setValue] = useState('')
  const [values, setValues] = useState<BlogState>({
    title: isUpdate ? blogDataUpdate?.title : '',
    description: isUpdate ? blogDataUpdate?.description : '',
    thumbnail: isUpdate ? blogDataUpdate?.thumbnail : '',
    isPublished: isUpdate ? blogDataUpdate?.isPublished : false,
    slug: isUpdate ? blogDataUpdate?.slug : '',
    metaTitle: isUpdate ? blogDataUpdate?.metaTitle : '',
    tags: isUpdate ? blogDataUpdate?.tags : []
  })

  useEffect(() => {
    setValues({
      title: isUpdate ? blogDataUpdate?.title : '',
      description: isUpdate ? blogDataUpdate?.description : '',
      thumbnail: isUpdate ? blogDataUpdate?.thumbnail : '',
      isPublished: isUpdate ? blogDataUpdate?.isPublished : false,
      slug: isUpdate ? blogDataUpdate?.slug : '',
      metaTitle: isUpdate ? blogDataUpdate?.metaTitle : '',
      tags: isUpdate ? blogDataUpdate?.tags : []
    })
  }, [blogDataUpdate])

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
    (prop: keyof BlogState, key?: boolean) =>
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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setValues({ ...values, thumbnail: file })
    }
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()

    const { title, description, thumbnail } = values

    if (title && description && thumbnail && !isUpdate) {
      if (thumbnail instanceof File) {
        // Check if thumbnail is a File
        createBlog({ ...values, thumbnail: thumbnail.name })
        handleClose()
      }
    }

    if (title && description && thumbnail && isUpdate) {
      if (thumbnail instanceof File) {
        // Check if thumbnail is a File
        updateBlog({ id: blogDataUpdate?._id, blogData: { ...values, thumbnail: thumbnail.name } })
      }
    }
  }

  useEffect(() => {
    if (isSuccess) {
      handleClose()
      // resetValues()

      //calling get all staff refetch function
      refetch()
    }
  }, [isSuccess])

  useEffect(() => {
    if (blogIsSuccess) {
      handleClose()
    }
  }, [blogIsSuccess])

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
                value={values.description}
                onChange={handleDescriptionChange}
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
                  alt='Image'
                  style={{ borderRadius: '5px' }}
                  src={
                    values.thumbnail instanceof File
                      ? URL.createObjectURL(values.thumbnail)
                      : values.thumbnail || '/images/profile.jpg'
                  }
                  // src={values.thumbnail ? URL.createObjectURL(values.thumbnail) : '/images/profile.jpg'}
                />
                <label htmlFor='contained-button-file' style={{ marginTop: '5px' }}>
                  <Button variant='outlined' component='span'>
                    <input
                      accept='image/*'
                      id='contained-button-file'
                      style={{ background: 'transperant' }}
                      multiple
                      type='file'
                      onChange={handleImageChange}
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
                {isUpdate ? (
                  <Button
                    // fullWidth
                    size='large'
                    variant='contained'
                    type='submit'
                    // onClick={() => router.push('/')}
                  >
                    {updateBlogLoading ? <CircularProgress size={22} color='secondary' /> : 'Update Blog'}
                  </Button>
                ) : (
                  <Button
                    // fullWidth
                    size='large'
                    variant='contained'
                    type='submit'
                    // onClick={() => router.push('/')}
                  >
                    {createBlogLoading ? <CircularProgress size={22} color='secondary' /> : 'Create Blog'}
                  </Button>
                )}
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
