<template>
  <!-- Adapted from https://github.com/vuejs/vuepress/blob/51277f815532fbcee5cb351217f94d19a6f44cbb/packages/%40vuepress/theme-default/global-components/CodeBlock.vue -->
  <div
    class="theme-code-block"
    :class="{ 'theme-code-block__active': active }"
    :ref="`${randomId}-${tenantId}`"
  >
    <div :class="`language-${language} extra-class`">
      <pre
        :class="`language-${language}`"
      ><code :class="`language-${language}`" v-html="highlight(code, language)"></code></pre>
    </div>
  </div>
</template>

<script>
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-python";

export default {
  name: "CodeBlock",
  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      randomId: `block-${Math.random()}`,
    };
  },
  computed: {
    tenantId() {
      return this.$store.state.activeTenant.tenantId || "demo1234";
    },
  },
  methods: {
    highlight(code, language) {
      return Prism.highlight(code, Prism.languages[language], language);
    },
  },
  mounted() {
    if (this.$parent && this.$parent.loadTabs) {
      this.$parent.loadTabs();
    } else {
      // this.active = true;
    }
  },
};
</script>

<style lang="stylus" scoped>
.theme-code-block {
  display: none;
  position: relative;
}
.theme-code-block__active {
  display: block;
}
.theme-code-block > pre {
  background-color: orange;
}
</style>
