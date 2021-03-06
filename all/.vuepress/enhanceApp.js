import Vuex from "vuex";
import store from "./utils/store.js";
import axios from "axios";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Input,
  Option,
  Link,
  Select,
} from "element-ui";

import "./styles/element-ui.scss";

const docsJsonUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/v0/docs.json"
    : "https://api.userfront.com/v0/docs.json";

export default async ({ isServer, router, Vue }) => {
  // Add vuex
  Vue.use(Vuex);
  Vue.mixin({ store });

  // Add Element UI components
  Vue.use(Breadcrumb);
  Vue.use(BreadcrumbItem);
  Vue.use(Button);
  Vue.use(ButtonGroup);
  Vue.use(Dropdown);
  Vue.use(DropdownMenu);
  Vue.use(DropdownItem);
  Vue.use(Input);
  Vue.use(Link);
  Vue.use(Option);
  Vue.use(Select);

  // Assign store and router because Vuepress doesn't accept
  // $store or $router in markdown
  Vue.prototype.store = store;
  Vue.prototype.router = router;

  if (!isServer) {
    // Update the brand link
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
      } catch (err) {}
    });

    // Load the docs.json spec
    try {
      const { data } = await axios.get(docsJsonUrl);
      Vue.prototype.$docs = data;
      store.dispatch("setActiveTenant");
      // Wait and then scroll to anchor
      let time = 500;
      if (window.location.pathname === "/docs/api.html") {
        time = 1000;
      }
      setTimeout(() => {
        Vue.nextTick(scrollToAnchor);
      }, time);
    } catch (error) {
      console.error("Problem fetching docs.json", error);
      setTimeout(() => {
        Vue.nextTick(scrollToAnchor);
      }, 500);
    }
  }
};

// Set the anchor for the primary "brand" link (top left)
function setPrimaryAnchor() {
  try {
    setTimeout(() => {
      const el = document.getElementsByClassName("home-link")[0];
      if (el) el.href = "/guide/";
    }, 100);
  } catch (error) {}
}

function scrollToAnchor() {
  if (window.location.hash) {
    const element = document.getElementById(window.location.hash.slice(1));

    if (element) {
      element.scrollIntoView();
    }
  }
}
