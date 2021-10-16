<template>
  <div>
    <h4>Parameters</h4>
    <hr />
    <div v-show="visibleParameters.length > 0">
      <parameter
        v-for="param in visibleParameters"
        :key="param.name"
        :prefix="prefix"
        :name="param.name"
        :description="param.description"
        :required="!!param.required"
      ></parameter>
    </div>
    <div v-if="visibleParameters.length < 1" class="param-container">
      No parameters
    </div>
  </div>
</template>

<script>
export default {
  props: ["path", "verb", "showOnly", "source"],
  computed: {
    prefix() {
      return `${this.verb}-${this.path.replace(/[\/{}]/g, "")}`;
    },
    parameters() {
      try {
        const source = this.source || "$docs";
        return this[source].paths[this.path][this.verb].parameters || [];
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
