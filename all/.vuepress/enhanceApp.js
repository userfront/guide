import Vuex from "vuex";
import store from "./utils/store.js";
import axios from "axios";
import { Button, ButtonGroup, Input } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

const docsJsonUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/v0/docs.json"
    : "https://api.userfront.com/v0/docs.json";

export default async ({ router, Vue }) => {
  // Add vuex
  Vue.use(Vuex);
  Vue.mixin({ store });

  // Add Element UI components
  Vue.use(Button);
  Vue.use(ButtonGroup);
  Vue.use(Input);

  router.beforeEach((to, from, next) => {
    if (to && to.path === "/") {
      return next({ path: "/guide/" });
    }
    next();
  });

  // Render mod after each route change
  router.afterEach(() => {
    try {
      if (window.Userfront) Userfront.render();
      setPrimaryAnchor();
      // scrollToAnchor();
    } catch (err) {}
  });

  // Load the docs.json spec
  try {
    const { data } = await axios.get(docsJsonUrl);
    Vue.prototype.$docs = data;
    Vue.prototype.$demoToken =
      "uf_test_readonly_demo1234_2d87b3d230bda5685276b43efdac2852";
    store.dispatch("setActiveProject");
  } catch (error) {
    console.error("Problem fetching docs.json");
    console.error(error);
  }

  // function scrollToAnchor() {
  //   setTimeout(() => {
  //     if (window.location.hash) {
  //       const element = document.getElementById(window.location.hash.slice(1));

  //       if (element) {
  //         element.scrollIntoView();
  //       }
  //     }
  //   }, 500);
  // }
};

function setPrimaryAnchor() {
  try {
    setTimeout(() => {
      const el = document.getElementsByClassName("home-link")[0];
      el.href = "/guide/";
    }, 100);
  } catch (error) {}
}
