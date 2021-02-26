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
    } catch (err) {}
  });

  // Load the docs.json spec
  try {
    const { data } = await axios.get(docsJsonUrl);
    Vue.prototype.$docs = data;
  } catch (error) {
    console.error("Problem fetching docs.json");
    console.error(error);
  }

  // Scroll to an anchor on initial pageload
  setTimeout(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));

      if (element) {
        element.scrollIntoView();
      }
    }
  }, 100);
};
