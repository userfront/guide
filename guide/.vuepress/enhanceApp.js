import "element-ui/lib/theme-chalk/index.css";
import { Button, ButtonGroup, Input } from "element-ui";

export default ({ router, Vue }) => {
  Vue.use(Button);
  Vue.use(ButtonGroup);
  Vue.use(Input);
  // Render mod after each route change
  router.afterEach(() => {
    try {
      if (window.Userfront) Userfront.render();
    } catch (err) {}
  });
};
