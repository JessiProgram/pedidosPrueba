import store from '@/store'

import firebaseConfig from '@/config/firebase'
import { getAuth, initializeApp } from 'firebase/app'
import { onAuthStateChanged } from 'firebase/auth'
import { getFirestore, onSnapshot, doc } from 'firebase/firestore'

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

onAuthStateChanged(auth, async (usuario) => {
    if (usuario) {
        const token = await usuario.getIdToken()
        console.log('token', token)

        const unsub = onSnapshot(doc(db, 'Usuarios', usuario.uid), (doc) => {
            store.commit('setUsuario', doc.data())
            store.commit('setToken', token)
        })
        
    } else {
        store.commit('setUsuario', null)
        store.commit('setToken', null)
    }
})