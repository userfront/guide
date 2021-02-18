<template>
  <div v-show="parameters.length > 0">
    <code-group-custom>
      <code-block title="cURL">
        <div class="language-bash extra-class">
          <pre
            class="language-bash"
          ><code class="language-bash" v-html="curlSample"></code></pre>
        </div>
      </code-block>

      <code-block title="Node.js">
        <div class="language-javascript extra-class">
          <pre
            class="language-javascript"
          ><code class="language-javascript" v-html="nodeSample"></code></pre>
        </div>
      </code-block>

      <code-block title="Ruby">
        <div class="language-ruby extra-class">
          <pre
            class="language-ruby"
          ><code class="language-ruby" v-html="rubySample"></code></pre>
        </div>
      </code-block>

      <code-block title="Python">
        <div class="language-python extra-class">
          <pre
            class="language-python"
          ><code class="language-python" v-html="pythonSample"></code></pre>
        </div>
      </code-block>

      <code-block title="JavaScript">
        <div class="language-javascript extra-class">
          <pre
            class="language-javascript"
          ><code class="language-javascript" v-html="javascriptSample"></code></pre>
        </div>
      </code-block>
    </code-group-custom>
  </div>
</template>

<script>
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-python";

export default {
  props: ["path", "verb"],
  computed: {
    url() {
      return `https://api.userfront.com${this.path
        .replace("{tenantId}", this.tenantId || "demo1234")
        .replace("{userId}", this.userId || "1")}`;
    },
    uppercaseVerb() {
      return this.verb.toUpperCase();
    },
    titlecaseVerb() {
      return this.verb[0].toUpperCase() + this.verb.slice(1);
    },
    parameters() {
      try {
        return this.$swagger.paths[this.path][this.verb].parameters;
      } catch (error) {
        return [];
      }
    },
    required() {
      return this.parameters.filter((param) => param.required);
    },
    optional() {
      return this.parameters.filter((param) => !param.required);
    },
    curlSample() {
      return Prism.highlight(
        `curl --request ${this.uppercaseVerb} \\
  --url ${this.url} \\
  --header 'Accept: */*'`,
        Prism.languages.bash,
        "bash"
      );
    },
    nodeSample() {
      return Prism.highlight(
        `const options = {
  method: "${this.uppercaseVerb}",
  headers: { Accept: "*/*" },
};

fetch("${this.url}", options)
  .then((response) => console.log(response))
  .catch((err) => console.error(err));`,
        Prism.languages.javascript,
        "javascript"
      );
    },
    rubySample() {
      return Prism.highlight(
        `require 'uri'
require 'net/http'
require 'openssl'

url = URI("${this.url}")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::${this.titlecaseVerb}.new(url)
request["Accept"] = '*/*'

response = http.request(request)
puts response.read_body`,
        Prism.languages.ruby,
        "ruby"
      );
    },
    pythonSample() {
      return Prism.highlight(
        `import requests

url = "${this.url}"

headers = {
    "Accept": "*/*",
    "Content-Type": "application/json"
}

response = requests.request("${this.uppercaseVerb}", url, headers=headers)

print(response.text)`,
        Prism.languages.python,
        "python"
      );
    },
    javascriptSample() {
      return Prism.highlight(
        `const options = {
  method: '${this.uppercaseVerb}',
  headers: { Accept: '*/*', 'Content-Type': 'application/json' },
  body: 'false'
};

fetch('${this.url}', options)
  .then(response => console.log(response))
  .catch(err => console.error(err));`,
        Prism.languages.javascript,
        "javascript"
      );
    },
  },
};
</script>

<style>
/* .theme-code-block pre {
  background-color: #4f566b;
} */
</style>
