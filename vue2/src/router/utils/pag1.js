import autenticado from '@/middlewares/autenticado'

const rutas = []

rutas.push({
    path: '/autenticacion/inicio-sesion',
    name: 'InicioSesion',
    component: () => import('../../views/autenticacion/InicioSesion'),
    meta: {
        title: 'Inicio de sesión - kambai',
        requiresAuth: false,
        middleware: autenticado
    }
})

export default rutas