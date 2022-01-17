<template>
  <div class="card">
    <h4>{{ title || "Endpoints" }}</h4>
    <br />
    <div class="endpoint-rows">
      <p v-for="endpoint in endpoints" class="endpoint-row">
        <a :href="`#${endpoint.anchor}`">
          <span :class="`endpoint-verb ${endpoint.verb}`">
            {{ endpoint.verb }}
          </span>
          {{ endpoint.path }}
        </a>
      </p>
    </div>
    <br />
  </div>
</template>

<script>
export default {
  props: ["title", "endpoints"],
};
</script>

<style lang="stylus" scoped>
.card {
  padding-right: 0;
  overflow: hidden;
}
.endpoint-rows {
  max-width: 100%;
  white-space: nowrap;
  overflow-x: auto;
}
.endpoint-row {
  font-size: 13px;
  line-height: 1.4em;
  margin: 0;
  a {
    color: #697386;
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace
    &:hover {
      color: #2a2f45;
      text-decoration: none;
    }
  }
}
.endpoint-verb {
  color: $codeGreenColor;
  display: inline-block;
  width: 50px;
  text-align: right;
  text-transform: uppercase;
  margin-right: 2px;
  &.get, &.created {
    color: $codeBlueColor;
  }
  &.delete, &.deleted {
    color: $codeOrangeColor;
  }
}
</style>
