import { firebaseApp } from "../../firebase"
import { useHistory } from "react-router-dom";
import { signOut } from "firebase/auth"

const fireauth = firebaseApp.fireauth
// ログアウトする際に使用する
export default function useLogout () {
    const history = useHistory()

    const logout = () => {
      signOut(fireauth)
        .then(() => {
          console.log("Sign-out successful.")
          setTimeout(() => {
            // ログアウトが成功するとログイン画面へ遷移する
            history.push("/login")
            },2000)
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  
    return { logout }
  }