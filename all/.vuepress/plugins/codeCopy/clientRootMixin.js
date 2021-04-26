import CodeCopy from "./codeCopy.vue";
import Vue from "vue";
import "./style.css";

let interval;

export default {
  updated() {
    this.update();
  },
  methods: {
    update() {
      clearInterval(interval);
      interval = setInterval(() => {
        document.querySelectorAll(selector).forEach((el) => {
          if (el.classList.contains("code-copy-added")) return;
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
          instance.$mount();
          el.classList.add("code-copy-added");
          el.parentNode.append(instance.$el);
        });
      }, 3000);
    },
  },
};
