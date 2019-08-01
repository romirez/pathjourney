import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { firestorePlugin } from 'vuefire'
import * as VueGoogleMaps from 'vue2-google-maps'
import firebase from 'firebase/app'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import "../firebase";
import VModal from 'vue-js-modal'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.use(firestorePlugin); //for vuefire
Vue.use(VueGoogleMaps, {
  load: {
    libraries: 'geometry', key: '***REMOVED***'
  },
});
Vue.use(VModal, { dialog: true });

new Vue({
  render: h => h(App),

  data: function () {
    return {};
  },

  components: {},
  router,
  methods: {},
  vuetify,

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
    });
  }
}).$mount('#app')
