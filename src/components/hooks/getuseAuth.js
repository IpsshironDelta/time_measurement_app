import {getAuth } from "firebase/auth"

export default function useUser () {
    const auth = getAuth()
    // 認証プロフィールを取得するために、authのcurrentUserを指定します。
    const user = auth.currentUser
  
    // userが存在する場合、emailとaccessTokenを取得して返す。
    // user存在しない場合、そのままuserを返す。
    if (user !== null) {
      const email = user.email
      const uid   = user.uid
      const accessToken = user.accessToken
  
      const userInfo = {
        email,
        uid,
      }
      console.log("ユーザー情報取得 => ",userInfo)
      return { user: userInfo }
    } else {
      return { user }
    }
  }