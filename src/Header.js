import * as React     from 'react'
import AppBar         from '@mui/material/AppBar'
import Box            from '@mui/material/Box'
import Toolbar        from '@mui/material/Toolbar'
import Typography     from '@mui/material/Typography'
import Button         from '@mui/material/Button'
import IconButton     from '@mui/material/IconButton'
import { useHistory } from "react-router-dom";

export default function ButtonAppBar() {
  const history = useHistory()
  
  // ログアウトクリック時の処理
  const handleLogout = () => {
  }

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
            onClick  = {() => {
              history.push("/")}} 
            sx={{ flexGrow: 1 ,color:"#ffffff"}}>
            miniMoto業務測定
          </Typography>
            <Button 
              color="inherit"
              onClick  = {() => {
                handleLogout()
                history.push("/login")}}>ログアウト</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
