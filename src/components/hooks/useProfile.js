import React, { useState , useEffect } from "react"
import { collection,
         query,
         where,
         DocumentData,
         getDocs, } from "firebase/firestore"
import { Auth, getAuth, onAuthStateChanged } from "firebase/auth"
import {firebaseApp } from "../../firebase"

export default function useProfile ()  {
    const [profile, setProfile] = useState(null)
    
    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, async user => {
            if (user) {
                const userUid = user.uid
                const firestore = firebaseApp.firestore
                const q = query(
                    collection(firestore, "users"),
                    where("uid", "==", userUid)
                )
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach(doc => {
                    const docData = doc.data()
                    docData.id = doc.id
                    setProfile(docData)
                })
            }
        })
      }, [])
  
    return { profile }
  }