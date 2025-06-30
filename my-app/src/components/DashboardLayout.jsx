import { Box, CssBaseline, Toolbar } from '@mui/material'
import React, { useState } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'

const DashboardLayout = ({children}) => {

  const [open, setOpen] = useState(true)

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header open={open} setOpen={setOpen} />
      <Sidebar  open={open} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "#f4f6f8", p: 3, minHeight: "100vh"}}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default DashboardLayout
