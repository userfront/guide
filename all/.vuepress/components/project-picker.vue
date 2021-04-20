<template>
  <div id="project-picker">
    {{ projects }}
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
    filteredProjects() {
      return this.projects.filter(
        (project) =>
          project.roles &&
          (project.roles.includes("admin") || project.roles.includes("member"))
      );
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

<style lang="scss" scoped>
#project-picker {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 20;
}
</style>
