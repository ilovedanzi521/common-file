// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App.vue";
import VueDND from "awe-dnd";
import ElementUI from "element-ui";
import "./assets/style/theme.scss";
import router from "./router/index";
import store from "./store/index";
import "./assets/style/reset.scss";
import "./assets/style/font.scss";
import "@win-frond-frameworks/biz-common/dist/static/index.css";
import filters from "../src/mixin/filters";
import directives from "../src/mixin/directives";

Vue.use(directives);
import VxeTable from "vxe-table";
//注册全局filters
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Vue.use(VxeTable);

Vue.use(ElementUI);

Vue.config.productionTip = false;
let d = process.env.NODE_ENV;
console.log(d);

//全局锁屏判断
router.beforeEach((to, from, next) => {
    if (localStorage.getItem("lockName")) {
        next(false);
    } else {
        next();
    }
});

Vue.use(VueDND);

/* eslint-disable no-new */
// tslint:disable-next-line: no-unused-expression
new Vue({
    el: "#app",
    router,
    store,
    components: { App },
    template: "<App/>"
});
