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

const docsClientJsonUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/v0/docs-client.json"
    : "https://api.userfront.com/v0/docs-client.json";

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

  const pathsWithDocsClient = ["/docs/api-client.html", "/docs/js.html"];

  if (!isServer) {
    router.beforeEach(async (to, from, next) => {
      // Load the API docs.json if needed
      if (to.path === "/docs/api.html" && !Vue.prototype.$docs) {
        const { data } = await axios.get(docsJsonUrl);
        Vue.prototype.$docs = data;
        store.dispatch("setActiveTenant");
      }

      // Load the API docs-client.json if needed
      if (pathsWithDocsClient.includes(to.path) && !Vue.prototype.$docsClient) {
        const { data } = await axios.get(docsClientJsonUrl);
        Vue.prototype.$docsClient = data;
      }

      // Update the brand link
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

    // Wait and then scroll to anchor
    let time = 500;
    if (window.location.pathname.indexOf("/docs/api") > -1) {
      time = 1000;
    }
    setTimeout(() => {
      Vue.nextTick(scrollToAnchor);
    }, time);
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
  try {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));

      if (element) {
        element.scrollIntoView();
      }
    }
  } catch (error) {
    console.log("Problem scrolling: ", error);
  }
}
