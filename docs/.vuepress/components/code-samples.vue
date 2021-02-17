<template>
  <div v-show="parameters.length > 0">
    <code-group>
      <code-block title="cURL">
        <div class="language-bash extra-class">
          <pre
            class="language-bash"
          ><code class="language-bash" v-html="curlSample"></code></pre>
        </div>
      </code-block>
      <code-block title="Node">
        ```js Some node code ```
      </code-block>

      <code-block title="PHP">
        ```php Some PHP code ```
      </code-block>
    </code-group>
  </div>
</template>

<script>
import Prism from "prismjs";
import "prismjs/components/prism-bash";

export default {
  props: ["path", "verb"],
  computed: {
    substitutedPath() {
      return this.path
        .replace("{tenantId}", this.tenantId || "demo1234")
        .replace("{userId}", this.userId || "1");
    },
    parameters() {
      try {
        return this.$swagger.paths[this.path][this.verb].parameters;
      } catch (error) {
        return [];
      }
    },
    required() {
      return this.parameters.filter((param) => param.required);
    },
    optional() {
      return this.parameters.filter((param) => !param.required);
    },
    curlSample() {
      return Prism.highlight(
        `curl --request ${this.verb.toUpperCase()} \ 
  --url https://api.userfront.com${this.substitutedPath} \ 
  --header 'Accept: */*'`,
        Prism.languages.bash,
        "bash"
      );
    },
  },
};
</script>

<style>
/* .theme-code-block pre {
  background-color: #4f566b;
} */
</style>
