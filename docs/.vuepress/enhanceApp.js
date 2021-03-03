import axios from "axios";

const docsJsonUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/v0/docs.json"
    : "https://api.userfront.com/v0/docs.json";

export default async ({ router, Vue }) => {
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
    Vue.prototype.$docs.token =
      "uf_test_admin_demo1234_bafb3a74471f80993d18b1914d1d1160";
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
