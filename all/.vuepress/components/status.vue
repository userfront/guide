<template>
  <div>
    <p>{{ status.description }}</p>

    <pre><code>{{ status }}</code></pre>
    <p>Last updated {{ updatedAt }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusJson: {},
    };
  },
  computed: {
    page() {
      return this.statusJson.page || {};
    },
    updatedAt() {
      return this.page.updated_at;
    },
    status() {
      return this.statusJson.status || {};
    },
  },
  async mounted() {
    const res = await fetch(
      "https://6l1p2zsxpnvz.statuspage.io/api/v2/summary.json"
    );
    this.statusJson = await res.json();
  },
};
</script>
