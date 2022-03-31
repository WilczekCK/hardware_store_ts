import { createApp } from "vue";
import { Button, Row, Col, RowAlign, RowJustify, Sticky, NavBar, Collapse, CollapseItem, Loading, Form, Field, CellGroup, Toast, Picker, Checkbox, Popup, Area, Locale, DropdownMenu, DropdownItem, Icon, Uploader } from "vant";
import enUS from 'vant/es/locale/lang/en-US';
import VueCookies from "vue3-cookies";

import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "axios";


const app = createApp(App);
app.config.performance = true; //enable vue troubleshooting

/* VANT */
app.use(Button).use(Row).use(Col).use(Sticky).use(NavBar).use(Loading).use(Collapse).use(CollapseItem).use(Form).use(Field).use(CellGroup).use(Picker).use(Area).use(Checkbox).use(Popup).use(Icon).use(Uploader).use(DropdownMenu).use(DropdownItem).use(Toast);
Locale.use('en-US', enUS);

/* AXIOS */
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.withCredentials = true;

/* COOKIES */
app.use(VueCookies, {
    expireTimes: "7d",
    path: "/",
    domain: "",
    secure: true,
    sameSite: "None",
});

app.use(store).use(router).mount("#app");
