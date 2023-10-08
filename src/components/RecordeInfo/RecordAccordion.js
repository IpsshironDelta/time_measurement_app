import React, 
     { useState , 
       useEffect}       from 'react'
import {Avatar ,
        Typography,
        Grid ,
        Accordion ,}    from "@mui/material"
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon   from '@mui/icons-material/ExpandMore'
import { useHistory }   from "react-router-dom"
import { db }           from '../../firebase'
import {collection,
        getDocs ,}      from 'firebase/firestore'
import { firebaseApp }  from "../../firebase"


////////////////////////////////////////////
//　定数
////////////////////////////////////////////
const WorkTimeInfo = "WorkTimeInfo"
const UserInfo     = "users"

export default function BasicAccordion() {
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
    <div>
        {record ? (record.map((item) => (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Grid container spacing={0}>
                        <Grid item xs={4} align="left">
                            <Typography
                                sx = {{
                                    fontSize: 16,}}>記録：{item.time}</Typography>
                        </Grid>
                        <Grid item xs={8} align="left">
                            <Typography 
                                sx = {{
                                    fontSize: 14,}}>業務内容：{item.work}</Typography>
                        </Grid>
                        <Grid item xs={11} align="right">
                            <Typography
                                sx = {{p : 1,
                                    fontSize: 14,}}>{item.userName}</Typography>
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
                                    fontSize: 14,}}>測定日：{item.date}</Typography>
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
    </div>
  );
}
