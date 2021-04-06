<template>
  <div class="card">
    <h4>Example request</h4>
    <div class="card-body">
      <label for="url-input">URL</label>
      <el-input
        id="url-input"
        type="text"
        v-model="urlInput"
        prefix-icon="el-icon-link"
      >
        <template slot="append">
          <el-button
            v-for="route in routes"
            :key="`route-${route.name}`"
            size="small"
            :type="isRoute(route) ? 'primary' : ''"
            @click="setRoute(route)"
            >{{ route.name }}</el-button
          >
        </template>
      </el-input>

      <label for="token-input">JWT access token</label>
      <el-input
        id="token-input"
        type="text"
        v-model="tokenInput"
        prefix-icon="el-icon-user"
        placeholder="none"
      >
        <template slot="append">
          <el-button
            size="small"
            :type="isToken('none') ? 'primary' : ''"
            @click="setToken('none')"
            >None</el-button
          >
          <el-button
            size="small"
            :type="isToken('user') ? 'primary' : ''"
            @click="setToken('user')"
            >Logged in</el-button
          >
          <el-button
            size="small"
            :type="isToken('admin') ? 'primary' : ''"
            @click="setToken('admin')"
            >Admin</el-button
          >
        </template>
      </el-input>

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
import "prismjs/components/prism-javascript";

export default {
  props: ["urlRoot", "tokenType", "routeName"],
  data() {
    return {
      urlInput: "",
      tokenInput: "",
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
      try {
        const payload = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: this.tokenInput
              ? `Bearer ${this.tokenInput}`
              : undefined,
          },
        };
        return payload;
      } catch (error) {
        return {};
      }
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
        { url: `${this.urlRoot}/public`, name: "Public" },
        { url: `${this.urlRoot}/protected`, name: "Protected" },
        { url: `${this.urlRoot}/admin`, name: "Admin" },
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
    setToken(type) {
      if (!type) return;
      this.tokens.map((token) => {
        if (token.type === type) {
          this.token = token;
          this.tokenInput = token.value;
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
    console.log(this.tokenType);
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
    .el-button.el-button--primary {
      color: white;
      background-color: #409EFF;
    }
    /deep/ .el-input-group__append {
      min-width: 180px;
      padding-left: 22px;
    }
  }
}
</style>
