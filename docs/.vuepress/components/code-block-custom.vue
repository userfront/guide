<template>
  <!-- Adapted from https://github.com/vuejs/vuepress/blob/51277f815532fbcee5cb351217f94d19a6f44cbb/packages/%40vuepress/theme-default/global-components/CodeBlock.vue -->
  <div class="theme-code-block" :class="{ 'theme-code-block__active': active }">
    <div class="theme-code-copy-button" @click="copyCode()">
      <span class="material-icons" v-if="!copied">
        content_copy
      </span>
      <span v-if="copied">
        <span style="font-size:14px; color:#7ec699;"
          >copied
          <i class="material-icons" style="font-size:14px;margin-right: -4px"
            >check</i
          >
        </span>
      </span>
    </div>

    <div :class="`language-${language} extra-class`">
      <pre
        :class="`language-${language}`"
      ><code :class="`language-${language}`" v-html="highlight(code, language)"></code></pre>
    </div>

    <textarea ref="copyBox" class="theme-code-copy-box" :value="code" />
  </div>
</template>

<script>
import Prism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-python";
import utils from "../utils/utils.js";

export default {
  name: "CodeBlock",
  props: {
    title: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      copied: false,
    };
  },
  methods: {
    highlight(code, language) {
      return Prism.highlight(code, Prism.languages[language], language);
    },
    copyCode() {
      setTimeout(() => {
        utils.copyToClipboard(this.$refs.copyBox);
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 3000);
      }, 1);
      return;
    },
  },
  mounted() {
    if (this.$parent && this.$parent.loadTabs) {
      this.$parent.loadTabs();
    }
  },
};
</script>

<style lang="stylus" scoped>
.theme-code-block {
  display: none;
  position: relative;
}
.theme-code-block__active {
  display: block;
}
.theme-code-block > pre {
  background-color: orange;
}
.theme-code-copy-button {
  position: absolute;
  top: 6px;
  right: 24px;
  z-index: 2;
  span {
    font-size: 20px;
    padding: 2px 8px;
    cursor: pointer;
    color: gray;
    transition: color 200ms;
    user-select: none;
    &:hover {
      color: white;
    }
  }
}
.theme-code-copy-box {
  width: 10px;
  height: 10px;
  border: none;
  position: fixed;
  right: -1000px;
  bottom: -1000px;
}
</style>
