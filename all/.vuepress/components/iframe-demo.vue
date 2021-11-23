<template>
  <iframe
    v-if="tenantId && modId"
    :src="`https://test-${tenantId}.demo.userfront.dev/iframe/${modId}`"
    frameborder="0"
    style="width:100%;border:1px solid #eee; margin-top:10px;"
    :style="`min-height: ${height ? height : 500}px`"
  ></iframe>
</template>

<script>
export default {
  props: ["displayTitle", "height"],
  computed: {
    tenantId() {
      return this.$store.state.installation.tenantId;
    },
    modId() {
      return this.$store.state.installation.mods[this.displayTitle];
    },
  },
};
</script>
