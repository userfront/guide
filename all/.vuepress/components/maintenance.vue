<template>
  <div>
    <pre><code>{{ maintenances }}</code></pre>
    <p>Last updated {{ updatedAt }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maintenanceJson: {},
    };
  },
  computed: {
    page() {
      return this.maintenanceJson.page || {};
    },
    updatedAt() {
      return this.page.updated_at;
    },
    maintenances() {
      return this.maintenanceJson.scheduled_maintenances || [];
    },
  },
  async mounted() {
    const res = await fetch(
      "https://6l1p2zsxpnvz.statuspage.io/api/v2/summary.json"
    );
    this.maintenanceJson = await res.json();
  },
};
</script>
