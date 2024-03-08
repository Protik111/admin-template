import { Box, Card } from 'mdi-material-ui'
import Grid from '@mui/material/Grid'
import Table from 'src/views/dashboard/Table'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { Button } from '@mui/material'
import { useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import StaffTable from 'src/views/role/StaffTable'

const style = {
  position: 'absolute' as 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const index = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Grid>
        <Grid container justifyContent='space-between' alignItems='center'>
          <Typography variant='h5'>Role Management</Typography>
          <Button size='large' variant='contained' onClick={handleOpen}>
            Add Staff
          </Button>
        </Grid>
        <Grid sx={{ mt: 5 }}>
          <StaffTable />
        </Grid>
      </Grid>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500
          }
        }}
        sx={{ width: '100%' }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id='transition-modal-title' variant='h6' component='h2'>
              Text in a modal
            </Typography>
            <Typography id='transition-modal-description' sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default index
