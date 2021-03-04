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
  props: ["path", "verb", "showOnly"],
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
        return this.$docs.paths[this.path][this.verb].parameters;
      } catch (error) {
        return [];
      }
    },
    token() {
      return this.$docs.token;
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
    // Node.js & JS
    javascriptSample() {
      const data = this.showPayload
        ? `,
  data: ${JSON.stringify(this.payload, null, "    ").replace(
    /"([^"]+)":/g,
    "$1:"
  )}`
        : "";
      return `const axios = require('axios');
      
const options = {
  headers: { 
    Accept: "*/*",
    Authorization: "Bearer ${this.token}"
  }${data}
};

axios.${this.verb}("${this.url}", options)
  .then((response) => console.log(response))
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

      return `require 'net/http'
require 'net/https'
require 'uri'
require 'json'

uri = URI.parse("${this.url}")

header = {
  'Content-Type': 'text/json',
  'Authorization': 'Bearer ${this.token}'
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
  "Content-Type": "application/json",
  "Authorization": "Bearer ${this.token}"
}${data}

response = requests.${this.verb}(url, data=data, headers=headers)

print(response.text)`;
    },
  },
};
</script>
