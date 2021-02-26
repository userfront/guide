<template>
  <div v-show="parameters.length > 0">
    <code-group-custom :verb="verb" :path="path">
      <code-block-custom title="cURL" language="bash" :code="curlSample">
      </code-block-custom>

      <code-block-custom
        title="Node.js"
        language="javascript"
        :code="nodeSample"
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
  props: ["path", "verb"],
  data() {
    return {
      copied: false,
      activeSample: "",
    };
  },
  computed: {
    url() {
      return `https://api.userfront.com${this.path.replace(
        "{userId}",
        this.userId || "1"
      )}`;
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
    curlSample() {
      return `curl --request ${this.uppercaseVerb} \\
  --url ${this.url} \\
  --header 'Accept: */*'`;
    },
    nodeSample() {
      return `const options = {
  method: "${this.uppercaseVerb}",
  headers: { 
    Accept: "*/*",
    Authorization: "Bearer "
  },
};

fetch("${this.url}", options)
  .then((response) => console.log(response))
  .catch((err) => console.error(err));`;
    },
    rubySample() {
      return `require 'uri'
require 'net/http'
require 'openssl'

url = URI("${this.url}")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::${this.titlecaseVerb}.new(url)
request["Accept"] = '*/*'

response = http.request(request)
puts response.read_body`;
    },
    pythonSample() {
      return `import requests

url = "${this.url}"

headers = {
    "Accept": "*/*",
    "Content-Type": "application/json"
}

response = requests.request("${this.uppercaseVerb}", url, headers=headers)

print(response.text)`;
    },
    javascriptSample() {
      return `const options = {
  method: '${this.uppercaseVerb}',
  headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  body: 'false'
};

fetch('${this.url}', options)
  .then(response => console.log(response))
  .catch(err => console.error(err));`;
    },
  },
};
</script>
