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
    // console.log(data);
    Vue.prototype.$docs = data;
    // scrollToAnchor();
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
