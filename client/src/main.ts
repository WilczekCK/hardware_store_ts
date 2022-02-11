import { createApp } from "vue";
import { Button, Row, Col, RowAlign, RowJustify, Sticky, NavBar, Loading } from "vant";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";



const app = createApp(App);
app.config.performance = true; //enable vue troubleshooting

/* VANT */
app.use(Button).use(Row).use(Col).use(Sticky).use(NavBar).use(Loading);

/* AXIOS */
axios.defaults.baseURL = "http://localhost:8000/";

app.use(store).use(router).mount("#app");
