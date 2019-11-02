// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import VueDND from "awe-dnd";
import ElementUI from "element-ui";
import "xe-utils";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import { winBiz } from "./async-chunks";

winBiz("PluginsPage").then(PluginsPage => {
    Vue.use(PluginsPage);
});

import "win-biz/assets/style/index.scss";
import "win-plus/dist/static/index.css";
import XEUtils from "xe-utils";
import VXEUtils from "vxe-utils";

Vue.use(VueDND);
Vue.use(ElementUI);
Vue.use(VXEUtils, XEUtils);

Vue.config.productionTip = false;
let $env = process.env.NODE_ENV;
Vue.prototype.$env = $env;

//全局锁屏判断
router.beforeEach((to, from, next) => {
    if (localStorage.getItem("lockName")) {
        next(false);
    } else {
        next();
    }
});

/* eslint-disable no-new */
// tslint:disable-next-line: no-unused-expression
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
});
