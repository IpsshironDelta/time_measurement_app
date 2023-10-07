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
import {firebaseApp ,
        db}                 from "../../firebase"
import useUser              from "../hooks/getuseAuth"
import {addDoc,
        collection,
        doc,
        updateDoc, 
        getDocs,}           from "firebase/firestore"
import {ref,
        uploadBytes,
        getDownloadURL,}    from "firebase/storage"
import store                from '../../store';

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
  
  const [image    , setImage]    = useState()
//  const [image    , setImage]    = useState(store.getState().imageURL)
  const [name     , setName]     = useState(store.getState().userName)
  const [error        , setError]        = useState(false)  // エラー判定
  const [success      , setSuccess]      = useState(false)  // 成功判定
  const [errormessage , setErrorMessage] = useState("")     // エラーメッセージ
  const [userinfo     ,  setUserInfo]    =  useState()  // ユーザー情報を代入
  const UserInfoAry = []
  const firestorage = firebaseApp.firestorage
  const firestore   = firebaseApp.firestore
  const profileData = useProfile()
  const profile     = profileData.profile
  const { user }    = useUser()
  const history     = useHistory()

  // 初回起動時
  useEffect(() => {
    console.log("profile => ",profile)
    // fechUserData()
  },[])

  // 画像を選択ボタンクリック時の処理
  const handleChange = (e) => {
    console.log(e.target.files)
    console.log("handleChange 通過")
    if (e.target.files !== null) {
        setImage(e.target.files[0])
        console.log("★",e.target.files[0])
      }else{
        console.log("★★",image)
      }
  }

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

    try {
      const uid = user.uid
      const docRef = collection(firestore, collectionUserName)
      console.log("★",profile)  
      if(image){
        const imageRef = ref(firestorage, 'USER_PROFILE_IMG/' + uid + "/" + image.name)
        // firebase strageへ画像をアップロード
        uploadBytes(imageRef, image).then(() => {
          // getDownloadURLの中で、profileがある場合はupdateDocを指定
          // profileがない場合はaddDocを指定
          // imageがない場合も同様に指定
          getDownloadURL(imageRef).then(url => {
            console.log(url)
            if (profile) {
              const userRef = doc(firestore, collectionUserName , profile?.id)
              updateDoc(userRef, {
                name,
                image: url,
                uid,})
              store.getState().imageURL = url
              console.log("１通過")
            }else{
              // firestoreに名前、画像URL、uidを追加する
              addDoc(docRef, {
                  name,
                  image: url,
                  uid,})
              store.getState().imageURL = url
              console.log("2通過")
            }
          })
        })
      }else{
        // 画像を選択する
        if (profile) {
          const userRef = doc(firestore, collectionUserName, profile?.id)
          updateDoc(userRef, { name })
        } else {
          addDoc(docRef, { 
              name, 
              image: "", 
              uid ,})
              console.log("3通過")
          }}
        console.log("画像アップロード完了!")
        // 成功したアラート表示
        setSuccess(true)
        setTimeout(() => {
          history.push("/")
          },2000)
        } catch (err) {
          console.log(err)
          // 失敗したアラート表示
          setError(true)
        }
    }

  
  const handleUpDate = (event) => {
    console.log("TEST")
    event.preventDefault()
    // アラートが出ている場合は一旦消す
    // setError(false)
    setSuccess(false)
    // 入力内容が空の場合はエラーを返す

    // try {
    //   const uid = user.uid
    //   const docRef = collection(firestore, collectionUserName)
  
    //   if(image){
    //     const imageRef = ref(firestorage, 'USER_PROFILE_IMG/' + uid + "/" + image.name)
    //     // firebase strageへ画像をアップロード
    //     uploadBytes(imageRef, image).then(() => {
    //       // getDownloadURLの中で、profileがある場合はupdateDocを指定
    //       // profileがない場合はaddDocを指定
    //       // imageがない場合も同様に指定
    //       getDownloadURL(imageRef).then(url => {
    //         console.log(url)
    //         if (profile) {
    //           const userRef = doc(firestore, collectionUserName , profile?.id)
    //           updateDoc(userRef, {
    //             name,
    //             image: url,})
    //         }else{
    //           // firestoreに名前、画像URL、uidを追加する
    //           addDoc(docRef, {
    //               name,
    //               image: url,
    //               uid,
    //           })
    //         }
    //       })
    //     })
    //   }else{
    //     // 画像を選択する
    //     if (profile) {
    //       const userRef = doc(firestore, collectionUserName, profile?.id)
    //       updateDoc(userRef, { name })
    //     } else {
    //       addDoc(docRef, { 
    //           name, 
    //           image: "", 
    //           uid ,})
    //       }}
    //     console.log("画像アップロード完了!")
    //     // 成功したアラート表示
    //     setSuccess(true)
    //     setTimeout(() => {
    //       history.push("/")
    //       },2000)
    //     } catch (err) {
    //       console.log(err)
    //       // 失敗したアラート表示
    //       setError(true)
    //     }
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
              <Box component="form" onSubmit={handleUpDate} noValidate sx={{ mt: 4 }}>
                <Avatar
                    sx={{ width: 100, height: 100 }}
                    src={image ? URL.createObjectURL(image) : store.getState().imageURL}
                    alt=""
                    // src={image ? URL.createObjectURL(image) : userinfo ? userinfo.image : ""}alt=""/>
                    // src={image ? image : ""}
                    />
                <input
                    id     = "image"
                    type   = "file"
                    accept = "image/*"
                    onChange={handleChange}
                    style  = {{ display: "none" }}/>
                <label htmlFor="image">
                  <Button variant="contained" color="primary" component="span">
                      画像を選択
                  </Button>
                </label>
              </Box>
            </Grid>
            <Grid item xs={1} align="center"></Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={6} align="center">
            <Button
                variant="contained"
                onClick  = {() => {
                    handleSubmit()
                    // history.push("/userinfo")
                  }}
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
