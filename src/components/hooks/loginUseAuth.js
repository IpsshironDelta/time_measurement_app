import { useState } from "react"
import { firebaseApp } from "../../firebase"
import { signInWithEmailAndPassword} from "firebase/auth"
import { useHistory } from "react-router-dom";

const fireauth = firebaseApp.fireauth
// ログインする際に使用する
export default function useLogin () {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
    const history = useHistory()
  
    const login = (email, password) => {
      setError(null)
      signInWithEmailAndPassword(fireauth, email, password)
        .then(() => {
          setSuccess(true)
          console.log("ログインに成功しました。")
          setTimeout(() => {
            history.push("/")
          },2000)
        })
        .catch(err => {
          console.log(err.message)
          setError(err.message)
          console.log("ログインに失敗しました。")
        })
    }
  
    return { success, error, login }
  }