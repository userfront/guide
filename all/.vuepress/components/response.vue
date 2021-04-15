<template>
  <div class="card light-code">
    <h4>Response</h4>
    <div class="language-json extra-class">
      <pre
        class="language-json"
      ><code class="language-json" v-html="highlight(responseSample, 'json')"></code></pre>
    </div>
  </div>
</template>

<script>
import Prism from "prismjs";
import "prismjs/components/prism-json";

export default {
  props: ["path", "verb"],
  computed: {
    response() {
      try {
        return this.$docs.paths[this.path][this.verb].responses[200] || {};
      } catch (error) {
        return {};
      }
    },
    responseSample() {
      return JSON.stringify(this.response, null, "  ");
    },
  },
  methods: {
    highlight(code, language) {
      return Prism.highlight(code, Prism.languages[language], language);
    },
  },
};
</script>

<style lang="stylus">
.card .language-json {
  pre.response-json {
    padding: 0;
    background-color: inherit;
  }
  .token.property, .token.operator  {
    color: $codeGrayColor;
  }
  .token.string {
    color: $codeGreenColor;
  }
  .token.number, .token.boolean {
    color: $codeBlueColor;
  }
}
</style>
