import Vuex from "vuex";
import store from "./utils/store.js";
import axios from "axios";

const docsJsonUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/v0/docs.json"
    : "https://api.userfront.com/v0/docs.json";

export default async ({ router, Vue }) => {
  // Add vuex
  Vue.use(Vuex);
  Vue.mixin({ store });

  // Render mod after each route change
  router.afterEach(() => {
    try {
      if (window.Userfront) Userfront.render();
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

  function scrollToAnchor() {
    setTimeout(() => {
      if (window.location.hash) {
        const element = document.getElementById(window.location.hash.slice(1));

        if (element) {
          element.scrollIntoView();
        }
      }
    }, 500);
  }
};
