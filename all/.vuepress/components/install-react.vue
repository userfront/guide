<template>
  <ClientOnly>
    <div v-if="tenantId && modId">
      <code-block-custom
        :title="displayTitle"
        :code="modReact"
        language="javascript"
        :active="true"
      ></code-block-custom>
    </div>
  </ClientOnly>
</template>

<script>
import CodeBlockCustom from "./code-block-custom.vue";

export default {
  components: {
    CodeBlockCustom,
  },
  props: ["displayTitle"],
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
    npmReact() {
      return `npm install @userfront/react --save`;
    },
    modReact() {
      const componentName = this.titleCase(this.displayTitle);
      return `import React from "react";
import Userfront from "@userfront/react";

Userfront.init("${this.tenantId}");

const ${componentName} = Userfront.build({
  toolId: "${this.modId}"
});

function App() {
  return <${componentName} />;
}

export default App;`;
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
