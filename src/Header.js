import React ,
      {useEffect,
       useState, }     from "react"
import {Avatar,
        AppBar,
        Toolbar,
        Box,
        Button,
        Typography, }  from "@mui/material"
import IconButton      from '@mui/material/IconButton'
import { useHistory }  from "react-router-dom"
import useProfile      from "./components/hooks/useProfile"
import { firebaseApp , 
       db }            from "./firebase"
import store           from './store/index'
import {collection,
       getDocs}        from 'firebase/firestore'

// -------------------定数-------------------
const UserInfo     = "UserInfo"

export default function ButtonAppBar(props) {
  const history     = useHistory()
  const profileData = useProfile()
  const profile     = profileData.profile
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [userinfo  ,  setUserInfo]  =  useState()  // ユーザー情報を代入
  const UserInfoAry = []

  // 初回起動
  useEffect(() => {
    // ユーザー情報を取得する
    fechUserData()
  },[])
  
  // ユーザー情報を取得する
  const fechUserData = () => {
    const firestore = firebaseApp.firestore
    getDocs(collection(db, UserInfo )).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {        
        if (store.getState().loginUserUID == document.data().uid){
          console.log("一致！ => ", document.data())
          UserInfoAry.push({
            ...document.data(),
          })
          store.getState().userName       = document.data().name
          store.getState().loginUserEmail = document.data().email
          store.getState().loginUserUID   = document.data().uid
          store.getState().imageURL       = document.data().image
          console.log(store.getState().userName)
          console.log(store.getState().loginUserEmail)
          console.log(store.getState().loginUserUID)
          console.log(store.getState().imageURL)
        }
      })
    }).then(()=>{
      setUserInfo([...UserInfoAry])
    })
    console.log("★UserInfoAry => " , UserInfoAry)
  }

  // アバターアイコンがクリックされた時
  const handleClickAvatar = (event) =>{
    setAnchorEl(event.currentTarget)
    history.push("/userinfo")
  }

  // ユーザー認証されているかチェック
  firebaseApp.fireauth.onAuthStateChanged(user => {
    if (!user) {
      // history.push("/login")
    }else{
      store.getState().loginUserUID = user.uid
      console.log("user => " , store.getState().loginUserUID)
    }
  })

  // ログアウトクリック時の処理
  const handleLogout = () => {
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static"
        style={{ backgroundColor: "#6495ed" }} 
        info = {props.info}>
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
            {userinfo ? 
              <IconButton 
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickAvatar}>
                  <Avatar src={userinfo ? userinfo[0].image : ""} alt="" />
                  {/* アバターアイコンをクリックしたらメニュー表示する */}
              </IconButton>
            :
            <Button 
              color="inherit"
              onClick  = {() => {
                handleLogout()
                history.push("/login")}}>ログアウト</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
