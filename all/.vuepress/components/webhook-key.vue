<template>
  <div class="light-code">
    <div v-if="webhookKey">
      <p style="overflow-x:scroll;">
        <code style="font-weight:600;">{{ webhookKey }}</code>
      </p>
      <div class="select-container" v-if="filteredTenants.length > 1">
        <select v-model="tenant" @change="setTenant">
          <option
            v-for="tenant in filteredTenants"
            :key="tenant.tenantId"
            :value="tenant"
            >{{ tenant.name }} ({{ tenant.tenantId }})</option
          >
        </select>
      </div>
      <p>
        Your test webhook API key is included in the examples here for
        illustration purposes.
      </p>
      <div class="language-json">
        <pre><code>{
  headers: {
    authorization: "Bearer {{ webhookKey }}"
  }
}</code></pre>
      </div>
    </div>
    <div v-if="!webhookKey">
      <p>
        Each webhook will have an authorization header containing your account's
        webhook API key.
      </p>
      <p>
        Your server should read this header and verify that it matches the
        webhook API key found in your dashboard.
      </p>
      <div class="language-json">
        <pre><code>{
  headers: {
    authorization: "Bearer example3c5cc4491eb422d48c8f78c2f"
  }
}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tenant: {},
    };
  },
  computed: {
    demoToken() {
      return this.$store.state.demoToken;
    },
    webhookKey() {
      return this.$store.state.webhookKey;
    },
    tenants() {
      return this.$store.state.tenants || [];
    },
    filteredTenants() {
      return this.tenants.filter(
        (tenant) =>
          tenant.roles &&
          (tenant.roles.includes("admin") || tenant.roles.includes("member"))
      );
    },
  },
  methods: {
    setTenant() {
      this.$store.dispatch("setActiveTenant", this.tenant);
    },
  },
  watch: {
    "$store.state.activeTenant": function(newVal, oldVal) {
      this.tenant = newVal;
    },
  },
  mounted() {
    this.tenant = this.$store.state.activeTenant;
  },
};
</script>

<style lang="stylus" scoped>
.select-container {
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;
  margin: 12px 0;
  min-width: 100px;
  max-width: 180px;
  select::after, &::after {
    content: "";
    justify-self: end;
    width: 0.8em;
    height: 0.5em;
    background-color: #808080;
    transition: background-color 200ms;
    -webkit-clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
  }
}
select {
  grid-area: select;
  max-width: 160px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
  outline: none;
  color: $accentColor;
  padding: 2px 8px 2px 2px;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  font-weight: 600;
  display: grid;
  // word-wrap: nowrap;
  // white-space: pre;
  // text-overflow: ellipsis;
  z-index: 1;
}
a.action-button {
  display: inline-block;
  color: #fff;
  font-size: 1.1rem;
  background-color: $accentColor;
  padding: 4px 20px;
  border-radius: 4px;
  transition: background-color .1s ease;
  box-sizing: border-box;
  border-bottom: 1px solid darken($accentColor, 5%);
  &:hover {
    text-decoration: none;
    background-color: lighten($accentColor, 10%);
  }
}
</style>
