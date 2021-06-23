<template>
  <iframe
    v-if="tenantId && modId"
    :src="`https://test-${tenantId}.userfront.dev/iframe/${modId}`"
    frameborder="0"
    style="width:100%;min-height:500px;border:1px solid #eee; margin-top:10px;"
  ></iframe>
</template>

<script>
export default {
  props: ["displayTitle"],
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
