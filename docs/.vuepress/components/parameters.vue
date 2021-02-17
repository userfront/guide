<template>
  <div>
    <h4>Parameters</h4>
    <hr />
    <div v-show="paramArray.length > 0">
      <div v-for="param in paramArray">
        <div class="param-title">
          {{ param.name }}&nbsp;
          <span class="param-required" v-if="param.required">required</span>
        </div>
        <p class="param-description">{{ param.description }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { getModelName, getParamArray } from "../utils/swagger.js";

export default {
  props: ["path", "verb"],
  computed: {
    modelName() {
      return getModelName(this.$swagger, this.path, this.verb);
    },
    paramArray() {
      return getParamArray(this.$swagger, this.modelName);
    },
  },
};
</script>

<style>
.param-title {
  font-family: monospace;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 0px;
}
.param-required {
  font-size: 13px;
  font-weight: normal;
  color: #e56f4a;
}
.param-description {
  margin-top: 4px;
}
</style>
