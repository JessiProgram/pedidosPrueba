import Vue from 'vue'
import MiddlewarePlugin from 'vue-router-middleware-plugin'
import router from '@/router'

Vue.use(MiddlewarePlugin, router)