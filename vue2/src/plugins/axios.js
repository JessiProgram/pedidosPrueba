import Vue from 'vue'

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

// API
import api from '../config/api'

axios.defaults.baseURL = api.url

Vue.use(VueAxios, axios)

export default axios