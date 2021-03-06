import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "material-design-icons-iconfont";
var moment = require("moment"); // require
import "./assets/styles.css";

Vue.config.productionTip = false;

//impoer alertify มาใช้งานการแสดง alert ล่างขวาจอ
import "alertifyjs/build/css/alertify.css";
import "alertifyjs/build/css/themes/default.css";
import * as alertify from "alertifyjs";
import DisableAutocomplete from "vue-disable-autocomplete";
Vue.use(DisableAutocomplete);
//filter สร้าง filter เพื่อกำหนด format วันที่
Vue.filter("date", (value) => {
  // console.log(moment().format('L'))
  return moment(value).format("DD/MM/YYYY HH:mm:ss");
});

Vue.config.productionTip = false;
// Vue.use(VeeValidate) //ใช้งาน validate form
// Vue.use(Vue2filters)
Vue.prototype.alertify = alertify; // กำหนดให้ alertify เป็นชื่อการเรียกใช้ function alertify

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
