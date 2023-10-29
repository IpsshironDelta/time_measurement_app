import React, 
     { useState , 
       useEffect ,
       useRef ,
       useLayoutEffect} from 'react'
import {Avatar ,
        Typography,
        Grid ,
        Link , 
        Button , 
        Dialog , 
        DialogActions , 
        DialogContent ,
        DialogContentText , 
        DialogTitle ,
        TextField , }   from "@mui/material"
import DeleteIcon       from '@mui/icons-material/Delete'
import FilterListIcon   from '@mui/icons-material/FilterList'
import EditIcon         from '@mui/icons-material/Edit'
import SystemUpdateIcon from '@mui/icons-material/SystemUpdate'
import ClearIcon        from '@mui/icons-material/Clear';
import RefreshIcon      from '@mui/icons-material/Refresh';
import { useHistory }   from "react-router-dom"
import { db }           from '../../firebase'
import {doc ,
        deleteDoc ,
        collection,
        getDocs ,
        updateDoc , }   from 'firebase/firestore'
import { firebaseApp }  from "../../firebase"
import useProfile       from "../hooks/useProfile"
import WorkSelect       from "../MainPage/WorkSelect"
import NumberTextFild   from "../MainPage/NumberTextField"
import InputIDTextField from '../MainPage/InputIDTextField'
import UserSelect       from "./UserSelect"
import store            from '../../store'

////////////////////////////////////////////
//　定数
////////////////////////////////////////////
const WorkTimeInfo  = "WorkTimeInfo"
const AdminUserMail = "sales@minimoto.jp"

