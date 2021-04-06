<template>
  <div class="card">
    <h4>Example request</h4>
    <div class="card-body">
      <label>JWT access token</label>
      <el-button-group>
        <el-button
          size="small"
          :type="isToken('none') ? 'primary' : ''"
          @click="setToken('none')"
          >No token</el-button
        >
        <el-button
          size="small"
          :type="isToken('user') ? 'primary' : ''"
          @click="setToken('user')"
          >Logged in user</el-button
        >
        <el-button
          size="small"
          :type="isToken('admin') ? 'primary' : ''"
          @click="setToken('admin')"
          >Admin user</el-button
        >
      </el-button-group>

      <label>Route</label>
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

      <label for="url-input">URL</label>
      <el-input
        id="url-input"
        type="text"
        v-model="urlInput"
        prefix-icon="el-icon-link"
      />

      <label for="url-input">JWT access token</label>
      <el-input
        id="url-input"
        type="text"
        v-model="urlInput"
        prefix-icon="el-icon-link"
      />

      <div class="language-javascript">
        <pre
          class="language-javascript"
        ><code class="language-javascript" v-html="payloadDisplay"></code></pre>
      </div>

      <el-button @click="makeRequest" type="primary">Make request</el-button>
    </div>
  </div>
</template>

<script>
import Prism from "prismjs";

export default {
  props: ["urlRoot", "tokenType", "routeName"],
  data() {
    return {
      urlInput: "",
      jwtInput: "",
      token: {},
      tokens: [
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
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token.value
            ? `Bearer ${this.token.value}`
            : undefined,
        },
      };
      return payload;
    },
    payloadDisplay() {
      const code = `fetch("${this.urlInput}", ${JSON.stringify(
        this.payload,
        null,
        2
      )});`;
      return Prism.highlight(code, Prism.languages.javascript, "javascript");
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
      Prism.highlight();
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
    setToken(type) {
      if (!type) return;
      this.tokens.map((token) => {
        if (token.type === type) {
          this.token = token;
        }
      });
    },
    isToken(type) {
      return this.token.type === type;
    },
    async makeRequest() {
      const response = await fetch(this.urlInput, this.payload);
      console.log(response);
    },
  },
  mounted() {
    this.setRouteFromName(this.routeName);
    this.setToken(this.tokenType);
  },
};
</script>

<style lang="stylus" scoped>
.card {
  margin-bottom: 20px;
  .card-body {
    padding: 20px 0;
  }
  label {
    display: block;
    margin-bottom: 4px;
  }
  .el-button-group,
  .el-input {
    margin-bottom: 12px;
  }
}
</style>
