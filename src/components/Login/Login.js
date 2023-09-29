import React, { useState } from "react"
import {  Avatar,
          Alert,
          Button,
          CssBaseline,
          TextField,
          Box,
          Typography,
          Container,
          Grid,
          Link,}             from "@mui/material"
import    LockOutlinedIcon   from "@mui/icons-material/LockOutlined"
import    useLogin           from "../hooks/loginUseAuth"
import {  createTheme, 
          ThemeProvider }    from '@mui/material/styles';
import    LoginIcon          from '@mui/icons-material/Login';

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

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, success, error } = useLogin()

  const handleSubmit = (event) => {
    console.log("handleSubmit 通過")
    event.preventDefault()
    login(email, password)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
      </Container>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#b22028" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              ログイン
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
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon = {<LoginIcon/>}
            >
              ログイン
            </Button>
              {error && <Alert severity="error">ログインできませんでした</Alert>}
              {success && <Alert severity="success">ログインしました</Alert>}
            <Grid container>
              <Grid item xs>
                <Link href="passwordreset" variant="body2">
                  パスワードを忘れた方
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  アカウントをお持ちでない方
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}