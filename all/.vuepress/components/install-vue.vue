<template>
  <ClientOnly>
    <div v-if="tenantId && modId">
      <div v-if="showMainJs">
        <code-block-custom
          :title="displayTitle"
          :code="mainJs"
          language="javascript"
          :active="true"
        ></code-block-custom>
        <br />
      </div>

      <div v-if="showAppVue">
        <code-block-custom
          :title="displayTitle"
          :code="appVue"
          language="html"
          :active="true"
        ></code-block-custom>
      </div>
    </div>
  </ClientOnly>
</template>

<script>
import CodeBlockCustom from "./code-block-custom.vue";

export default {
  components: {
    CodeBlockCustom,
  },
  props: ["displayTitle", "file"],
  computed: {
    installation() {
      return this.$store.state.installation || {};
    },
    tenantId() {
      return this.installation.tenantId;
    },
    modId() {
      return this.installation.mods[this.displayTitle];
    },
    showMainJs() {
      return !this.file || this.file === "main.js";
    },
    showAppVue() {
      return !this.file || this.file === "App.vue";
    },
    mainJs() {
      return `// main.js

import Vue from "vue";
import Userfront from "@userfront/vue";
import App from "./App.vue";

Userfront.init("${this.tenantId}");

new Vue({
  render: (h) => h(App)
}).$mount("#app");`;
    },
    appVue() {
      const componentName = this.titleCase(this.displayTitle);
      const elementName = this.displayTitle
        .toLowerCase()
        .split(" ")
        .join("-");
      return `<!-- App.vue -->

<template>
  <div id="app">
    <${elementName} tool-id="${this.modId}" />
  </div>
</template>

<script>
import { ${componentName} } from "@userfront/vue";

export default {
  name: "App",
  components: {
    ${componentName},
  },
};
<\/script>

<style>
#app {
  text-align: center;
}
</style>`;
    },
  },
  methods: {
    titleCase(str) {
      return str
        .replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
        .replace(/ /g, "");
    },
  },
};
</script>
