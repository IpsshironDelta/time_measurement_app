import React ,
      {useEffect,
       useState, }               from "react"
import { Alert , 
       Typography ,
       Box ,
       Grid,
       Container ,
       TextField , 
       Button, }                 from "@mui/material"
import {collection,
        addDoc,
        getDocs}                 from 'firebase/firestore'
import { firebaseApp ,
        db }                     from "../../firebase"
import store                     from '../../store';
import WorkSelect                from "./WorkSelect"
import NumberSelect              from "./NumberSelect"
import Header                    from "../../Header"
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon            from '@mui/icons-material/StopCircle';
import RestartAltIcon            from '@mui/icons-material/RestartAlt';
import SaveAltIcon               from '@mui/icons-material/SaveAlt';
import TaskIcon                  from '@mui/icons-material/Task';
import { useHistory }            from "react-router-dom";
import useProfile                from "../hooks/useProfile"

// -------------------定数-------------------
const WorkTimeInfo = "WorkTimeInfo"
const UserInfo     = "users"

let startTime;
let timeoutId;
let elapsedTime = 0;

const GameStatus = Object.freeze({
  init:'init',
  start:'start',
  reset:'reset',
  stop:'stop'
});


function MainPage() {
  // -------------------変数-------------------
  const [time   , timeChange]   = useState('00:00.000');
  const [status , statusChange] = useState(GameStatus.init);
  const [startStatus  , setStartStatus]    = useState(false) // スタートボタンの状態(初期値：活性)
  const [stoptStatus  , setStoptStatus]    = useState(true)  // ストップボタンの状態(初期値：非活性)
  const [resettStatus , setResetStatus]    = useState(true)  // リセットボタンの状態(初期値：非活性)
  const [saveStatus   , setSaveStatus]     = useState(true)  // 業務記録を保存ボタンの状態(初期値：非活性)
  const [recordStatus , setRecordStatus]   = useState(false) // 記録を確認ボタンの状態(初期値：非活性)
  const [number       , setNumber]         = useState("")    // 個数を代入
  const [work         , setWork]           = useState("")    // 業務内容を代入
  const [memo         , setMemo]           = useState("")    // メモを代入
  const [avarage      , setAvarate]        = useState("")    // 平均値を代入
  const now         = new Date()          // 本日の日付を取得
  const nowYear     = now.getFullYear()   // 本日の年を取得
  const nowMonth    = now.getMonth() + 1  // 本日の月を取得
  const nowDay      = now.getDate()       // 本日の日を取得
  const history     = useHistory()
  const profileData = useProfile()
  const profile     = profileData.profile
  const [userinfo  ,  setUserInfo]  =  useState()  // ユーザー情報を代入
  const UserInfoAry = []

  // ------------------メッセージ用------------------
  const [error          , setError]          = useState(false) // エラー判定
  const [errormessage   , setErrorMessage]   = useState("")    // エラーメッセージ
  const [success        , setSuccess]        = useState(false) // サクセス判定
  const [successmessage , setSuccessmessage] = useState("")    // サクセスメッセージ


  const countUp = () => {    
    const d  = new Date(Date.now() - startTime+elapsedTime);
    const m  = String(d.getMinutes()).padStart(2,'0');
    const s  = String(d.getSeconds()).padStart(2,'0');
    const ms = String(d.getMilliseconds()).padStart(3,'0');

    timeChange(`${m}:${s}.${ms}`);

    timeoutId = setTimeout(()=>{
      countUp();
    },10);
  }

  // 初回起動
  useEffect(() => {
    // ユーザー情報を取得する
    fechUserData()
  },[])

  // ユーザーが認証されていない場合、ログイン画面へ遷移する
  firebaseApp.fireauth.onAuthStateChanged(user => {
    if (!user) {
      history.push("/login")
      console.log("ユーザー情報が無いためログイン画面に遷移する")
    }else{
      store.getState().loginUserUID = user.uid
      store.getState().loginUserEmail = user.email
      console.log("user.uid => " , user.uid)
      console.log("user.email => " , user.email)
    }
  })

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
        }
      })
    }).then(()=>{
      setUserInfo([...UserInfoAry])
    })
    console.log("UserInfoAry => " , UserInfoAry)
  }

  // 平均値を算出
  const handleAvarage = () => {
    // 元の時間文字列
    const timeString = time

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
    const resultMilliseconds = resultInMilliseconds % 1000;

    // 結果を文字列にフォーマット
    const resultString = `${resultMinutes.toString().padStart(2, '0')}:${resultSeconds.toString().padStart(2, '0')}.${resultMilliseconds.toString().padStart(3, '0')}`;

    console.log("計測結果：",time); // 結果をコンソールに表示
    console.log("個数：",number); // 結果をコンソールに表示
    console.log("平均値：",resultString); // 結果をコンソールに表示
    store.getState().avarage = resultString
    setAvarate(resultString)

  }

  // 過去の記録を確認ボタンクリック時の処理
  const handleRecord = () => {
  }

  // 業務記録を保存ボタンクリック時の処理
  const handleSave = (e) => {
    console.log(work , number)
    // 業務が選択されているか判定する
    if(work ===""){
      console.log("業務の内容が選択されていない")
      setErrorMessage("業務を選択してください。")
      setError(true)
      return
    }
    // 個数が選択されているか確認する
    if(number ===""){
      console.log("個数が選択されていない")
      setErrorMessage("個数を選択してください。")
      setError(true)
      return
    }
    // メモがされているか確認する
    if(memo ===""){
      console.log("メモが入力されていない")
      setMemo("-")
    }
    store.getState().measurementDay = nowYear + "年" + nowMonth + "月" + nowDay + "日"
    store.getState().selectWork   = work
    store.getState().number       = number
    store.getState().memo         = memo
    store.getState().record       = time
    // 平均値を算出
    handleAvarage()

    const firestore = firebaseApp.firestore
    try {
      const WorkTimeRef = collection(firestore, WorkTimeInfo)  
      addDoc(WorkTimeRef, {
        date     : store.getState().measurementDay , 
        memo     : memo             ,
        num      : number           ,
        time     : time             ,
        userName : userinfo[0].name ,
        work     : work             , 
        avarage  : store.getState().avarage,
      })
      console.log("firestoreに登録が完了しました。")
      setSuccessmessage("記録を保存しました。")
      setSuccess(true)
      setMemo("")
      setWork("")
      setNumber("")
      timeChange('00:00.000')
      elapsedTime = 0
    } catch (e) {
      console.log(e);
    }
  }

  // startボタンクリック時の処理
  const handleStart = () => {
    setStartStatus(true)  // 非活性
    setStoptStatus(false) // 活性
    setResetStatus(true)  // 非活性
    setSaveStatus(true)   // 非活性
    setError(false)
    setErrorMessage("")
    setSuccess(false)
    setSuccessmessage("")
    startTime = Date.now();
    countUp();
    statusChange(GameStatus.start);
  };

  // stopボタンクリック時の処理
  const handleStop = () => {
    setStartStatus(false) // 活性
    setStoptStatus(true)  // 非活性
    setResetStatus(false) // 活性
    setSaveStatus(false)  // 活性
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
    statusChange(GameStatus.stop);
  }

  // resetボタンクリック時の処理
  const handleReset = () => {
    setStartStatus(false) // 活性
    setStoptStatus(true)  // 非活性
    setResetStatus(true)  // 非活性
    setSaveStatus(true)   // 非活性
    timeChange('00:00.000')
    elapsedTime = 0
    statusChange(GameStatus.init)
  };
  
  return (
    <Container maxWidth="sm">
      <Box sx={{ flexGrow: 1,
                   bgcolor: '#f5f5f5' }}>
        <Header info = {userinfo}/>
        <Grid container spacing={2}>
          {/* タイトル表示領域 */}
          <Grid item xs={12} align="center">
            <br/>
            <Typography variant="h4">ストップウォッチ</Typography >
            <Typography variant="h4">{time}</Typography >
          </Grid>
          <Grid item xs={6} align="center">
            <Typography 
              sx = {{
                fontSize      : 16,
              }}>測定日：{nowYear}年{nowMonth}月{nowDay}日</Typography>
          </Grid>
          <Grid item xs={6} align="center">
            {userinfo ? (userinfo.map((item) => (
              <Typography 
                sx = {{
                  fontSize      : 16,
                }}>ユーザー：{item.name}</Typography>  
            )))
            :
              <Typography 
                sx = {{
                  fontSize      : 16,
                }}>ユーザー：</Typography>}
          </Grid>

          {/* 業務を選択 */}
          <Grid item xs={1} align="center"></Grid>
          <Grid item xs={5} align="center">
            <WorkSelect
              id        = "WorkSelect"
              label     = "業務を選択"
              value     = {work}
              onChange  ={(e) =>
                setWork(e.target.value)}/>
          </Grid>
          <Grid item xs={5} align="center">
            <NumberSelect
              id        = "NumberSelect"
              label     = "個数を選択"
              value     = {number}
              onChange  ={(e) =>
                setNumber(e.target.value)}/>
          </Grid>
          <Grid item xs={1} align="center"></Grid>

          {/* 業務メモ入力領域 */}
          <Grid item xs={1} align="center"></Grid>
          <Grid item xs={10} align="center">
            <TextField
              label        = "メモを入力"
              defaultValue = ""
              value        = {memo}
              rows         = {5}
              multiline
              fullWidth
              onChange={(e) => 
                setMemo(e.target.value)} />
          </Grid>
          <Grid item xs={1} align="center"></Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={4} align="center">
            <Button
              variant="contained"
              disabled = {startStatus}
              onClick={handleStart}
              endIcon={<PlayCircleFilledWhiteIcon />}>Start</Button>
          </Grid>
          <Grid item xs={4} align="center">
            <Button
              variant="contained"
              disabled = {stoptStatus}
              onClick={handleStop}
              endIcon={<StopCircleIcon />}>Stop</Button>
          </Grid>
          <Grid item xs={4} align="center">
            <Button
              variant="outlined"
              disabled = {resettStatus}
              onClick={handleReset}
              endIcon={<RestartAltIcon />}>Reset</Button>
          </Grid>
          <Grid item xs={6} align="center">
            <Button
              variant="contained"
              disabled = {saveStatus}
              onClick= {() => {
                handleSave()
              }}
              endIcon={<SaveAltIcon />}>業務記録を保存</Button>
          </Grid>
          <Grid item xs={6} align="center">
            <Button
              variant="contained"
              disabled = {recordStatus}
              onClick  = {() => {
                handleRecord()
                history.push("/recordinfo")}}
              endIcon={<TaskIcon />}>過去の記録を確認</Button>
          </Grid>

          {/* 入力不備がある場合はアラートを出す */}
          {/* 登録が成功した場合もアラートを出す */}
          <Grid item xs={12} align="center">
            {error && <Alert severity="error">{errormessage}</Alert>}
            {success && <Alert severity="success">{successmessage}</Alert>}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default MainPage;