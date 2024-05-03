import { Button, Grid, Typography } from '@mui/material'
import { Box } from 'mdi-material-ui'
import { useState } from 'react'
import BlogTable from 'src/@core/components/blogs/BlogTable'
import CreateBlogModal from 'src/@core/components/blogs/CreateBlogModal'
import StaffTable from 'src/views/role/StaffTable'

const index = () => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <Grid>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Typography variant='h5'>Blog Management</Typography>
          <Button size='large' variant='contained' onClick={handleClickOpen}>
            Add New
          </Button>
        </Grid>
        <Grid sx={{ mt: 5 }}>
          <BlogTable />
        </Grid>
      </Grid>
      {/* Role create modal */}
      <CreateBlogModal open={open} handleClose={handleClose} />
    </>
  )
}

export default index
