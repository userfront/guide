<template>
  <div>
    <code-group-custom :verb="verb" :path="path">
      <code-block-custom
        title="JavaScript"
        language="javascript"
        :code="fetchSample"
      >
      </code-block-custom>
      <code-block-custom
        title="JavaScript (axios)"
        language="javascript"
        :code="javascriptSample"
      >
      </code-block-custom>

      <code-block-custom title="cURL" language="bash" :code="curlSample">
      </code-block-custom>
    </code-group-custom>
  </div>
</template>

<script>
export default {
  props: ["path", "verb", "showOnly", "showAccessToken"],
  computed: {
    url() {
      return `https://api.userfront.com${this.path
        .replace("{userId}", this.userId || "1")
        .replace("{tenantId}", this.tenantId || "demo1234")}`;
    },
    uppercaseVerb() {
      return this.verb.toUpperCase();
    },
    titlecaseVerb() {
      return this.verb[0].toUpperCase() + this.verb.slice(1);
    },
    parameters() {
      try {
        return this.$docsClient.paths[this.path][this.verb].parameters;
      } catch (error) {
        return [];
      }
    },
    token() {
      return `{User JWT access token}`;
    },
    payload() {
      const p = {};
      this.parameters.map((param) => {
        if (this.showOnly && !this.showOnly.includes(param.name)) return;
        p[param.name] = param.examples[0];
      });
      return p;
    },
    showPayload() {
      return this.verb === "post" || this.verb === "put";
    },

    // cUrl
    curlSample() {
      const data = this.showPayload
        ? `\\
  --data '${JSON.stringify(this.payload)}'`
        : "";

      return `curl --request ${this.uppercaseVerb} \\
  --url ${this.url} \\
  --header 'Accept: */*' \\
  --header 'Content-Type: application/json' \\
  --header 'Authorization: Bearer ${this.token}' ${data}`;
    },

    fetchSample() {
      const data = this.showPayload
        ? `${JSON.stringify(this.payload, null, "  ").replace(
            /"([^"]+)":/g,
            "$1:"
          )}`
        : "";

      const payloadJs = this.showPayload
        ? `const payload = ${data};

`
        : "";

      const accessTokenJS = this.showAccessToken
        ? `,
    Authorization: "Bearer ${this.token}"`
        : "";

      const bodyJs = this.showPayload
        ? `,
  body: JSON.stringify(payload)`
        : ``;

      return `${payloadJs}const response = await fetch("${this.url}", {
  method: "${this.verb.toUpperCase()}",
  headers: {
    "Content-Type": "application/json"${accessTokenJS}
  }${bodyJs}
});

console.log(response.json());`;
    },

    // JS
    javascriptSample() {
      const data = this.showPayload
        ? `${JSON.stringify(this.payload, null, "  ").replace(
            /"([^"]+)":/g,
            "$1:"
          )}`
        : "";

      const payloadDefinition = this.showPayload
        ? `
const payload = ${data};
`
        : "";
      return `const axios = require('axios');
      
const options = {
  headers: { 
    Accept: "*/*",
    Authorization: "Bearer ${this.token}"
  }
};
${payloadDefinition}
axios.${this.verb}("${this.url}", ${this.showPayload ? "payload, " : ""}options)
  .then((response) => console.log(response.data))
  .catch((err) => console.error(err));`;
    },
  },
};
</script>
