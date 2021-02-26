<template>
  <div>
    <h4>Parameters</h4>
    <hr />
    <div v-show="parameters.length > 0">
      <div v-for="param in parameters" :key="param.name">
        <div class="param-title">
          {{ param.name }}&nbsp;
          <span class="param-required" v-if="param.required">required</span>
          <span class="param-optional" v-if="!param.required">optional</span>
        </div>
        <p class="param-description">{{ param.description }}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { getParamModel, getParamArray } from "../utils/docs.js";

export default {
  props: ["path", "verb"],
  computed: {
    parameters() {
      try {
        return this.$docs.paths[this.path][this.verb].parameters || [];
      } catch (error) {
        return [];
      }
    },
  },
};
</script>

<style lang="stylus">
.param-title {
  font-family: monospace;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 0px;
}
.param-required,
.param-optional {
  font-size: 13px;
  font-weight: normal;
  font-family: Arial, Helvetica, sans-serif;
}
.param-required {
  color: $codeOrangeColor;
}
.param-optional {
  color: $lightGrayColor;
}
.param-description {
  margin-top: 4px;
}
</style>
