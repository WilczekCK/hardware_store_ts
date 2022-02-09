import { createApp } from "vue";
import { Button } from "vant";

import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.config.performance = true; //enable vue troubleshooting

/* VANT */
app.use(Button);
/* VANT */

app.use(store).use(router).mount("#app");
