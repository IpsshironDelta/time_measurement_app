import { useState    } from "react"
import { firebaseApp } from "../../firebase"
import { useHistory  } from "react-router-dom";
import { sendPasswordResetEmail    } from "firebase/auth"

const fireauth = firebaseApp.fireauth
// パスワードの再設定で使用する
export default function useSendMail () {
    const history = useHistory()
  
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)
  
    const sendMail = (email) => {
      sendPasswordResetEmail(fireauth, email)
        .then(() => {
          setSuccess(true)
          setTimeout(() => {
            history.push("/login")
          }, 2000)
        })
        .catch(err => {
          console.log(err.message)
          setError(err.message)
        })
    }
  
    return { success, error, sendMail }
  }