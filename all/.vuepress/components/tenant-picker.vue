<template>
  <div v-if="activeTenant.tenantId">
    <el-dropdown>
      <el-button size="medium">
        {{ activeTenant.name
        }}<i class="el-icon-office-building el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" v-if="tenants.length > 1">
        <el-dropdown-item
          v-for="tenant in tenants"
          :key="tenant.tenantId"
          @click.native="setTenant(tenant)"
        >
          {{ tenant.name }}
        </el-dropdown-item>
        <hr />
        <el-dropdown-item @click.native="setDemoTenantActive()">
          Demo account
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  computed: {
    activeTenant() {
      return this.$store.state.activeTenant || {};
    },
    tenants() {
      return this.$store.state.tenants || [];
    },
    setDemoTenantActive() {
      return this.setTenant(this.$store.state.demoTenant);
    },
  },
  methods: {
    setTenant(tenant) {
      this.$store.dispatch("setActiveTenant", tenant);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
