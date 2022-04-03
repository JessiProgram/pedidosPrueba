import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, getDoc, doc } from 'firebase/firestore'
const auth = getAuth()
const db = getFirestore()

export default {
    state: {
        token: '',
        usuario: null,
    },
    mutations: {
        setUsuario (state, usuario) {
            if (!usuario) {
                state.usuario = null
                return
            }
            state.usuario = {
                uid: usuario.uid,
                nombreCompleto: usuario.nombreCompleto,
                correo: usuario.correo,
                cedula: usuario.cedula,
                ciudad: usuario.ciudad,
                fechaNacimiento: usuario.fechaNacimiento,
                datosTelefono: usuario.datosTelefono,
                rol: usuario.rol,
            }
        },
        setToken (state, token) {
            if (!token) {
                state.token = ''
                return
            }

            state.token = token
        }
    },
    actions: {
        firebaseLogin: async ({commit}, data) => {
            const credential = await signInWithEmailAndPassword(auth, data.correo, data.contrasenha)
            // const docRef = doc(db, 'Usuarios', credential.user.uid)
            // const docSnap = await getDoc(docRef)
            // commit('setUsuario', docSnap.data())
            return credential
        },
        firebaseLogout: async ({commit}) => {
            await signOut(auth)
            // commit('setUsuario', null)
            // commit('setToken', null)
        },
        updateToken: async ({commit}) => {
            const usuario = auth.currentUser
            if (!usuario) return null

            const token = await usuario.getIdToken()
            commit('setToken', token)

            return token
        }
    },
    getters: {
        getUsuario ( state ) {
            return state.usuario
        },
        estaAutenticado ( state ) {
            return !!state.usuario
        }
    },
    modules: {
    }
}