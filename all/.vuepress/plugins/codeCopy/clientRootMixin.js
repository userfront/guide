import CodeCopy from "./codeCopy.vue";
import Vue from "vue";
import "./style.css";

let interval;

// Store existing instances in this array for lookup between intervals
const instances = [];

export default {
  updated() {
    this.update();
  },
  methods: {
    update() {
      clearInterval(interval);
      interval = setInterval(() => {
        const tenantId = this.$store.state.activeTenant.tenantId;
        document.querySelectorAll(selector).forEach((el) => {
          if (el.classList.contains("code-copy-added")) {
            try {
              const lookupStr = el.getAttribute("data-copy");
              const instance = instances[lookupStr];
              if (instance.tenantId === tenantId) return;
              instance.tenantId = tenantId;
              instance.code = instance.parent.innerText;
            } catch (error) {}
            return;
          }

          let ComponentClass = Vue.extend(CodeCopy);
          let instance = new ComponentClass();

          let options = {
            align: align,
            color: color,
            backgroundTransition: backgroundTransition,
            backgroundColor: backgroundColor,
            successText: successText,
            staticIcon: staticIcon,
          };
          instance.options = { ...options };

          instance.code = el.innerText;
          instance.parent = el;
          // Random string is used to lookup instance in future intervals
          const randomStr = Math.random()
            .toString(36)
            .slice(2);
          el.setAttribute("data-copy", randomStr);
          instance.tenantId = tenantId;
          instances[randomStr] = instance;
          instance.$mount();
          el.classList.add("code-copy-added");
          el.parentNode.append(instance.$el);
        });
      }, 2000);
    },
  },
};
