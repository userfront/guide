<template>
  <div v-show="parameters.length > 0">
    <code-group-custom>
      <template v-slot:copy="slotProps">
        <div class="copy-button" @click="copyCode(slotProps.activeTab)">
          <span class="material-icons" v-if="!copied">
            content_copy
          </span>
          <span v-if="copied">
            <span style="font-size:14px; color:#7ec699;"
              >copied
              <i class="material-icons" style="font-size:14px;">check</i>
            </span>
          </span>
        </div>
      </template>
      <code-block title="cURL">
        <div class="language-bash extra-class">
          <pre
            class="language-bash"
          ><code class="language-bash" v-html="highlight('bash', 'curl')"></code></pre>
        </div>
      </code-block>

      <code-block title="Node.js">
        <div class="language-javascript extra-class">
          <pre
            class="language-javascript"
          ><code class="language-javascript" v-html="highlight('javascript','node')"></code></pre>
        </div>
      </code-block>

      <code-block title="Ruby">
        <div class="language-ruby extra-class">
          <pre
            class="language-ruby"
          ><code class="language-ruby" v-html="highlight('ruby')"></code></pre>
        </div>
      </code-block>

      <code-block title="Python">
        <div class="language-python extra-class">
          <pre
            class="language-python"
          ><code class="language-python" v-html="highlight('python')"></code></pre>
        </div>
      </code-block>

      <code-block title="JavaScript">
        <div class="language-javascript extra-class">
          <pre
            class="language-javascript"
          ><code class="language-javascript" v-html="highlight('javascript')"></code></pre>
        </div>
      </code-block>
    </code-group-custom>

    <textarea ref="copyBox" class="code-copy-box" :value="activeSample" />
  </div>
</template>

<script>
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-python";
import { copyToClipboard } from "../utils/utils.js";

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
  headers: { Accept: "*/*" },
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
  methods: {
    highlight(language, framework) {
      return Prism.highlight(
        this[`${framework || language}Sample`],
        Prism.languages[language],
        language
      );
    },
    copyCode(tab) {
      if (!tab || !tab.title) return;
      const sampleName = `${tab.title.split(/\./)[0].toLowerCase()}Sample`;
      this.activeSample = this[sampleName];
      setTimeout(() => {
        copyToClipboard(this.$refs.copyBox);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 3000);
      }, 1);
      return;
    },
  },
};
</script>

<style lang="stylus" scoped>
.code-copy-box {
  width: 10px;
  height: 10px;
  border: none;
  position: fixed;
  right: -1000px;
  bottom: -1000px;
}
</style>
