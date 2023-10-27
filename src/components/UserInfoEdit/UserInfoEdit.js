import React, { useState } from "react";
import { Paper,
        Typography,
        Box,
        TextField,
        Button,
        Container,
        Avatar,
        Alert,
        Grid ,}                          from "@mui/material"
import {firebaseApp ,
        db}                              from "../../firebase"
import { ref, 
        uploadBytes,
        getDownloadURL }                 from "firebase/storage"
import useUser                           from "../hooks/getuseAuth"
import useProfile                        from "../hooks/useProfile";
import { addDoc , 
        collection ,
        doc ,
        updateDoc ,
        getDocs , }                      from "firebase/firestore"
import Header                            from "../../Header"
import SystemUpdateIcon                  from '@mui/icons-material/SystemUpdate';
import CancelIcon                        from '@mui/icons-material/Cancel';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import { useHistory }                    from "react-router-dom";
import store                             from '../../store'

const Profile = () => {
  const [name    , setName]    = useState(store.getState().userName)
  const [uid     , setUID]     = useState(store.getState().loginUserUID)
  const [image   , setImage]   = useState()
  const [error   , setError]   = useState(false)
  const [success , setSuccess] = useState(false)
  const firestorage = firebaseApp.firestorage
  const firestore   = firebaseApp.firestore
  const { user }    = useUser()
  const profileData = useProfile()
  const profile     = profileData.profile
  const history     = useHistory()

  const handleChange = (e) => {
    console.log(e.target.files)
    if (e.target.files !== null) {
        setImage(e.target.files[0]);
      }
  };

  // 保存ボタンクリック時の処理
  const handleSubmit = async (event) => {
    // ユーザー名が入力されているか判定する
    if(name ===""){
      console.log("ユーザー名が入力されていない")
      setError(true)
      return
    }
    event.preventDefault();
    setError(false)
    setSuccess(false)
    try {
      const uid = user.uid
      const docRef = collection(firestore, "users")
      // 画像ファイルが存在するか確認する
      if (image) {
        const imageRef = ref(firestorage, "USER_PROFILE_IMG/" + uid + "/" +image.name);

        uploadBytes(imageRef, image).then(() => {
          getDownloadURL(imageRef).then((url) => {
            if(profile){
                console.log("ユーザー情報を更新する")
                const userRef = doc(firestore, "users", profile?.id)
                updateDoc(userRef , {
                    name,
                    image:url,
                })    
                console.log(url)
                // 業務記録のDBに対してユーザー名を更新する
                UpDateWorkTimeName(profile.uid , name)
                // 業務記録のDBに対して画像URLを更新する
                UpDateWorkTimeImage(profile.uid , url)

                setSuccess(true)
                setTimeout(() => {
                  history.push("/userinfo/" + profile.uid)
                } , 2000)
            }else{
                console.log("新しくユーザー情報を追加する")
                addDoc(docRef, {
                    name,
                    image: url,
                    uid,
                  })
                console.log(url)
                // 業務記録のDBに対してユーザー名を更新する
                UpDateWorkTimeName(profile.uid , name)
                // 業務記録のDBに対して画像URLを更新する
                UpDateWorkTimeImage(profile.uid , url)

                setSuccess(true)
                setTimeout(() => {
                  history.push("/userinfo/" + profile.uid)
                } , 2000)
            }
          })
        })
      }else{
        // ニックネームの更新のみの場合
        console.log("ニックネームのみ更新")
        if(profile){
            const userRef = doc(firestore, "users", profile?.id);
            updateDoc(userRef, { name });
        } else {
            addDoc(docRef, { name, 
                            image: "", 
                            uid });
        }
        // 業務記録のDBに対してユーザー名を更新する
        UpDateWorkTimeName(profile.uid , name)

        setSuccess(true)
        setTimeout(() => {
          history.push("/userinfo/" + profile.uid)
        } , 2000)
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  // 業務記録のユーザー情報を更新する
  const UpDateWorkTimeName = (getUID , RePlaceUserName) => {
    console.log("業務記録のユーザー情報を更新する : getUID =>" , getUID)
    console.log("業務記録のユーザー情報を更新する : RePlaceUserName => " , RePlaceUserName)
    const firestore = firebaseApp.firestore
    const WorkTimeRef = doc(firestore, "WorkTimeInfo", getUID)
    
    getDocs(collection(db, "WorkTimeInfo" )).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {        
        if (getUID == document.data().uid){
          console.log("getUID一致！ => ", document.data().uid)
          console.log("一致時のID => ", document.id)
          const WorkTimeInfoRef = doc(firestore, "WorkTimeInfo" , document.id)
          updateDoc(WorkTimeInfoRef , {
              userName : RePlaceUserName,
          })
          console.log("ユーザー名更新OK")   
        }
      })
    }).then(()=>{
    })
  }

    // 業務記録の画像URLを更新する
    const UpDateWorkTimeImage = (getUID , RePlaceImage) => {
      console.log("業務記録の画像URLを更新する : getUID =>" , getUID)
      console.log("業務記録の画像URLを更新する : RePlaceImage => " , RePlaceImage)
      const firestore = firebaseApp.firestore
      const WorkTimeRef = doc(firestore, "WorkTimeInfo", getUID)
      
      getDocs(collection(db, "WorkTimeInfo" )).then((querySnapshot)=>{
        querySnapshot.forEach((document) => {        
          if (getUID == document.data().uid){
            console.log("getUID一致！ => ", document.data().uid)
            console.log("一致時のID => ", document.id)
            const WorkTimeInfoRef = doc(firestore, "WorkTimeInfo" , document.id)
            updateDoc(WorkTimeInfoRef , {
                image : RePlaceImage,
            }) 
            console.log("画像URL更新OK")   
          }
        })
      }).then(()=>{
      })
    }

  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1,
            bgcolor: '#f5f5f5' }}>
        <Header/>
      <Paper sx={{ m: 4, p: 4 }}>
        <Typography 
          variant="h4"
          align="center">
            プロフィール編集</Typography>
        {error && (<Alert severity="error">{profile ? "更新" : "作成"}できませんでした</Alert>)}
        {success && (<Alert severity="success"> {profile ? "更新" : "作成"}しました</Alert>)}
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="ユーザー名"
          name="name"
          autoComplete="name"
          autoFocus
          defaultValue={name}
          value={name ? name  : ""}
          onChange={(e) => setName(e.target.value)}/>
        <Typography 
          sx = {{ fontSize: 12 ,
            color : "#000000",}}>
          メールアドレス(※編集不可)
        </Typography>
        {/* メールアドレス表示 */}
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
          {user ? user.email : ""}
        </Typography>


        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Avatar 
              sx={{ width: 100, height: 100 }}
              src={image ? URL.createObjectURL(image) : profile ? profile.image : ""} 
              alt="" />
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              style={{ display: "none" }}/>
            <label htmlFor="image">
              <Button 
                variant="contained" 
                color="primary" 
                component="span"
                endIcon = {<PhotoSizeSelectActualOutlinedIcon/>}>
                  画像を選択
              </Button>
            </label>
          </Box>

          {/* ボタン表示領域 */}
          <Grid container spacing={2}>
            <Grid item xs={6} align="center">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                endIcon = {<SystemUpdateIcon/>}
                sx={{ mt: 3, mb: 2 }}>
                {profile ? "更新" : "作成"}
              </Button>
            </Grid>
            <Grid item xs={6} align="center">
              <Button
                fullWidth
                variant="outlined"
                endIcon = {<CancelIcon/>}
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  history.push("/userinfo/" + profile.uid)
                }}>
                キャンセル
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <br/>
      </Box>
    </Container>
  )
}

export default Profile;