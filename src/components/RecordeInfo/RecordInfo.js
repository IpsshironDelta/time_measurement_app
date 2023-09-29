import React, 
     { useState , 
       useEffect}         from 'react'
import Button             from '@mui/material/Button'
import Grid               from '@mui/material/Grid'
import Box                from '@mui/material/Box'
import Container          from '@mui/material/Container'
import Typography         from '@mui/material/Typography'
import { useHistory }     from "react-router-dom";
import Header             from "../../Header"
import { styled }         from '@mui/material/styles';
import Table              from '@mui/material/Table';
import TableBody          from '@mui/material/TableBody';
import TableCell, 
     { tableCellClasses } from '@mui/material/TableCell';
import TableContainer     from '@mui/material/TableContainer';
import TableHead          from '@mui/material/TableHead';
import TableRow           from '@mui/material/TableRow';
import Paper              from '@mui/material/Paper';
import TaskIcon           from '@mui/icons-material/Task';
import store              from '../../store';
import { db }             from '../../firebase'
import { doc , 
        collection,
        getDocs ,
        updateDoc,}       from 'firebase/firestore'
import { firebaseApp }    from "../../firebase"

////////////////////////////////////////////
//　定数
////////////////////////////////////////////
const WorkTimeInfo = "WorkTimeInfo"

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
    fontSize: 12,
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

function 個人鑑定編集(data) {
  // ------------------入力系変数------------------
  const [record  , setRecord]  = useState()   // 業務記録を格納
  const RecordDataAry     = []
  const history = useHistory()

  // 初回起動時
  useEffect(() => {
    // 業務記録データを取得
    fechRecordData()
  },[])

  // 業務記録データを取得
  const fechRecordData = () => {
    const firestore = firebaseApp.firestore
    getDocs(collection(db, WorkTimeInfo )).then((querySnapshot)=>{
      querySnapshot.forEach((document) => {        
        RecordDataAry.push({
          ...document.data(),
        })  
      })
    }).then(()=>{
      setRecord([...RecordDataAry])
    })
    console.log(RecordDataAry)
  }

  return (
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#f5f5f5' }}>
        <Header/>
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Typography variant="h4">過去の記録</Typography >
          </Grid>

          {/* データ表示領域 */}
          <Grid item xs={12} align="center">

            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="customized table">
                {/* ヘッダー部分 */}
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">1.記録日時</StyledTableCell>
                    <StyledTableCell align="center">2.担当者</StyledTableCell>
                    <StyledTableCell align="center">3.業務内容</StyledTableCell>
                    <StyledTableCell align="center">4.記録</StyledTableCell>
                    <StyledTableCell align="center">5.個数</StyledTableCell>
                    <StyledTableCell align="center">6.平均値</StyledTableCell>
                    <StyledTableCell align="center">7.コメント</StyledTableCell>
                  </TableRow>
                </TableHead>

                {/* ボディー部分 */}
                <TableBody>
                {record ? (record.map((item) => (
                    <StyledTableRow>
                      <StyledTableCell align="center">{item.date}</StyledTableCell>
                      <StyledTableCell align="center">{item.userName}</StyledTableCell>
                      <StyledTableCell align="center">{item.work}</StyledTableCell>
                      <StyledTableCell align="center">{item.time}</StyledTableCell>
                      <StyledTableCell align="center">{item.num}</StyledTableCell>
                      <StyledTableCell align="center">{item.avarage}</StyledTableCell>
                      <StyledTableCell align="center">{item.memo}</StyledTableCell>
                    </StyledTableRow>
                  ))) : 
                    <StyledTableRow >
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                        <StyledTableCell align="center">-</StyledTableCell>
                      </StyledTableRow>}
              
                </TableBody>
              </Table>
            </TableContainer>
            <br/>
          </Grid>

          {/* ボタン表示領域 */}
          <Grid item xs={12} align="center">
            <Button
                variant="contained"
                onClick  = {() => {
                    history.push("/")}}
                endIcon={<TaskIcon />}>業務記録</Button>
          </Grid>
        </Grid>
        <br/>
      </Box>
    </Container>
  );
}

export default 個人鑑定編集;
