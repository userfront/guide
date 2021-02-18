import axios from "axios";

const swaggerUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/swagger.json"
    : "https://api.userfront.com/swagger.json";

export default async ({ router, Vue }) => {
  // Render mod after each route change
  router.afterEach(() => {
    try {
      if (window.Userfront) Userfront.render();
    } catch (err) {}
  });

  // Load the swagger spec
  try {
    const { data } = await axios.get(swaggerUrl);
    Vue.prototype.$swagger = data;
  } catch (error) {
    console.error("Problem fetching OpenAPI specification");
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
