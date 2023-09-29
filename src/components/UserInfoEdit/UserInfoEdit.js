import React, 
     { useState , 
       useEffect}           from 'react'
import { Avatar,
        TextField,
        Typography,
        Box,
        Button,
        Container,
        Grid  }             from "@mui/material"
import { useHistory }       from "react-router-dom";
import Header               from "../../Header"
import { styled }           from '@mui/material/styles';
import CancelIcon           from '@mui/icons-material/Cancel';
import SecurityUpdateIcon   from '@mui/icons-material/SecurityUpdate';
import useProfile           from "../hooks/useProfile"
import {firebaseApp }       from "../../firebase"
import useUser              from "../hooks/getuseAuth"
import {addDoc,
        collection,}        from "firebase/firestore"

////////////////////////////////////////////
//　定数
////////////////////////////////////////////
const collectionUserName    = "UserInfo"

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

function UserInfo(data) {
  const [image        , setImage]        = useState()
  const [name         , setName]         = useState("")     // プロフィール名
  const [error        , setError]        = useState(false)  // エラー判定
  const [success      , setSuccess]      = useState(false)  // 成功判定
  const [errormessage , setErrorMessage] = useState("")     // エラーメッセージ
  const firestore   = firebaseApp.firestore
  const profileData = useProfile()
  const profile     = profileData.profile
  const { user }    = useUser()
  const history = useHistory()

  // 初回起動時
  useEffect(() => {
  },[])

  // 更新ボタンクリック時の処理
  const handleSubmit = (event) => {
    // event.preventDefault()
    // アラートが出ている場合は一旦消す
    setError(false)
    setSuccess(false)
    // 入力内容が空の場合はエラーを返す
    if(name === ""){
      console.log("名前が未入力")
      setErrorMessage("名前を入力してください")
      setError(true)
      return
    }

    const uid = user.uid
    const docRef = collection(firestore, collectionUserName)

    // firestoreに名前、uid、emailを追加する
    addDoc(docRef, {
        name  :name,
        uid   :uid,
        email :user.email,
      })
    // 成功したアラート表示
    setSuccess(true)
    setTimeout(() => {
      history.push("/")
    },2000)
    }

  return (
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#f5f5f5' }}>
        <Header/>
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">ユーザー情報編集</Typography >
          </Grid>

          {/* ユーザー名の表示 */}
          <Grid item xs={1} align="center"></Grid>
          <Grid item xs={10} align="left">
            <Typography 
              sx = {{ fontSize: 18 ,
                backgroundColor : "#f5f5f5",
                color : "#000000",}}>
              ニックネーム
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              name="name"
              autoComplete="name"
              autoFocus
              defaultValue={name}
              value={name ? name :  ""}
              onChange={e => 
                setName(e.target.value)}/>
            <br/>
          </Grid>
          <Grid item xs={1} align="center"></Grid>

          {/* データ表示領域 */}
          <Grid item xs={1} align="center"></Grid>
          <Grid item xs={10} align="left">
            <Typography 
              sx = {{ fontSize: 18 ,
                backgroundColor : "#f5f5f5",
                color : "#000000",}}>
              プロフィール画像
            </Typography>
            {/* アバター画像表示 */}
            <Avatar
                sx={{ width: 100, height: 100 }}
                // src={image ? URL.createObjectURL(image) : userinfo ? userinfo.image : ""}alt=""/>
                src={image ? URL.createObjectURL(image) : image ? "" : ""}alt=""/>
            <input
                id     = "image"
                type   = "file"
                accept = "image/*"
                style  = {{ display: "none" }}/>
            <label htmlFor="image">
              <Button variant="contained" color="primary" component="span">
                  画像を選択
              </Button>
            </label>
          </Grid>
          <Grid item xs={1} align="center"></Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={6} align="center">
            <Button
                variant="contained"
                onClick  = {() => {
                    handleSubmit()
                    history.push("/userinfo")}}
                endIcon={<SecurityUpdateIcon />}>更新</Button>
          </Grid>
          <Grid item xs={6} align="center">
            <Button
                variant="outlined"
                onClick  = {() => {
                    history.push("/userinfo")}}
                endIcon={<CancelIcon />}>キャンセル</Button>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default UserInfo;
