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
import { useAllStaff, useStaffDeletion } from 'src/@core/lib/react-query/role/roleQueries'
import { useEffect, useState } from 'react'
import { FormControlLabel, LinearProgress, Switch } from '@mui/material'
import { Grid } from 'mdi-material-ui'

import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import CreateRoleModal from 'src/@core/components/role/CreateRoleModal'
import { useAllBlogs, useBlogDeletion } from 'src/@core/lib/react-query/blog/blogQueries'
import CreateBlogModal, { BlogState } from './CreateBlogModal'

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
    id: string
    phone: {
      countryCode: string
      number: string
    }
  }
}

const BlogTable = () => {
  const { isLoading: getBlogLoading, data: allBlogs, mutate: getAllBlogs, isSuccess } = useAllBlogs()
  const { isLoading: deleteLoading, mutate: blogDelete, isSuccess: deleteSuccess } = useBlogDeletion()

  useEffect(() => {
    getAllBlogs({ page: 1, limit: 10, state: 'all', platform: 'brainsbin' })
  }, [deleteSuccess])

  const [blogDataUpdate, setBlogDataUpdate] = useState([])
  const [open, setOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  //modal for edit modal start
  const [openEditModal, setOpenEditModal] = useState(false)

  const handleClickOpenEditModal = (blog: any) => {
    setBlogDataUpdate(blog)
    setOpenEditModal(true)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
  }
  //modal for edit modal end

  const handleClickOpen = (id: string) => {
    setOpen(true)
    setSelectedId(id)
  }

  const handleClose = () => {
    setOpen(false)
  }

  // useEffect(() => {
  //   if (data && data.success && !staffData.length) {
  //     setStaffData(data.staffs)
  //   }
  // }, [])

  //delete blog
  const handleDeleteBlog = () => {
    console.log('s', selectedId)
    blogDelete(selectedId)
  }

  useEffect(() => {
    if (deleteSuccess) {
      // refetchAllStaff()
      handleClose()
    }
  }, [deleteSuccess])

  return (
    <Card>
      <TableContainer>
        <Table aria-label='table in dashboard'>
          <TableHead>
            <TableRow>
              <TableCell>Thumbnail</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Meta Title</TableCell>
              <TableCell>Public</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getBlogLoading ? (
              <Box sx={{ width: '100%' }}>
                <LinearProgress />
              </Box>
            ) : (
              allBlogs?.articles?.map((article: BlogState) => (
                <TableRow sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell>
                    <Typography sx={{ fontWeight: 500 }}>
                      <img src={article?.thumbnail as string} alt='' />
                    </Typography>
                  </TableCell>
                  <TableCell>{article?.title}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>{article?.description}</TableCell>
                  <TableCell>{article?.metaTitle}</TableCell>
                  <TableCell>
                    <FormControlLabel
                      control={<Switch key={1} checked={article?.isPublished as boolean} name='isPublished' />}
                      label={article?.isPublished ? 'Yes' : 'No'}
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                      <Button onClick={() => handleClickOpenEditModal(article)} color='success' variant='contained'>
                        <span style={{ color: 'white' }}>Update</span>
                      </Button>
                      <Button onClick={() => handleClickOpen(article?._id as string)} color='error' variant='contained'>
                        <span style={{ color: 'white' }}>Delete</span>
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Are you sure to delete the blog permanently?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Deleting blog from this panel will erase all the information related to this blog.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='error' variant='contained' onClick={handleClose}>
            Disagree
          </Button>
          <Button color='success' variant='contained' onClick={handleDeleteBlog} autoFocus>
            {deleteLoading ? <CircularProgress size={22} color='secondary' /> : 'Agree'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Blog update modal */}
      <CreateBlogModal
        open={openEditModal}
        handleClose={handleCloseEditModal}
        isUpdate={true}
        blogDataUpdate={blogDataUpdate}
      />
    </Card>
  )
}

export default BlogTable
