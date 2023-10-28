import React, { useState } from "react";
import { Paper,
        Typography,
        Box,
        TextField,
        Button,
        Container,
        Avatar,
        Alert,}            from "@mui/material"
import {firebaseApp ,}     from "../../firebase"
import { ref, 
        uploadBytes,
        getDownloadURL }   from "firebase/storage"
import useUser             from "../hooks/getuseAuth"
import useProfile          from "../hooks/useProfile";
import { addDoc , 
        collection ,
        doc ,
        updateDoc }        from "firebase/firestore"
import Header              from "./UserHeader"
import { useHistory }      from "react-router-dom";

const DefalutUserSetting = () => {
  const [name    , setName]    = useState("")
  const [image   , setImage]   = useState("")
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
    console.log("メアド",user.email)
    console.log("名前",name)
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
      const email = user.email
      const docRef = collection(firestore, "users")
      const imageRef = ref(firestorage, "USER_PROFILE_IMG/" + uid + "/" +image.name)
      console.log("星",imageRef)

      if (image) {
        uploadBytes(imageRef, image).then(() => {
          getDownloadURL(imageRef).then((url) => {
            if(profile){
                const userRef = doc(firestore, "users", profile?.id)
                updateDoc(userRef , {
                    name,
                    image:url,
                })    
                console.log(url)
                setSuccess(true)
                setTimeout(() => {
                  history.push("/")
                } , 2000)
            }else{
                addDoc(docRef, {
                    name,
                    image: url,
                    uid,
                    email,
                  })
                console.log(url)
                setSuccess(true)
                setTimeout(() => {
                  history.push("/")
                } , 2000)
            }
          })
        })
      }else{
        if(profile){
            const userRef = doc(firestore, "users", profile?.id);
            updateDoc(userRef, { name });
        } else {
            addDoc(docRef, { 
              name, 
              image: "", 
              uid ,
              email});
        }
        setSuccess(true)
        setTimeout(() => {
          history.push("/")
        } , 2000)
      }
    } catch (err) {
      console.log(err);
      setError(true);
    }
  }

  return (
    <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1,
            bgcolor: '#f5f5f5' }}>
          <Header/>
          <Paper sx={{ m: 4, p: 4 }}>
            <Typography 
              variant="h4"
              align="center">ユーザー設定</Typography>
            {error && (<Alert severity="error">{profile ? "更新" : "作成"}できませんでした</Alert>)}
            {success && (<Alert severity="success"> {profile ? "更新" : "作成"}しました</Alert>)}
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Avatar 
                        sx={{ width: 100, height: 100 }}
                        src={image ? URL.createObjectURL(image) : profile ? profile.image : ""} 
                        alt="" />
                    <div>
                        <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: "none" }}
                        />
                        <label htmlFor="image">
                        <Button variant="contained" color="primary" component="span">
                            画像を選択
                        </Button>
                        </label>
                    </div>
                </Box>

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="ユーザー名"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={name ? name : profile ? profile.name : ""}
                    onChange={(e) => setName(e.target.value)}/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                {profile ? "更新" : "作成"}
              </Button>
            </Box>
          </Paper>
        </Box>
    </Container>
  );
};

export default DefalutUserSetting;