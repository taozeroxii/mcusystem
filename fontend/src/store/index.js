import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      token: null,
      username: null,
      level: null,
      fname: null,
      lname: null,
      pname: null,
    },
  },
  mutations: {
    set_user: (state, resdata) => (state.user = resdata),
  },
  actions: {
    get_user_login: ({ commit }) =>
      Axios.post("api/mcusystem/checkJWTexpire", "", {
        headers: { authorization: localStorage.getItem("token") },
      }).then((res) => commit("set_user", res.data)),
    // Axios.post("http://172.18.2.2:3010/api/admin/checkJWTexpire", "", {
    //   headers: { "x-access-token": localStorage.getItem("token") },
    // }).then((res) => commit("set_user", res.data)),
  },
  getters: {
    get_username(state) {
      return state.user.username;
    },
    get_token(state) {
      return state.user.token;
    },
    get_loginname(state) {
      return "คุณ " + state.user.fname + " " + state.user.lname;
    },
    get_nickname(state) {
      return state.user.niname;
    },
  },
  modules: {},
});
