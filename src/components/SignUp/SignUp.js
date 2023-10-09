import   React, 
       { useState } from "react"
import { Avatar,
         Alert,
         Button,
         CssBaseline,
         TextField,
         Box,
         Typography,
         Container,
         Grid,
         Link,}         from "@mui/material"
import useSignup        from "../hooks/useAuth"
import {createTheme, 
        ThemeProvider } from '@mui/material/styles'
import useUser          from "../hooks/getuseAuth"
import {firebaseApp }       from "../../firebase"

const theme = createTheme({
  shadows: ["none"],
  palette: {
    // ボタンのカラー設定
    primary: {
      main: '#6495ed',
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

// 定数
const collectionUserName    = "users"

export default function Signup() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup, error , success } = useSignup()
  const { user } = useUser()
  const firestore = firebaseApp.firestore

  const handleSubmit = (event) => {
    event.preventDefault()
    signup(email, password )
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
        <Avatar sx={{ m: 1, bgcolor: "#6495ed" }}>
          {/* <LockOutlinedIcon /> */}
        </Avatar>
        <Typography component="h1" variant="h5">
          新規ユーザー登録
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <Typography variant="h7">
            メールアドレス(公開されません)
          </Typography>
          <TextField
            margin       = "normal"
            required
            fullWidth
            id           = "email"
            label        = "メールアドレス"
            name         = "email"
            autoComplete = "email"
            autoFocus
            value        = {email}
            onChange     = {e => setEmail(e.target.value)}/>
          <Typography variant="h7">
            パスワード(公開されません)
          </Typography>
          <TextField
            margin       = "normal"
            required
            fullWidth
            name         = "password"
            label        = "パスワード"
            type         = "password"
            id           = "password"
            autoComplete = "current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2,}}
            link = "/"
            // startIcon = {<PersonAddAlt1Icon/>}
            onClick = {handleSubmit}>
            この内容で登録する
          </Button>
          {error && <Alert severity="error">ユーザー登録できませんでした</Alert>}
          {success && <Alert severity="success">ユーザー登録が完了しました！</Alert>}
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item>
              <Link href="login" variant="body2">
                ログインはこちら
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
    </ThemeProvider>
  )
}