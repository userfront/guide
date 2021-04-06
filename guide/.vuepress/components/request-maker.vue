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
            v-for="token in tokens"
            :key="`token-${token.value}`"
            size="small"
            :type="isToken(token) ? 'primary' : ''"
            @click="setToken(token)"
            >{{ token.name }}</el-button
          >
        </template>
      </el-input>

      <div class="language-javascript">
        <pre
          class="language-javascript"
        ><code class="language-javascript" v-html="payloadDisplay"></code></pre>
      </div>

      <el-button @click="makeRequest" type="primary">Make request</el-button>

      <div class="language-json" v-if="response">
        <pre
          class="language-json"
        ><code class="language-json" v-html="response"></code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";

export default {
  props: ["urlRoot", "tokenType", "routeName"],
  data() {
    return {
      urlInput: "",
      tokenInput: "",
      token: {},
      tokens: [
        {
          name: "None",
          type: "none",
          value: "",
        },
        {
          name: "Logged-in",
          type: "user",
          value:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoidGVzdCIsInRlbmFudElkIjoiZGVtbzEyMzQiLCJ1c2VySWQiOjIsInVzZXJVdWlkIjoiYTI3YzQyNDQtYjBjYy00ZWMzLWFjYzQtY2JjYzE5NTM1NDE2IiwiaXNDb25maXJtZWQiOnRydWUsImF1dGhvcml6YXRpb24iOnsiZGVtbzEyMzQiOnsidGVuYW50SWQiOiJkZW1vMTIzNCIsIm5hbWUiOiJFeGFtcGxlIHRlbmFudCIsInJvbGVzIjpbXSwicGVybWlzc2lvbnMiOltdfX0sInNlc3Npb25JZCI6ImV4YW1wbGUwLTg3MWEtMzhiYy05MThlLWNhYjgxZXhhbXBsZSIsImlhdCI6MTU5MjI5ODU1NSwiZXhwIjo5OTk5OTk5OTk5fQ.NFhDjUHc_SIh55w-yeFyVHUnh2ghe07i4Ky4aD0uoJkQPpSXfl0P9EPkjmaGf95mvWBGj5NjC5HvTfsYVfchK9g8fFUHk2iE3pNMzixGFn1ci1QIM-rxY3qCoPsaUlLSWbDxVtGK6_MNFeygPa8_6u2nQ8qVYFvHzN8-eQRoF5I",
        },
        {
          name: "Admin",
          type: "admin",
          value:
            "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoidGVzdCIsInRlbmFudElkIjoiZGVtbzEyMzQiLCJ1c2VySWQiOjEsInVzZXJVdWlkIjoiYzYyZDZhM2UtMjhiMi00NmIwLWIwN2ItMzBmOGNlM2FlMGUzIiwiaXNDb25maXJtZWQiOnRydWUsImF1dGhvcml6YXRpb24iOnsiZGVtbzEyMzQiOnsidGVuYW50SWQiOiJkZW1vMTIzNCIsIm5hbWUiOiJFeGFtcGxlIHRlbmFudCIsInJvbGVzIjpbImFkbWluIl0sInBlcm1pc3Npb25zIjpbXX19LCJzZXNzaW9uSWQiOiJleGFtcGxlNy05MjdkLTQ2YjMtOGUwMC0wNDM0OGV4YW1wbGUiLCJpYXQiOjE1OTIyOTg1NTUsImV4cCI6OTk5OTk5OTk5OX0.NJzvR_6fD8fHumQXqIjAjtNsG2d8x9UkDieU9A86BYB8p6LLTbIJ1Goeo0FkmgZLYNY9ClZEVDKdNYVERY5R-Rzp9Ka_uAaQeMR510vRb3zkzB2b_qUXbzo3d4gbK9WdKmuBHkCp51iiXQlvpRfKRR5PQvzEiEe-LkjndD0zPj8",
        },
      ],
      route: {},
      response: undefined,
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
    setToken(token) {
      if (!token) return;
      this.token = token;
      this.tokenInput = token.value;
    },
    setTokenFromType(type) {
      this.tokens.map((token) => {
        if (token.type === type) this.setToken(token);
      });
    },
    isToken(token) {
      if (!token) return;
      return token.value === this.tokenInput;
    },
    async makeRequest() {
      const response = await fetch(this.urlInput, this.payload);
      const data = await response.json();
      this.response = Prism.highlight(
        JSON.stringify(data, null, 2),
        Prism.languages.json,
        "json"
      );
    },
  },
  mounted() {
    this.setRouteFromName(this.routeName);
    this.setTokenFromType(this.tokenType);
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
