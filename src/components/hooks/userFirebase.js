import { useState, useEffect } from "react"
import { collection, 
         onSnapshot,
         query, 
         orderBy, } from "firebase/firestore"
import { firebaseApp } from "../../firebase"

export default function useFirebase (data) {
  const [documents, setDocuments] = useState([])

  useEffect(() => {
    const firestore = firebaseApp.firestore
    const docRef = collection(firestore, data)
    const queryRef = query(docRef, orderBy("createdAt"))
    const unsub = onSnapshot(queryRef, snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })
      console.log("results => " , results)
      setDocuments(results)
    })
    return () => unsub()
  }, [data])

  return { documents }
}

