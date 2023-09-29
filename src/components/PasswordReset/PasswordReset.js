import React, { useState } from "react"
import {Avatar,
        Alert,
        Button,
        CssBaseline,
        TextField,
        Box,
        Typography,
        Container,
        Grid,}             from "@mui/material"
import LockOutlinedIcon    from "@mui/icons-material/LockOutlined"
import usePasswordReset    from "../hooks/passWordReSetting"
import {createTheme, 
        ThemeProvider }    from '@mui/material/styles';
import SendIcon            from '@mui/icons-material/Send';  
import PasswordResetButton from "./PasswordResetButton"
import ArrowBackIcon       from '@mui/icons-material/ArrowBack';

const theme = createTheme({
    shadows: ["none"],
    palette: {
        // ボタンのカラー設定
        primary: {
          main: '#b22028',
          contrastText: '#ffffff',
        },
        // 背景のカラー設定
        background: {
          default: '#ffffff',
        },
        // テキストのカラー設定
        text: { primary: '#000000' },
      },
});

export default function PasswordReset() {
    const { success, error, passwordReset } = usePasswordReset()
    const [email, setEmail] = useState("")

    // データ送信後パスワードリセットする
    const handleSubmit = (event) => {
        event.preventDefault()
        passwordReset(email)
    }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
      </Container>
      <Container component="main" maxWidth="sm">
      <Box
          sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",}}>
        <Avatar sx={{ m: 1, bgcolor: "#b22028" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          パスワード再設定
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={e => setEmail(e.target.value)}/>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon = {<SendIcon/>}>
              メールを送信する
          </Button>
          <PasswordResetButton
              fullWidth
              text = "ログイン画面へ戻る"
              variant = "outlined"
              link    = "login"
              startIcon = {<ArrowBackIcon/>}/>
        </Box>
      </Box>
      {error && (<Alert severity="error">メールアドレスに送信できませんでした</Alert>)}
      {success && (<Alert severity="success">メールアドレスに送信しました</Alert>)}
      </Container>
    </ThemeProvider>
  )
}