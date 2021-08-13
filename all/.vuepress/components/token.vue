<template>
  <div class="card light-code">
    <h4>{{ title || 'Token' }}</h4>
    <div class="language-json extra-class">
      <pre
        class="language-json"
      ><code class="language-json">{{ value }}</code></pre>
    </div>
    <el-button
      size="small"
      @click="toggleValue"
      class="btn-decode-encode"
    >Decode</el-button>
  </div>
</template>

<script>
export default {
  props: ["title", "value"],
  methods: {
    toggleValue() {

    }
  }
};
</script>

<style lang="stylus" scoped>
.card {
  position: relative;
}
.card pre {
  padding: 10px 0 12px;
  margin: 0px 0 40px;
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
  bottom: 8px;
}
</style>
