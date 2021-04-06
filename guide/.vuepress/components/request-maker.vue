<template>
  <div class="card">
    <h4>Hello</h4>
    <br />
    <label>JWT access token</label>
    <div style="margin-bottom:12px;">
      <el-button-group>
        <el-button
          size="small"
          :type="isHeader('none') ? 'primary' : ''"
          @click="setHeader('none')"
          >No token</el-button
        >
        <el-button
          size="small"
          :type="isHeader('user') ? 'primary' : ''"
          @click="setHeader('user')"
          >Logged in user</el-button
        >
        <el-button
          size="small"
          :type="isHeader('admin') ? 'primary' : ''"
          @click="setHeader('admin')"
          >Admin user</el-button
        >
      </el-button-group>
    </div>
    <label>Route</label>
    <div style="margin-bottom:12px;">
      <el-button-group>
        <el-button
          v-for="route in routes"
          :key="`route-${route.name}`"
          size="small"
          :type="isRoute(route) ? 'primary' : ''"
          @click="setRoute(route)"
          style="font-family:monospace"
          >/{{ route.name }}</el-button
        >
      </el-button-group>
    </div>
    <label for="url-input">URL</label>
    <el-input
      id="url-input"
      type="text"
      v-model="urlInput"
      prefix-icon="el-icon-link"
    />

    <pre><code>fetch("{{ urlInput }}", {{ JSON.stringify(payload, null, 2) }})</code></pre>

    <el-button @click="makeRequest" type="primary">Make request</el-button>
  </div>
</template>

<script>
export default {
  props: ["urlRoot", "headerType", "routeName"],
  data() {
    return {
      urlInput: "",
      header: {},
      headers: [
        {
          name: "No token",
          type: "none",
          value: "",
        },
        {
          name: "Logged-in user",
          type: "user",
          value: "eyreg",
        },
        {
          name: "Admin user",
          type: "admin",
          value: "eyadmin",
        },
      ],
      route: {},
    };
  },
  computed: {
    payload() {
      const payload = {
        method: "GET",
      };
      if (this.header.value) {
        payload.headers = {
          Authorization: this.header.value,
        };
      }
      return payload;
    },
    routes() {
      return [
        { url: `${this.urlRoot}/public`, name: "public" },
        { url: `${this.urlRoot}/protected`, name: "protected" },
        { url: `${this.urlRoot}/admin`, name: "admin" },
      ];
    },
  },
  methods: {
    setRoute(route) {
      if (!route) return;
      this.route = route;
      this.urlInput = route.url;
    },
    setRouteFromName(routeName) {
      this.routes.map((route) => {
        if (route.name === routeName) this.setRoute(route);
      });
    },
    isRoute(route) {
      if (!route) return;
      return this.urlInput === route.url;
    },
    setHeader(type) {
      if (!type) return;
      this.headers.map((hv) => {
        if (hv.type === type) {
          this.header = hv;
        }
      });
    },
    isHeader(type) {
      return this.header.type === type;
    },
    async makeRequest() {
      const response = await fetch(this.urlInput, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    },
  },
  mounted() {
    // this.urlInput =
    //   (this.urlRoot || "https://api.userfront.com/v0") + "/public";
    this.setRouteFromName(this.routeName);
    this.setHeader(this.headerType);
  },
};
</script>

<style lang="stylus" scoped>
.card {
  margin-bottom: 20px;
}
</style>
