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

import { db }             from '../../firebase'
import {collection,
        getDocs ,}        from 'firebase/firestore'
import { firebaseApp }    from "../../firebase"
import Accordion          from "./RecordAccordion"

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

function 記録表示(data) {
  // ------------------入力系変数------------------
  const history = useHistory()

  return (
      <Container maxWidth="sm">
        <Box sx={{ flexGrow: 1,
                   bgcolor: '#f5f5f5' }}>
        <Header/>
        <Paper sx={{ m: 2, p: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} align="center">
              <Typography variant="h4">過去の記録</Typography >
            </Grid>

            {/* データ表示領域 */}
            <Grid item xs={12} align="center">
              <Accordion/>
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
          </Paper>
        <br/>
      </Box>
    </Container>
  );
}

export default 記録表示;
