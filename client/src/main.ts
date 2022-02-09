import { createApp } from "vue";
import { Button, Row, Col, RowAlign, RowJustify, Sticky } from "vant";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.config.performance = true; //enable vue troubleshooting

/* VANT */
app.use(Button).use(Row).use(Col).use(Sticky);
/* VANT */

app.use(store).use(router).mount("#app");
