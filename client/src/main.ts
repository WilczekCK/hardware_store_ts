import { createApp } from "vue";
import { Button, Row, Col, RowAlign, RowJustify, Sticky, NavBar, Loading, Form, Field, CellGroup, Toast } from "vant";
import { globalCookiesConfig } from "vue3-cookies";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";



const app = createApp(App);
app.config.performance = true; //enable vue troubleshooting

/* VANT */
app.use(Button).use(Row).use(Col).use(Sticky).use(NavBar).use(Loading).use(Form).use(Field).use(CellGroup).use(Toast);

/* AXIOS */
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

/* COOKIES */
globalCookiesConfig({
    expireTimes: "7d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
});

console.log(axios.defaults);

app.use(store).use(router).mount("#app");
