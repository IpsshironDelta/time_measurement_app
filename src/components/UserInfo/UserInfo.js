import React, 
     { useState , 
       useEffect}         from 'react'
import { Avatar,
        Paper,
        Typography,
        CssBaseline,
        Box,
        Button,
        Container,
        Grid , 
        Tabs ,
        Tab , }           from "@mui/material"
import { useHistory }     from "react-router-dom";
import Header             from "../../Header"
import { styled }         from '@mui/material/styles';
import TableCell, 
     { tableCellClasses } from '@mui/material/TableCell';
import TableRow           from '@mui/material/TableRow';
import TaskIcon           from '@mui/icons-material/Task';
import store              from '../../store';
////////////////////////////////////////////
//　定数
////////////////////////////////////////////

////////////////////////////////////////////
// スタイル
////////////////////////////////////////////
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#ff5757',
  borderColor: '#EC6671',
  color : '#ffffff',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#EC6671',
    borderColor: '#EC6671',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#EC6671',
    borderColor: '#EC6671',
  },
})
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1e90ff",
    color: "#ffffff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

function UserInfo(data) {
  const [image    , setImage]    = useState(store.getState().imageURL)
  const [name     , setName]     = useState(store.getState().userName)


  // 初回起動時
  useEffect(() => {
    // ユーザー情報を取得する
  },[])

  const history = useHistory()

  return (
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#f5f5f5' }}>
        <Header/>
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">ユーザー情報</Typography >
          </Grid>

          {/* データ表示領域 */}
          <Grid item xs={1} align="center"></Grid>
          <Grid item xs={10} align="center">
            <Typography 
              sx = {{ fontSize: 18 ,
                backgroundColor : "#f5f5f5",
                color : "#000000",}}>
              ユーザー名
            </Typography>
            {/* ユーザー名表示 */}
            <Typography 
              align="left"
              sx={{ p: 1, 
                    fontSize: 14 , 
                    background: "#f5f5f5" ,
                    borderTop    : "solid #6495ed 2px",
                    borderBottom : "solid #6495ed 2px",
                    borderLeft   : "solid #6495ed 2px",
                    borderRight  : "solid #6495ed 2px",
                    borderRadius : 5,
                    color:"#6495ed",
                    borderRadius : 3,}}>
              {name ? name : "-"}
            </Typography>
          </Grid>
          <Grid item xs={1} align="center"></Grid>

          <Grid item xs={12} align="center">
            <Typography 
              sx = {{ fontSize: 18 ,
                backgroundColor : "#f5f5f5",
                color : "#000000",}}>
              プロフィール画像
            </Typography>
            {/* アバター画像表示 */}
            <Avatar
              sx={{ width: 100, height: 100 }}
              src={image ? image : ""}alt=""/>
              <input
                  id     = "image"
                  type   = "file"
                  accept = "image/*"
                  style  = {{ display: "none" }}/>
            <br/>
          </Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={6} align="center">
            <Button
                variant="contained"
                onClick  = {() => {
                    history.push("/userinfo/edit")}}
                endIcon={<TaskIcon />}>ユーザー情報を編集する</Button>
          </Grid>
          <Grid item xs={6} align="center">
            <Button
                variant="contained"
                onClick  = {() => {
                    history.push("/recordinfo")}}
                endIcon={<TaskIcon />}>過去の記録を確認する</Button>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default UserInfo;
