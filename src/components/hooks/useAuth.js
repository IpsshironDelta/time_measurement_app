import { useState } from "react"
import { firebaseApp } from "../../firebase"
import { createUserWithEmailAndPassword,
         getAuth } from "firebase/auth"
import { useHistory } from "react-router-dom";

const fireauth = firebaseApp.fireauth
// ユーザー登録/サインインに使用する
export default function useSignup () {
  const [error, setError] = useState(null)
  const [success , setSuccess] = useState(null)
  const history = useHistory()

  const signup = (email, password ) => {
    setError(null)
    createUserWithEmailAndPassword(fireauth, email, password)
      .then(res => {
        console.log(res.user)
        console.log("ユーザー登録成功! (res.use) : ",res.user)
        setSuccess(true)
        // 成功した場合はホーム画面へ遷移
        setTimeout(() => {
          history.push("/setting")
        }, 2000)
      })
      .catch(err => {
        console.log(err.message)
        setError(err.message)
        console.log("ユーザー登録失敗! (err.message) : ",err.message)
        // 失敗したときは何もしない
      })
  }

  return { success , error, signup }
}

