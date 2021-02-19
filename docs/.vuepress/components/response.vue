<template>
  <div class="card">
    <h4>Response</h4>
    <pre class="response-json">{{ response }}</pre>
  </div>
</template>

<script>
import { getResponseJson, getResponseModel } from "../utils/swagger.js";

export default {
  props: ["path", "verb"],
  computed: {
    modelName() {
      return getResponseModel(this.$swagger, this.path, this.verb, "200");
    },
    response() {
      console.log(this.modelName);
      return getResponseJson(this.$swagger, this.modelName);
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
