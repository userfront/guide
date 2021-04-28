<template>
  <div>
    <slot name="in" v-if="showIn"></slot>
    <slot name="out" v-if="!showIn"></slot>
  </div>
</template>

<script>
export default {
  computed: {
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
