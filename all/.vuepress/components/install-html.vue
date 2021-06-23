<template>
  <ClientOnly>
    <div v-if="tenantId && modId">
      <code-block-custom
        :title="displayTitle"
        :code="fullHtml"
        language="html"
        :active="true"
      ></code-block-custom>
    </div>
  </ClientOnly>
</template>

<script>
import CodeBlockCustom from "./code-block-custom.vue";

export default {
  components: {
    CodeBlockCustom,
  },
  props: ["displayTitle"],
  computed: {
    installation() {
      return this.$store.state.installation || {};
    },
    tenantId() {
      return this.installation.tenantId;
    },
    modId() {
      return this.installation.mods[this.displayTitle];
    },
    scriptHtml() {
      if (!this.tenantId) return;
      const scr = `
  <script id="Userfront-script">
    (function(m,o,d,u,l,a,r,i,z,e) {
      u[m]={rq:[],ready:function(j){u[m].rq.push(j);},m:m,o:o,d:d,r:r};function j(s){return encodeURIComponent(btoa(s));}z=l.getElementById(m+"-"+a);r=u.location;
      e=[d+"/page/"+o+"/"+j(r.pathname)+"/"+j(r.host)+"?t="+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});u.amvartem=m;
    })("Userfront", "${this.tenantId}", "https://cdn.userfront.com/toolkit",window,document,"script");
  <\/script>`;
      return scr;
    },
    modHtml() {
      let prefix = this.displayTitle ? `<!-- ${this.displayTitle} -->\n  ` : "";
      return `
  ${prefix}<div id="userfront-${this.modId}"></div>`;
    },
    fullHtml() {
      return `<html>
<head>
${this.scriptHtml}

</head>
<body>

${this.modHtml}

</body>`;
    },
  },
};
</script>

<style lang="scss" scoped>
.installation-html {
  position: relative;
  .code {
    background: #f8f8f8;
    display: inline-block;
    padding: 1px 3px;
    margin: 0 2px;
  }
}
</style>
