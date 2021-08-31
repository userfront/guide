<template>
  <ClientOnly>
    <code>access.{{ tenantId }}</code>
  </ClientOnly>
</template>

<script>
export default {
  props: ["useAccountId"],
  computed: {
    tenant() {
      return this.$store.state.activeTenant || {};
    },
    tenantId() {
      const tenantId = this.tenant.tenantId;
      if (!tenantId) return "ACCOUNT_ID";
      if (
        this.useAccountId &&
        tenantId === this.$store.state.demoTenant.tenantId
      ) {
        return "ACCOUNT_ID";
      }
      return tenantId;
    },
  },
};
</script>
