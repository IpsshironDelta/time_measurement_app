import React ,
      {useEffect,
       useState, } from "react"
import Box         from '@mui/material/Box';
import InputLabel  from '@mui/material/InputLabel';
import MenuItem    from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select      from '@mui/material/Select';
import { firebaseApp ,
        db }       from "../../firebase"
import {collection,
        getDocs}   from 'firebase/firestore'
import store       from '../../store';

// -------------------定数-------------------
const UserInfo     = "users"

export default function BasicSelect(props) {
  // -------------------変数-------------------
  const [userinfo   ,  setUserInfo]  = useState()  // ユーザー情報を代入
  const [selectuser , setSelectUser] = useState()
  const UserInfoAry = []

  const handleSelect = (props) => {
    console.log("selectuser:" , selectuser)
  }
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
        UserInfoAry.push({
          ...document.data(),
        })  
      })
    }).then(()=>{
      setUserInfo([...UserInfoAry])
    })
    console.log("UserInfoAry => " , UserInfoAry)
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">ユーザー</InputLabel>
        <Select
          id        = {props.id}
          value     = {props.value}
          label     = {props.label}
          onChange  = {props.onChange}>
            {userinfo ? (userinfo.map((item) => (
              <MenuItem value = {item.name}>{item.name}</MenuItem>  
            ))):
              <MenuItem >ユーザーは見つかりませんでした</MenuItem>}
        </Select>
      </FormControl>
    </Box>
  );
}
