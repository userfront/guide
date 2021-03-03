<template>
  <div>
    <h4>Parameters</h4>
    <hr />
    <div v-show="visibleParameters.length > 0">
      <div
        v-for="param in visibleParameters"
        :key="param.name"
        :id="anchor(param.name)"
        class="param-container"
      >
        <div class="param-title">
          <a :href="`#${anchor(param.name)}`" class="param-anchor">#</a>
          {{ param.name }}&nbsp;
          <span class="param-required" v-if="param.required">required</span>
          <span class="param-optional" v-if="!param.required">optional</span>
        </div>
        <p class="param-description">{{ param.description }}</p>
        <hr />
      </div>
    </div>
    <div v-if="visibleParameters.length < 1" class="param-container">
      No parameters
    </div>
  </div>
</template>

<script>
export default {
  props: ["path", "verb", "showOnly"],
  computed: {
    parameters() {
      try {
        return this.$docs.paths[this.path][this.verb].parameters || [];
      } catch (error) {
        return [];
      }
    },
    visibleParameters() {
      try {
        if (!this.showOnly) return this.parameters;
        return this.parameters.filter((param) =>
          this.showOnly.includes(param.name)
        );
      } catch (error) {
        console.log(error);
        return this.parameters;
      }
    },
  },
  methods: {
    anchor(name) {
      return `${this.verb}-${this.path.replace(/[\/{}]/g, "")}-${name}`;
    },
  },
};
</script>

<style lang="stylus">
.param-container {
  margin-top: -60px;
  padding-top: 60px;
  position: relative;
}
.param-title {
  position: relative;
  font-family: monospace;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 0px;
  margin-left: -18px;
  padding-left: 18px;
  .param-anchor {
    position: absolute;
    left: 0px;
    top: 0px;
    font-size: 16px;
    display: none;
  }
  &:hover {
    .param-anchor {
      display: block;
    }
  }
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
