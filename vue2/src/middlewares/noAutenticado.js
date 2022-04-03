import store from '@/store'

export default ({ to, from, redirect }) => {
    if (store.getters.estaAutenticado) {
        redirect('/')
    }
}