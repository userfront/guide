<template>
  <div class="card light-code">
    <h4>{{ title || "Token" }}</h4>
    <div class="language-json extra-class">
      <pre
        class="language-json"
      ><code class="language-json">{{ value }}</code></pre>
    </div>
    <el-button
      size="small"
      type="text"
      @click="showDecoded = !showDecoded"
      class="btn-decode-encode"
      >{{
        showDecoded ? "Hide decoded payload" : "Show decoded payload"
      }}</el-button
    >
    <div class="language-json extra-class" v-show="showDecoded">
      <pre
        class="language-json"
      ><code class="language-json">{{ decodedValue}}</code></pre>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "value"],
  data() {
    return {
      showDecoded: false,
    };
  },
  computed: {
    decodedValue() {
      return this.getJWTPayload(this.value);
    },
  },
  methods: {
    getJWTPayload(token) {
      try {
        const encodedPayload = token
          .split(".")[1]
          .replace("-", "+")
          .replace("_", "/");
        return JSON.parse(atob(encodedPayload));
      } catch (error) {
        console.error("Problem decoding JWT payload", error);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.card {
  position: relative;
}

.card pre {
  padding: 8px 6px;
  margin: 4px 0 40px -6px;
}

/deep/ .code-copy {
  position: absolute;
  top: auto;
  bottom: 0;
  right: 0;

  i.material-icons {
    position: relative;
    top: 0;
    right: 0;
  }
}

.btn-decode-encode {
  position: absolute;
  z-index: 3;
  top: 78px;
}
</style>
