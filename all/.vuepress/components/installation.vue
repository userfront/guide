<template>
  <ClientOnly>
    <div class="installation">
      <el-tabs v-model="activeName" v-loading="loading">
        <div v-if="showScriptHtml">
          <p class="text-quiet">
            Paste this script inside your HTML
            <span class="code">&lt;head&gt;</span> and above any other scripts.
          </p>
          <code-block :content="scriptHtml()" language="html"></code-block>

          <br />
        </div>

        <!-- HTML -->
        <el-tab-pane label="HTML" name="html">
          <div v-show="mod.eid">
            <p class="text-quiet">
              Paste this div inside your HTML
              <span class="code">&lt;body&gt;</span>
              wherever you want the
              {{ mod.displayTitle }} to show:
            </p>
            <code-block
              :content="modHtml(mod)"
              language="html"
              example="https://codepen.io/userfront/pen/MWyjXXq"
            ></code-block>
          </div>
        </el-tab-pane>
        <!-- /HTML -->

        <!-- React -->
        <el-tab-pane label="React" name="react">
          <p class="text-quiet">
            Install <code>@userfront/react</code> in your project:
          </p>
          <code-block :content="npmReact()" language="bash"></code-block>
          <br />
          <div v-show="mod.eid">
            <p class="text-quiet">
              Initialize Userfront and any tools you want to use, then render
              them.
            </p>
            <code-block
              :content="modReact(mod)"
              language="javascript"
              example="https://codesandbox.io/s/userfront-react-example-rhbyl"
            ></code-block>
          </div>
        </el-tab-pane>
        <!-- /React -->

        <!-- Vue -->
        <el-tab-pane label="Vue" name="vue">
          <div v-show="mod.eid">
            <p class="text-quiet">
              Add the
              <span class="code">div</span> inside your Vue app:
            </p>
            <code-block
              :content="modVueHtml(mod)"
              language="html"
              example="https://codesandbox.io/s/userfront-vue-example-hxuuw"
            ></code-block>

            <p>
              Call
              <span class="code">Userfront.render()</span> once your component
              has mounted:
            </p>
            <code-block
              :content="modVueJs()"
              language="javascript"
              example="https://codesandbox.io/s/userfront-vue-example-hxuuw"
            ></code-block>
          </div>
        </el-tab-pane>
        <!-- /Vue -->

        <!-- Angular -->
        <el-tab-pane label="Angular" name="angular">
          <div v-show="mod.eid">
            <p class="text-quiet">
              Make
              <span class="code">Userfront</span> available in your
              <span class="code">.ts</span> file:
            </p>
            <code-block
              :content="'declare var Userfront: any;'"
              example="https://codesandbox.io/s/userfront-angular-example-wrwn9?file=/src/app/app.component.ts"
              language="javascript"
            ></code-block>
            <p class="text-quiet">
              Call
              <span class="code">Userfront.render()</span> in your component:
            </p>

            <code-block
              :content="modAngular(mod)"
              language="javascript"
              example="https://codesandbox.io/s/userfront-angular-example-wrwn9?file=/src/app/app.component.ts"
            ></code-block>
          </div>
        </el-tab-pane>
        <!-- /Angular -->
      </el-tabs>
    </div>
  </ClientOnly>
</template>

<script>
import { Tabs, TabPane } from "element-ui";
import CodeBlock from "./code-block-custom.vue";

export default {
  components: {
    CodeBlock,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
  },
  props: ["mod", "loading"],
  data() {
    return {
      activeName: "html",
      html: "",
    };
  },
  computed: {
    showScriptHtml() {
      return this.activeName !== "react";
    },
    tenantEid() {
      return this.$route.params.eid;
    },
    tenant() {
      return this.$store.state.tenant.activeTenant || {};
    },
    componentTitle() {
      let title = "Form";
      if (this.mod && this.mod.displayTitle) {
        title = this.titleCase(this.mod.displayTitle);
      }
      return title;
    },
  },
  methods: {
    scriptHtml() {
      if (!this.tenantEid) return;
      const scr = `&lt;script id="Userfront-script"&gt;
  (function(m,o,d,u,l,a,r,i,z,e) {
    u[m]={rq:[],ready:function(j){u[m].rq.push(j);},m:m,o:o,d:d,r:r};function j(s){return encodeURIComponent(btoa(s));}z=l.getElementById(m+"-"+a);r=u.location;
    e=[d+"/page/"+o+"/"+j(r.pathname)+"/"+j(r.host)+"?t="+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});u.amvartem=m;
  })("Userfront", "${this.tenantEid}", "https://cdn.userfront.com/toolkit",window,document,"script");
&lt;/script&gt;`;
      return scr;
    },
    modHtml({ eid, displayTitle }) {
      let tag = `&lt;div id="userfront-${eid}"&gt;&lt;/div&gt;`;
      if (displayTitle) tag = `&lt;!-- ${displayTitle} --&gt;\n${tag}`;
      return tag;
    },
    npmReact() {
      return `npm install @userfront/react --save`;
    },
    modReact({ eid, displayTitle }) {
      const componentName = this.titleCase(displayTitle || "Form");
      return `import Userfront from "@userfront/react";

Userfront.init("${this.tenantEid}");

const ${componentName} = Userfront.build({
  toolId: "${eid}"
});

class Demo extends React.Component {
  render () {
    return &lt;${componentName} /&gt;
  }
}`;
    },
    modVueHtml({ eid, displayTitle }) {
      return `&lt;div id="app"&gt;

  &lt;!-- ${displayTitle} --&gt;
  &lt;div id="userfront-${eid}"&gt;&lt;/div&gt;

&lt;/div&gt;`;
    },
    modVueJs() {
      return `new Vue({
  el: '#app',
  mounted: function () {
    Userfront.render()
  }
})`;
    },
    modAngular({ eid }) {
      return `@Component({
  ...
  template: \`&lt;div id="userfront-${eid}"&gt;&lt;/div&gt;\`,
})
class UserfrontDemo {
  ...
  ngOnInit() {
    Userfront.render()
  }
}`;
    },
    // Add the mod key to the menu since it's outside of the mod,
    // so that the mod styling will apply to the menu too.
    addModStyling(isOpening) {
      try {
        if (!isOpening) return;
        document
          .querySelectorAll(".el-dropdown-menu.el-popper")
          .forEach((el) => {
            el.setAttribute(this.$mod.key, "");
          });
      } catch (err) {
        return;
      }
    },
    titleCase(str) {
      return str
        .replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
        .replace(/ /g, "");
    },
  },
};
</script>

<style lang="scss" scoped>
.installation {
  position: relative;
  /deep/ h2 {
    font-size: 1.5em;
  }
  .code {
    background: #f8f8f8;
    display: inline-block;
    padding: 1px 3px;
    margin: 0 2px;
  }
}
</style>
