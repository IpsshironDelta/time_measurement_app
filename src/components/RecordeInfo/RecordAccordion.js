import React, 
     { useState , 
       useEffect}       from 'react'
import {Avatar ,
        Typography,
        Grid ,
        Accordion ,
        Link , 
        Button , 
        Dialog , 
        DialogActions , 
        DialogContent ,
        DialogContentText , 
        DialogTitle , } from "@mui/material"
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon   from '@mui/icons-material/ExpandMore'
import DeleteIcon       from '@mui/icons-material/Delete';
import { useHistory }   from "react-router-dom"
import { db }           from '../../firebase'
import {doc ,
        deleteDoc ,
        collection,
        getDocs ,}      from 'firebase/firestore'
import { firebaseApp }  from "../../firebase"
import useProfile       from "../hooks/useProfile"

////////////////////////////////////////////
//　定数
////////////////////////////////////////////
const WorkTimeInfo = "WorkTimeInfo"
const UserInfo     = "users"

export default function BasicAccordion() {
  // ------------------入力系変数------------------
  const [record  , setRecord]  = useState()   // 業務記録を格納
  const [getID   , setGetID]   = useState()   // 削除するIDを格納
  const RecordDataAry     = []
  const history = useHistory()
  const profileData = useProfile()
  const profile = profileData.profile
  const [open, setOpen] = React.useState(false)

  // 初回起動時
  useEffect(() => {
    // 業務記録データを取得
    fechRecordData()
  },[])

  // 削除ボタンクリック時の処理
  const handleClickOpen = (getID) => {
    // 削除対象となるデータのドキュメントIDをセット
    setGetID(getID)
    setOpen(true)
  }

  // ダイアログのキャンセルボタンクリック所の処理
  const handleClose = () => {
    // 削除対象となるデータのドキュメントIDを初期化
    setGetID("")
    setOpen(false)
  }

  // ダイアログの削除ボタンクリック所の処理
  const handleDelete = () => {
    console.log(getID)
    // ドキュメントのid（名前）を取得  
    // 投稿内容を削除
    deleteDoc(doc(db , WorkTimeInfo , getID)).then((doc) => {
    alert("削除しました。")
    // 業務記録データを再取得する
    fechRecordData()
    })
    .catch(() => {
    alert("削除に失敗しました")
    })
    setOpen(false)
  }

  // 業務記録データを取得
  const fechRecordData = () => {
    const firestore = firebaseApp.firestore
    getDocs(collection(db, WorkTimeInfo )).then((querySnapshot)=>{
        querySnapshot.forEach((document) => {
            RecordDataAry.push({
                id : document.id,
                ...document.data(),
                })
        })
    }).then(()=>{
      setRecord([...RecordDataAry])
    })
    console.log(RecordDataAry)
  }

    return (
    <div>
        {record ? (record.map((item) => (
            <Accordion sx={{ p: 1, 
                fontSize: 14 , 
                background: "#ffffff" ,
                borderTop    : "solid #6495ed 1px",
                borderBottom : "solid #6495ed 1px",
                borderLeft   : "solid #6495ed 1px",
                borderRight  : "solid #6495ed 1px",
                borderRadius : 5,
                color:"#000000",
                borderRadius : 3,}}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Grid container spacing={0}>
                        <Grid item xs={6} align="left">
                            <Typography 
                                sx = {{
                                    fontSize: 16,}}>測定日：{item.date}</Typography>
                        </Grid>
                        <Grid item xs={6} align="left">
                            <Typography
                                sx = {{
                                    fontSize: 16,}}>記録：{item.time}</Typography>
                        </Grid>
                        <Grid item xs={3} align="right">
                            {/* 自分が登録した記録の場合は、削除ボタンを表示する */}
                            {profile && item.uid === profile.uid ?
                            <Button
                                sx = {{top : 10}}
                                size='small'
                                variant="outlined"
                                endIcon={<DeleteIcon />}
                                onClick={() => handleClickOpen(item.id)}>削除</Button> : ""}                        
                        </Grid>
                        <Grid item xs={8} align="right">
                            <Typography
                                sx = {{p : 1,
                                    fontSize: 14,}}>
                                <Link 
                                    href={`/userinfo/${item.uid}`} 
                                    color="#000000"
                                    underline="hover">
                                    {item.userName}
                                  </Link></Typography>
                        </Grid>
                        <Grid item xs={1} align="left">
                            <Avatar 
                                src={item.image}
                                alt="" />
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={2} align="left">
                            <Typography
                                sx = {{
                                    fontSize: 16,}}>個数：{item.num}</Typography>
                        </Grid>
                        <Grid item xs={4} align="left">
                            <Typography 
                                sx = {{
                                    fontSize: 14,}}>平均値：{item.avarage}</Typography>
                        </Grid>
                        <Grid item xs={6} align="left">
                            <Typography 
                                sx = {{
                                    fontSize: 14,}}>業務内容：{item.work}</Typography>
                        </Grid>
                        <Grid item xs={12} align="left">
                            <Typography
                                sx = {{
                                    fontSize: 14,}}>コメント：{item.memo}</Typography>
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        ))):
            <Typography
                sx = {{
                    fontSize: 16,}}>記録データはありません。</Typography>}
        
        {/* 削除ボタンクリック時のダイアログ表示領域 */}
        <Dialog
            open={open}
            onClose={handleClose}>
            <DialogTitle id="alert-dialog-title">
                削除確認
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                記録したデータを削除します。よろしいですか。
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDelete}>
                削除</Button>
                <Button onClick={handleClose} autoFocus>
                キャンセル</Button>
            </DialogActions>
        </Dialog>
    </div>
  );
}
