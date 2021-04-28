<template>
  <span>
    <slot v-if="showIn" v-bind="activeTenant"></slot>
  </span>
</template>

<script>
export default {
  computed: {
    tenantId() {
      return this.activeTenant.tenantId;
    },
    activeTenant() {
      return this.$store.state.activeTenant || {};
    },
    showIn() {
      return (
        !!this.$store.state.accessToken &&
        this.activeTenant.tenantId !== "demo1234"
      );
    },
  },
};
</script>
