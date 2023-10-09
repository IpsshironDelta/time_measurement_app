import React ,
      {useState, }     from "react"
import {Avatar,
        AppBar,
        Toolbar,
        Box,
        Typography, }  from "@mui/material"
import IconButton      from '@mui/material/IconButton'

export default function ButtonAppBar(props) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static"
        style={{ backgroundColor: "#6495ed" }} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography 
            variant="h6" 
            component="div"
            sx={{ flexGrow: 1 ,color:"#ffffff"}}>
            miniMoto業務測定
          </Typography>
            <IconButton 
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}>
                <Avatar 
                  src={""}
                  alt="" />
                {/* アバターアイコンをクリックしたらメニュー表示する */}
            </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
