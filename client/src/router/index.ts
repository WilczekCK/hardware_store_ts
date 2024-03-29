import { createRouter, createWebHistory, NavigationGuardNext, RouteRecord, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();

function checkIfLogged(to: any){
  if ( cookies.get("session_hardware") ) return true;
  return '/'
}

function checkIfNotLogged(to: any){
  if ( cookies.get("session_hardware") ) return '/'
  return true;
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/auctions",
    name: "Auctions",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auctions.vue"),
  },
  {
    path: "/auctions/add",
    name: "Add auction",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/NewAuction.vue"),
  },
  {
    path: "/auctions/:id",
    name: "Auction",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Auction.vue"),
  },
  {
    path: "/login",
    name: "Login",
    beforeEnter: [checkIfNotLogged],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/LoginContainer.vue"),
  },
  {
    path: "/register",
    name: "Register",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Register.vue"),
  },
  {
    path: "/verify/:token",
    name: "Mail Verification",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Verification.vue"),
  },
  {
    path: "/profile",
    name: "Cutomize profile",
    beforeEnter: [checkIfLogged],
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ConfigProfile.vue"),
  },
  {
    path: "/profile/:id",
    name: "Visiting profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/VisitProfile.vue"),
  },
  {
    path: "/forgetPassword",
    name: "Forget password",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/forgetPassword.vue"),
  },
  {
    path: "/forgetPassword/:token",
    name: "Forget password token",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/forgetPassword.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
