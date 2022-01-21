import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PageNotFound from "../views/PageNotFound.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/about",
      name: "About",
      component: () => import("../views/About.vue"),
    },
    {
      path: "/settingmenu",
      name: "settingmenu",
      component: () => import("../views/SettingMenu.vue"),
    },
    {
      path: "/Login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/Register",
      name: "Register",
      component: () => import("../views/Register.vue"),
    },

    { path: "*", component: PageNotFound },
  ],
});

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/Login", "/about"]; //หน้าที่ไม่ต้อง login
  const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem("token");
  // if (authRequired && to.name != "tableshowdata") {
  if (authRequired) {
    router.app.$store
      .dispatch("get_user_login")
      .then(() => {
        console.log(router.app.$store.state.user); //เช็คค่าที่เก็บลง store หลังจาก login
      })
      .catch(() => next({ name: "Login" }));
  }
  next();
});

export default router;
