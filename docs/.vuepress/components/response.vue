<template>
  <div class="card">
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
import { getResponseJson, getResponseModel } from "../utils/swagger.js";

export default {
  props: ["path", "verb"],
  computed: {
    modelName() {
      return getResponseModel(this.$swagger, this.path, this.verb, "200");
    },
    response() {
      return getResponseJson(
        this.$swagger,
        this.modelName,
        "demo1234",
        "Demo project"
      );
    },
    responseSample() {
      return JSON.stringify(this.response, null, " ");
    },
  },
  methods: {
    highlight(code, language) {
      return Prism.highlight(code, Prism.languages[language], language);
    },
  },
  mounted() {
    console.log(this.$swagger);
  },
};
</script>

<style lang="stylus">
pre.response-json {
  padding: 0;
  background-color: inherit;
}
</style>
