<template>
  <div class="param-container" :id="anchor(name)">
    <div class="param-title">
      <a :href="`#${anchor(name)}`" class="param-anchor">#</a>
      {{ name }}&nbsp;
      <span class="param-required" v-if="required === true">required</span>
      <span class="param-optional" v-if="required === false">optional</span>
    </div>
    <p class="param-description">{{ description }}</p>
    <hr />
  </div>
</template>

<script>
export default {
  props: ["prefix", "name", "description", "required"],
  methods: {
    anchor(name) {
      return `${this.prefix}-${name}`;
    },
  },
};
</script>
