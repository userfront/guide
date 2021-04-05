import "element-ui/lib/theme-chalk/index.css";
import { Button, ButtonGroup } from "element-ui";

export default ({ router, Vue }) => {
  Vue.use(Button);
  Vue.use(ButtonGroup);
  // Render mod after each route change
  router.afterEach(() => {
    try {
      if (window.Userfront) Userfront.render();
    } catch (err) {}
  });
};
