import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { firestorePlugin } from 'vuefire'
import * as VueGoogleMaps from 'vue2-google-maps'
import firebase from 'firebase/app'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import "../firebase";
import vuetify from './plugins/vuetify';
import VuetifyDialog from "vuetify-dialog";
import "vuetify-dialog/dist/vuetify-dialog.css";

Vue.config.productionTip = false;

Vue.use(firestorePlugin); //for vuefire
Vue.use(VueGoogleMaps, {
  load: {
    libraries: 'geometry', key: '***REMOVED***'
  },
});
Vue.use(VuetifyDialog);


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