export default function BasicAccordion(props) {
  // ------------------入力系変数------------------
  const [record     , setRecord]     = useState()      // 業務記録を格納
  const [getID      , setGetID]      = useState()      // 削除するIDを格納
  const [memo       , setMemo]       = useState("")    // メモを代入
  const [work       , setWork]       = useState("")    // 業務内容を代入
  const [number     , setNumber]     = useState("")    // 個数を代入
  const [gyoumuID   , setGyoumuID]   = useState("")    // 業務IDを代入
  const [edit       , setEdit]       = useState(false) // 編集状態
  const [selectuser , setSelectUser] = useState("")    // 絞り込みするユーザー名を格納
  const [selectwork , setSelectWork] = useState("")    // 絞り込みする業務を格納
  const [loginUser  , setLogInUser]  = useState("")    // ログインユーザーの情報を格納
  const [open       , setOpen]       = useState(false)
  const [avarage    , setAvarate]    = useState("")    // 平均値を代入
  const RecordDataAry = []
  const history       = useHistory()
  const profileData   = useProfile()
  const profile       = profileData.profile
  const firestore     = firebaseApp.firestore
  
  // ------------------メッセージ用------------------
  const [error          , setError]          = useState(false) // エラー判定
  const [errormessage   , setErrorMessage]   = useState("")    // エラーメッセージ

  // 初回起動時
  useEffect(() => {
    // 業務記録データを取得
    fechRecordData()
    // ログインユーザーの情報を取得
    firebaseApp.fireauth.onAuthStateChanged(user => {
    if (!user) {
        console.log("ユーザー情報が無い")
        }else{
        console.log("user.uid => " , user.uid)
        console.log("user.email => " , user.email)
        setLogInUser(user)
        }
    })
  },[])

  // 個数入力のテキストフィールドの値が変更されたときの処理
  const handleChange = (getText , getIndex) => {
    const newValue = getText
    if (newValue >= 1 && newValue <= 200) {
        setNumber(newValue)
        const updatedRecord = [...record]           // recordのコピーを作成
        updatedRecord[getIndex].inputNum = newValue // 対象要素の個数の値を変更
        setRecord(updatedRecord)                    // recordの値を更新
        console.log("個数編集",record)
    }
  }

  // ID入力のテキストフィールドの値が変更されたときの処理
  const handleInputID = (getText , getIndex) => {
    const newValue = getText
    if (/^\d*$/.test(newValue) && newValue.length <= 4) {
        setGyoumuID(newValue)
        const updatedRecord = [...record]          // recordのコピーを作成
        updatedRecord[getIndex].inputID = newValue // 対象要素の個数の値を変更
        setRecord(updatedRecord)                   // recordの値を更新
        console.log("業務ID編集",record)
    }
  };

  // ユーザーリンククリック時の処理
  const handleButtonClick = (event , getID) => {
    event.stopPropagation(); // ボタンクリックがAccordionまで伝搬しないようにする
  }

  // クリアボタンクリックの処理
  const handleClickClear = () => {
    setSelectUser("")
    setSelectWork("")
    // 業務記録データを取得
    fechRecordData()
  }

  // 絞り込みボタンクリック時の処理
  const handleClick = () => {
    console.log("選択しているユーザー:" , selectuser)
    console.log("選択している業務　　:" , selectwork)
    
    if(selectuser == "" && selectwork ==""){
        console.log("ユーザーと業務が選択されていない場合は何もしない")
    }else{
        getDocs(collection(db, WorkTimeInfo )).then((querySnapshot)=>{
            querySnapshot.forEach((document) => {
                if(selectuser == "" ){
                    if(selectwork == document.data().work){
                        RecordDataAry.push({
                            id : document.id,
                            ...document.data(),
                            })    
                    }
                }else if(selectwork == ""){
                    if(selectuser == document.data().userName){
                        RecordDataAry.push({
                            id : document.id,
                            ...document.data(),
                            })    
                    }
                }else if(selectuser == document.data().userName && selectwork == document.data().work){
                    RecordDataAry.push({
                        id : document.id,
                        ...document.data(),
                        })
                }
            })
        }).then(()=>{
          setRecord([...RecordDataAry])
        })
    }
    console.log("絞り込み結果 => ",RecordDataAry)
  }

  // 削除ボタンクリック時の処理
  const handleClickOpen = (event , getID) => {
    // 削除対象となるデータのドキュメントIDをセット
    setGetID(getID)
    setOpen(true)
    event.stopPropagation(); // ボタンクリックがAccordionまで伝搬しないようにする
  }

  // キャンセルボタンクリック時の処理
  const handleClickChancel = (event , getIndex) => {
    // 初期化
    setGetID("")
    setWork("")
    setNumber("")
    setMemo("")
    setGyoumuID("")

    // 編集モード切り替え
    // setEdit(false)

    const updatedRecord = [...record]    // recordのコピーを作成
    updatedRecord[getIndex].edit = false // 対象要素のeditの値を変更
    setRecord(updatedRecord)             // recordの値を更新
    console.log("キャンセル",record)
    event.stopPropagation(); // ボタンクリックがAccordionまで伝搬しないようにする
  }

  // 編集ボタンクリック時の処理
  const handleClickEdit = (event , getIndex) => {
    // 編集モード切り替え
    // setEdit(true)

    const updatedRecord = [...record]    // recordのコピーを作成
    updatedRecord[getIndex].edit = true // 対象要素のeditの値を変更
    setRecord(updatedRecord)             // recordの値を更新
    console.log("編集",record)

    event.stopPropagation(); // ボタンクリックがAccordionまで伝搬しないようにする
  }

  // 更新ボタンクリック時の処理
  const handleClickUpDate = (event , getStatus) => {
    // 表示モードに切り替え
    console.log(number)
    console.log(work)
    console.log(getStatus)

    // 入力した情報を更新する
    const userRef = doc(firestore, WorkTimeInfo , getStatus.id)

    // 業務が選択されているか判定する
    if(work === ""){
        console.log("業務の内容が選択されていない")
        console.log(getStatus.work)
        alert("業務を選択してください")
        event.stopPropagation(); // ボタンクリックがAccordionまで伝搬しないようにする
        return
    }
    // 個数が選択されているか確認する
    if(number === ""){
        console.log("個数が選択されていないためnumber変数に代入する")
        console.log(getStatus.num)
        alert("個数を選択してください")
        event.stopPropagation(); // ボタンクリックがAccordionまで伝搬しないようにする
        return
    }

    // 平均値を算出
    handleAvarage(getStatus)

    // メモが入力されているか確認する
    if(memo == ""){
        updateDoc(userRef , {
            work    : work ,
            num     : number ,
            memo    : getStatus.memo,
            avarage : store.getState().avarage,
        })    
    }else{
        updateDoc(userRef , {
            work    : work ,
            num     : number ,
            memo    : memo,
            avarage : store.getState().avarage,
        })    
    }

    // 業務IDが入力されているか確認する
    if(gyoumuID == ""){
        updateDoc(userRef , {
            work    : work ,
            num     : number ,
            gyoumuID: getStatus.gyoumuID,
            avarage : store.getState().avarage,
        })    
    }else{
        updateDoc(userRef , {
            work    : work ,
            num     : number ,
            gyoumuID: gyoumuID,
            avarage : store.getState().avarage,
        })    
    }

    // 業務記録データを再取得する
    fechRecordData()
    // 初期化
    setWork("")
    setNumber("")
    setMemo("")
    setGyoumuID("")
    setEdit(false)
    event.stopPropagation(); // ボタンクリックがAccordionまで伝搬しないようにする
  }
    
  // 平均値を算出
  const handleAvarage = (event) => {
    // 元の時間文字列
    const timeString = event.time

    // ":" と "." を使って時間をパースし、ミリ秒に変換
    const parts = timeString.split(/[:.]/);
    const minutes = parseInt(parts[0], 10);
    const seconds = parseInt(parts[1], 10);
    const milliseconds = parseInt(parts[2], 10);
    const totalTimeInMilliseconds = minutes * 60 * 1000 + seconds * 1000 + milliseconds;

    // ミリ秒を個数で割る
    const resultInMilliseconds = totalTimeInMilliseconds / number;

    // 結果をフォーマット
    const resultMinutes = Math.floor(resultInMilliseconds / (60 * 1000));
    const resultSeconds = Math.floor((resultInMilliseconds % (60 * 1000)) / 1000);
    const resultMilliseconds = (resultInMilliseconds % 1000).toFixed(0)

    // 結果を文字列にフォーマット
    const resultString = `${resultMinutes.toString().padStart(2, '0')}:${resultSeconds.toString().padStart(2, '0')}.${resultMilliseconds.toString().padStart(3, '0')}`;

    console.log("計測結果：",event.time); // 結果をコンソールに表示
    console.log("個数：",number); // 結果をコンソールに表示
    console.log("平均値：",resultString); // 結果をコンソールに表示
    store.getState().avarage = resultString
    setAvarate(resultString)

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
                memo     : ""          ,
                inputID  : ""          ,
                inputWork: ""          ,
                inputNum : ""          ,
                edit     : edit        ,
                id       : document.id ,
                ...document.data()     ,
                })
        })
    }).then(()=>{
      RecordDataAry.sort(function(a, b) {
          return (a.createdAt > b.createdAt) ? -1 : 1;  //オブジェクトの降順ソート
          })
      setRecord([...RecordDataAry])
    })
    console.log("初回配列取得 => ",RecordDataAry)
  }

    return (
    <div>
        {/* 再読み込みボタン表示領域 */}
        <Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Button
                    sx      = {{width : "155px"}}
                    variant = 'contained'
                    endIcon = {<RefreshIcon />}
                    onClick = {fechRecordData}>再読み込み</Button>
            </Grid>
        </Grid>
        <br/>

        {/* 絞り込み設定表示領域 */}
        <Grid container spacing={1}>
            <Grid item xs={4} align="center">
                <WorkSelect
                    id = "selectwork"
                    label = "業務を選択"
                    value = {selectwork}
                    onChange = {(e) =>
                        setSelectWork(e.target.value)}/>
            </Grid>
            <Grid item xs={4} align="center">
                <UserSelect
                    value = {selectuser}
                    onChange = {(e) => 
                        setSelectUser(e.target.value)}/>
            </Grid>
            <Grid item xs={4} align="center">
                <Button
                    sx      = {{width : "120px"}}
                    variant = 'contained'
                    endIcon = {<FilterListIcon />}
                    onClick = {handleClick}>絞り込む</Button>
                <Button
                    sx      = {{width : "120px"}}
                    variant = 'outlined'
                    endIcon = {<ClearIcon/>}
                    onClick = {handleClickClear}>クリア</Button>
            </Grid>
        </Grid>
        <br/>
        {record ? (record.map((item , index) => (
        <Grid 
            container
            sx={{ p: 1, 
                fontSize: 14 , 
                background: "#ffffff" ,
                borderTop    : "solid #6495ed 1px",
                borderBottom : "solid #6495ed 1px",
                borderLeft   : "solid #6495ed 1px",
                borderRight  : "solid #6495ed 1px",
                color:"#000000",
                borderRadius : 2,}}>
            <Grid 
                item xs={12} 
                align="center">
                {/* <Accordion >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"> */}
                            <Grid container spacing={0}>
                                <Grid item xs={12} align="left">
                                    <Typography 
                                        sx = {{
                                            fontSize: 18,}}>測定日：{item.date}</Typography>
                                </Grid>
                                <Grid item xs={4} align="left">
                                    <Typography
                                        sx = {{
                                            fontSize: 18,}}>記録：{item.time}</Typography>
                                </Grid>
                                <Grid item xs={4} align="left">
                                    <Typography 
                                        sx = {{
                                            fontSize: 18,}}>平均値：{item.avarage}</Typography>
                                </Grid>

                                {/* ログインユーザーがAdminUserMailと一致している場合はすべての記録の編集が可能 */}
                                {/* 自身の記録のみ編集/削除が可能 */}
                                {loginUser && AdminUserMail === loginUser.email ? 
                                <Grid item xs={4} align="center">
                                    {item.edit ? 
                                        <NumberTextFild
                                            id       = "InputNumber"
                                            label    = "個数を入力"
                                            type     = "number"
                                            value    = {item.inputNum}
                                            helperText="入力必須"
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                height : "55px",
                                                padding: 0, // セル内の余白を削除
                                                },
                                            }}
                                            onChange = {(e) => handleChange(e.target.value , index)}/>
                                            : 
                                        <Typography
                                            sx = {{
                                                fontSize: 18,}}>個数：{item.num}</Typography>}
                                </Grid>
                                :
                                profile && item.uid === profile.uid ?
                                    <Grid item xs={4} align="center">
                                        {item.edit ? 
                                            <NumberTextFild
                                                id       = "InputNumber"
                                                label    = "個数を入力"
                                                type     = "number"
                                                value    = {item.inputNum}
                                                helperText="入力必須"
                                                sx={{
                                                    '& .MuiInputBase-input': {
                                                    height : "55px",
                                                    padding: 0, // セル内の余白を削除
                                                    },
                                                }}
                                                onChange = {(e) => handleChange(e.target.value , index)}/>
                                                : 
                                            <Typography
                                                sx = {{
                                                    fontSize: 18,}}>個数：{item.num}</Typography>}
                                    </Grid>
                                    :
                                    <Grid item xs={4} align="center">
                                        <Typography
                                            sx = {{
                                                fontSize: 18,}}>個数：{item.num}</Typography>
                                    </Grid>}

                                {/* ログインユーザーがAdminUserMailと一致している場合はすべての記録の編集が可能 */}
                                {/* 自身の記録のみ編集/削除が可能 */}
                                {loginUser && AdminUserMail === loginUser.email ? 
                                <Grid item xs={2} align="left">
                                    {item.edit ? 
                                    <InputIDTextField
                                        id       = "gyoumuID"
                                        label    = "業務IDを入力"
                                        type     = "gyoumuID"
                                        value    = {item.inputID}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                            height : "55px",
                                            padding: 0, // セル内の余白を削除
                                            },
                                        }}
                                        onChange = {(e) => handleInputID(e.target.value , index)}/>
                                            :
                                        <Typography
                                            sx = {{
                                                fontSize: 14,}}>ID：{item.gyoumuID}</Typography>}
                                </Grid>
                                :
                                profile && item.uid === profile.uid ?
                                    <Grid item xs={2} align="left">
                                        {item.edit ? 
                                        <InputIDTextField
                                            id       = "gyoumuID"
                                            label    = "業務IDを入力"
                                            type     = "gyoumuID"
                                            value    = {item.inputID}
                                            sx={{
                                                '& .MuiInputBase-input': {
                                                height : "55px",
                                                padding: 0, // セル内の余白を削除
                                                },
                                            }}
                                            onChange = {(e) => handleInputID(e.target.value , index)}/>
                                                :
                                            <Typography
                                                sx = {{
                                                    fontSize: 14,}}>ID：{item.gyoumuID}</Typography>}
                                    </Grid>
                                    :
                                    <Grid item xs={2} align="left">
                                        <Typography
                                            sx = {{
                                                fontSize: 14,}}>ID：{item.gyoumuID}</Typography>
                                    </Grid>}

                                {/* ログインユーザーがAdminUserMailと一致している場合はすべての記録の編集が可能 */}
                                {/* 自身の記録のみ編集/削除が可能 */}
                                {loginUser && AdminUserMail === loginUser.email ? 
                                <Grid item xs={10} align="left">
                                    {item.edit ? 
                                        <WorkSelect
                                            id           = "WorkSelect"
                                            label        = "業務を選択"
                                            value        = {work}
                                            onChange     = {(e) =>
                                                setWork(e.target.value)}/>
                                            : 
                                        <Typography
                                            sx = {{
                                                fontSize: 14,}}>業務：{item.work}</Typography>}
                                </Grid>
                                :
                                profile && item.uid === profile.uid ?
                                    <Grid item xs={10} align="left">
                                        {item.edit ? 
                                            <WorkSelect
                                                id           = "WorkSelect"
                                                label        = "業務を選択"
                                                value        = {work}
                                                onChange     = {(e) =>
                                                    setWork(e.target.value)}/>
                                                : 
                                            <Typography
                                                sx = {{
                                                    fontSize: 14,}}>業務：{item.work}</Typography>}
                                    </Grid>
                                    :
                                    <Grid item xs={10} align="left">
                                        <Typography
                                            sx = {{
                                                fontSize: 14,}}>業務：{item.work}</Typography>
                                    </Grid>}

                                {/* ログインユーザーがAdminUserMailと一致している場合はすべての記録の編集が可能 */}
                                {/* 自身の記録のみ編集/削除が可能 */}
                                {loginUser && AdminUserMail === loginUser.email ? 
                                    <Grid item xs={12} align="left">
                                    {item.edit ? 
                                        <TextField
                                            label        = "メモを入力"
                                            value        = {memo ? memo : "" }
                                            rows         = {5}
                                            multiline
                                            fullWidth
                                            onChange={(e) => 
                                            setMemo(e.target.value)}/>
                                            : 
                                        <Typography
                                            sx = {{
                                                fontSize: 14,}}>メモ：{item.memo}</Typography>}
                                </Grid>
                                :
                                profile && item.uid === profile.uid ?
                                    <Grid item xs={12} align="left">
                                        {item.edit ? 
                                            <TextField
                                                label        = "メモを入力"
                                                value        = {memo ? memo : "" }
                                                rows         = {5}
                                                multiline
                                                fullWidth
                                                onChange={(e) => 
                                                setMemo(e.target.value)}/>
                                                : 
                                            <Typography
                                                sx = {{
                                                    fontSize: 14,}}>メモ：{item.memo}</Typography>}
                                    </Grid>
                                    :
                                    <Grid item xs={12} align="left">
                                        <Typography
                                            sx = {{
                                                fontSize: 14,}}>メモ：{item.memo}</Typography>
                                    </Grid>}

                                <Grid item xs={3} align="right">
                                    {/* ログインユーザーがAdminUserMailと一致している場合はすべての記録の編集が可能 */}
                                    {/* editの状態により「編集」「更新」が切り替わる */}
                                    {loginUser && AdminUserMail === loginUser.email ? 
                                    <Button
                                        sx = {{top : 10}}
                                        size='small'
                                        variant={ item.edit ? "contained" : "outlined"}
                                        endIcon={ item.edit ? <SystemUpdateIcon /> : <EditIcon />}
                                        onClick={(event) => 
                                            {item.edit ? 
                                                handleClickUpDate(event ,item) 
                                                : 
                                                handleClickEdit(event , index)}}>
                                            {item.edit ? "更新" : "編集"}</Button> 
                                    /* 自分が登録した記録の場合は、編集ボタンを表示する */
                                    /* editの状態により「編集」「更新」が切り替わる */
                                    : profile && item.uid === profile.uid ? 
                                    <Button
                                    sx = {{top : 10}}
                                    size='small'
                                    variant={ item.edit ? "contained" : "outlined"}
                                    endIcon={ item.edit ? <SystemUpdateIcon /> : <EditIcon />}
                                    onClick={(event) => 
                                        {item.edit ? 
                                            handleClickUpDate(event ,item) 
                                            : 
                                            handleClickEdit(event , index )}}>
                                        {item.edit ? "更新" : "編集"}</Button> 
                                    : ""}
                                </Grid>

                                <Grid item xs={3} align="left">
                                    {/* 自分が登録した記録の場合は、削除ボタンを表示する */}
                                    {/* editの状態により「削除」「キャンセル」が切り替わる */}
                                    {loginUser && AdminUserMail === loginUser.email ? 
                                        <Button
                                            sx = {{top : 10}}
                                            size='small'
                                            variant="outlined"
                                            endIcon={item.edit ? "" : <DeleteIcon />}
                                            onClick={(event) => 
                                                {item.edit ? 
                                                    handleClickChancel(event , index)
                                                :
                                                    handleClickOpen(event , item.id)}}>
                                                {item.edit ? "キャンセル" : "削除"}</Button>
                                    /* 自分が登録した記録の場合は、編集ボタンを表示する */
                                    /* editの状態により「編集」「更新」が切り替わる */
                                    : profile && item.uid === profile.uid ? 
                                        <Button
                                            sx = {{top : 10}}
                                            size='small'
                                            variant="outlined"
                                            endIcon={item.edit ? "" : <DeleteIcon />}
                                            onClick={(event) => 
                                                {item.edit ? 
                                                    handleClickChancel(event , index)
                                                :
                                                    handleClickOpen(event , item.id)}}>
                                                {item.edit ? "キャンセル" : "削除"}</Button>
                                    : ""}
                                </Grid>
                                <Grid item xs={5} align="right">
                                    <Typography
                                        sx = {{p : 1,
                                            fontSize: 14,}}>
                                        <Link 
                                            href={`/userinfo/${item.uid}`} 
                                            color="#000000"
                                            underline="hover"
                                            onClick={handleButtonClick}>
                                            {item.userName}
                                        </Link></Typography>
                                </Grid>
                                <Grid item xs={1} align="left">
                                    <Avatar 
                                        src={item.image}
                                        alt="" />
                                </Grid>
                            </Grid>
                        {/* </AccordionSummary>
                        <AccordionDetails>
                            <Grid container spacing={2}>

                            </Grid>
                        </AccordionDetails>
                    </Accordion> */}
                </Grid>
            </Grid>
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
