import React, 
     { useState , 
       useEffect}           from 'react'
import { Avatar,
        Paper,
        Typography,
        CssBaseline,
        Box,
        Button,
        Container,
        Grid , 
        Tabs ,
        Tab , }             from "@mui/material"
import { useHistory }       from "react-router-dom"
import Header               from "../../Header"
import { styled }           from '@mui/material/styles'
import TableRow             from '@mui/material/TableRow'
import TaskIcon             from '@mui/icons-material/Task'
import EditIcon             from '@mui/icons-material/Edit';
import useUser              from "../hooks/getuseAuth"
import useProfile           from "../hooks/useProfile"
import HomeIcon             from '@mui/icons-material/Home';
import store                from '../../store'
import { firebaseApp ,
        db }                from "../../firebase"
import {collection,
        addDoc,
        getDocs}            from 'firebase/firestore'
import TableCell, 
        { tableCellClasses } from '@mui/material/TableCell'

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
  const [name, setName] = useState()
  const [image, setImage] = useState()
  const [error, setError] = useState(false)
  const [success , setSuccess] = useState(false)
  const [userinfo  ,  setUserInfo]  =  useState()  // ユーザー情報を代入
  const firestorage = firebaseApp.firestorage
  const firestore = firebaseApp.firestore
  const { user } = useUser()
  const profileData = useProfile()
  const profile = profileData.profile
  const UserInfoAry = []

  // pathnameからuidを取得
  const uidAry = window.location.pathname.split("/")
  const getuid = uidAry[2]

  // 初回起動時
  useEffect(() => {
    // ユーザー情報を取得する
    fechUserData()
  },[])

  // ユーザー情報を取得する
  const fechUserData = () => {
    const firestore = firebaseApp.firestore
    console.log("uid => ",getuid)

    getDocs(collection(db, "users" )).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {        
        if (getuid == document.data().uid){
          console.log("一致！ => ", document.data())
          UserInfoAry.push({
            ...document.data(),
          })  
        }
      })
    }).then(()=>{
      setUserInfo([...UserInfoAry])
    })
    console.log("UserInfoAry => " , UserInfoAry)
  }

  // 編集ボタンクリック時の処理
  const handleClickEdit = () =>{
    store.getState().userName     = profile.name
    store.getState().loginUserUID = profile.uid
  }

  const history = useHistory()

  return (
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#f5f5f5' }}>
        <Header/>
        <Paper sx={{ m: 4, p: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} align="center">
              <Typography variant="h4">マイページ</Typography >
            </Grid>

            {/* データ表示領域 */}
            <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <Typography 
                sx = {{ fontSize: 18 ,
                  color : "#000000",}}>
                ニックネーム
              </Typography>
              {/* ニックネーム表示 */}
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
                {name ? name : userinfo ? userinfo[0].name : ""}
              </Typography>
            </Grid>
            <Grid item xs={1} align="center"></Grid>

            {/* <Grid item xs={1} align="center"></Grid>
            <Grid item xs={10} align="center">
              <Typography 
                sx = {{ fontSize: 18 , 
                  color : "#000000",}}> 
                メールアドレス
              </Typography> */}
              {/* メールアドレス表示 */}
              {/* <Typography 
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
                {name ? name : userinfo ? userinfo[0].email : ""}
              </Typography>
            </Grid>
            <Grid item xs={1} align="center"></Grid> */}

            <Grid item xs={12} align="center">
              <Typography 
                sx = {{ fontSize: 18 ,
                  color : "#000000",}}>
                プロフィール画像
              </Typography>
              {/* アバター画像表示 */}
              <Avatar
                sx={{ width: 100, height: 100 }}
                src={image ? URL.createObjectURL(image) : userinfo ? userinfo[0].image : ""} 
                alt=""/>
                <input
                    id     = "image"
                    type   = "file"
                    accept = "image/*"
                    style  = {{ display: "none" }}/>
              <br/>
            </Grid>

            {/* ボタン表示領域 */}
            <Grid item xs={6} align="center">
              {/* 自身のプロフィール画面を表示している場合は、編集ボタンを表示する */}
              {profile && profile.uid === getuid ?
              <Button
                variant="contained"
                onClick  = {() => {
                  handleClickEdit()
                  history.push("/userinfo/" + profile.uid + "/edit")}}
                endIcon={<EditIcon />}>ユーザー情報を編集</Button> : 
              <Button
                variant="contained"
                onClick  = {() => {
                    history.push("/")}}
                endIcon={<HomeIcon />}>ホーム</Button>}
            </Grid>
            <Grid item xs={6} align="center">
              <Button
                variant="contained"
                onClick  = {() => {
                    history.push("/recordinfo")}}
                endIcon={<TaskIcon />}>過去の記録を確認</Button>
            </Grid>
          </Grid>
        </Paper>
        <br/>
      </Box>
    </Container>
  );
}

export default UserInfo;
