<template>
  <div>
    <div v-if="projectToken">
      <p style="overflow-x:scroll;">
        <code style="font-weight:600;">{{ projectToken }}</code>
      </p>
      <div class="select-container" v-if="projects.length > 1">
        <select v-model="project" @change="setProject">
          <option
            v-for="project in projects"
            :key="project.tenantId"
            :value="project"
            >{{ project.name }} ({{ project.tenantId }})</option
          >
        </select>
      </div>
      <p>
        Your test API key is included in all the examples here, so you can test
        the code samples right away.
      </p>
      <p>
        In general, you should include your API key in the header of requests:
      </p>
      <div class="language-json">
        <pre><code>{
  headers: {
    authorization: "Bearer {{ projectToken }}"
  }
}</code></pre>
      </div>
    </div>
    <div v-if="!projectToken">
      <p>
        A sample test API key is included in all the examples here, so you can
        test any example right away.
      </p>
      <p>
        To test requests using your account, replace the sample API key with
        your actual API key or sign in.
      </p>
      <p>
        <a
          class="action-button"
          href="https://userfront.com/login?redirect=/docs/api"
          >Sign in</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      project: {},
    };
  },
  computed: {
    demoToken() {
      return this.$demoToken;
    },
    projectToken() {
      return this.$store.state.projectToken;
    },
    projects() {
      return this.$store.state.projects || [];
    },
  },
  methods: {
    setProject() {
      this.$store.dispatch("setActiveProject", this.project);
    },
  },
  watch: {
    "$store.state.activeProject": function(newVal, oldVal) {
      this.project = newVal;
    },
  },
  mounted() {
    this.project = this.$store.state.activeProject;
  },
};
</script>

<style lang="stylus" scoped>
.select-container {
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;
  margin: 12px 0;
  min-width: 100px;
  max-width: 180px;
  select::after, &::after {
    content: "";
    justify-self: end;
    width: 0.8em;
    height: 0.5em;
    background-color: #808080;
    transition: background-color 200ms;
    -webkit-clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
    grid-area: select;
  }
}
select {
  grid-area: select;
  max-width: 160px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: none;
  outline: none;
  color: $accentColor;
  padding: 2px 8px 2px 2px;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  font-weight: 600;
  display: grid;
  // word-wrap: nowrap;
  // white-space: pre;
  // text-overflow: ellipsis;
  z-index: 1;
}
a.action-button {
  display: inline-block;
  color: #fff;
  font-size: 1.1rem;
  background-color: $accentColor;
  padding: 4px 20px;
  border-radius: 4px;
  transition: background-color .1s ease;
  box-sizing: border-box;
  border-bottom: 1px solid darken($accentColor, 5%);
  &:hover {
    text-decoration: none;
    background-color: lighten($accentColor, 10%);
  }
}
</style>
