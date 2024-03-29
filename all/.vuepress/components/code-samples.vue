<template>
  <div>
    <code-group-custom :verb="verb" :path="path">
      <code-block-custom title="cURL" language="bash" :code="curlSample">
      </code-block-custom>

      <code-block-custom
        title="Node.js"
        language="javascript"
        :code="javascriptSample"
      >
      </code-block-custom>

      <code-block-custom title="Ruby" language="ruby" :code="rubySample">
      </code-block-custom>

      <code-block-custom title="Python" language="python" :code="pythonSample">
      </code-block-custom>

      <code-block-custom
        title="JavaScript"
        language="javascript"
        :code="javascriptSample"
      >
      </code-block-custom>
    </code-group-custom>
  </div>
</template>

<script>
export default {
  props: ["path", "verb", "showOnly", "tokenType", "noAuthorization"],
  computed: {
    url() {
      return `https://api.userfront.com${this.path
        .replace("{userId}", this.userId || "1")
        .replace("{tenantId}", this.tenantId || "demo1234")
        .replace("{type}", "admin")}`;
    },
    uppercaseVerb() {
      return this.verb.toUpperCase();
    },
    titlecaseVerb() {
      return this.verb[0].toUpperCase() + this.verb.slice(1);
    },
    parameters() {
      try {
        return this.$docs.paths[this.path][this.verb].parameters;
      } catch (error) {
        return [];
      }
    },
    token() {
      if (this.tokenType === "jwt") return `user_jwt_access_token`;
      return this.$store.state.tenantKey || this.$store.state.demoKey;
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
      return (
        this.verb === "post" ||
        this.verb === "put" ||
        (this.verb === "delete" && this.parameters.length > 0)
      );
    },

    // cUrl
    curlSample() {
      const data = this.showPayload
        ? `\\
  --data '${JSON.stringify(this.payload)}'`
        : "";

      let curl = `curl --request ${this.uppercaseVerb} \\
  --url ${this.url} \\
  --header 'Accept: */*' \\
  --header 'Content-Type: application/json'`;

      if (!this.noAuthorization) {
        curl += ` \\
  --header 'Authorization: Bearer ${this.token}' ${data}`;
      }

      return curl;
    },

    // Node.js & JS
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

      const authorization = this.noAuthorization
        ? ""
        : `,
    Authorization: "Bearer ${this.token}"`;

      return `const axios = require('axios');
      
const options = {
  headers: { 
    Accept: "*/*"${authorization}
  }
};
${payloadDefinition}
axios.${this.verb}("${this.url}", ${this.showPayload ? "payload, " : ""}options)
  .then((response) => console.log(response.data))
  .catch((err) => console.error(err));`;
    },

    // Ruby
    rubySample() {
      const data = this.showPayload
        ? `
data = ${JSON.stringify(this.payload, null, "  ").replace(
            /"([^"]+)":/g,
            "$1:"
          )}`
        : "";

      const authorization = this.noAuthorization
        ? ""
        : `,
  'Authorization': 'Bearer ${this.token}'`;

      return `require 'net/http'
require 'net/https'
require 'uri'
require 'json'

uri = URI.parse("${this.url}")

header = {
  'Content-Type': 'text/json'${authorization}
}${data}

https = Net::HTTP.new(uri.host, uri.port)
https.use_ssl = true
request = Net::HTTP::${this.titlecaseVerb}.new(uri.request_uri, header)
${
  !!data
    ? `request.body = data.to_json
`
    : ""
}
response = https.request(request)
puts response.read_body`;
    },
    // Python
    pythonSample() {
      const authorization = this.noAuthorization
        ? ""
        : `,
  "Authorization": "Bearer ${this.token}"`;

      const data = this.showPayload
        ? `

data = ${JSON.stringify(this.payload, null, "  ").replace(
            /"([^"]+)":/g,
            "$1:"
          )}`
        : "";
      return `import requests

url = "${this.url}"

headers = {
  "Accept": "*/*",
  "Content-Type": "application/json"${authorization}
}${data}

response = requests.${this.verb}(url, data=data, headers=headers)

print(response.text)`;
    },
  },
};
</script>
