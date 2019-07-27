import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { firestorePlugin } from 'vuefire'
import * as VueGoogleMaps from 'vue2-google-maps'
import firebase from 'firebase/app'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

Vue.use(firestorePlugin) //for vuefire
Vue.use(VueGoogleMaps, {
  load: {
    key: '***REMOVED***'
  },
})

//in progress
router.beforeEach((to, from, next) => {
  if (!to.meta.protected) { //route is public, don't check for authentication
    next()
  } else {  //route is protected, if authenticated, proceed. Else, login
    let unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      console.log("test1")
      if (user) {
        next()
      } else {
        console.log("test")
        router.push('/login')
        
      }
    })
    unsubscribe()
  }
})

new Vue({
  render: h => h(App),
  data: function () {
    return {};
  },
  components: {},
  router,
  methods: {}
}).$mount('#app')
