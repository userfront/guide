<template>
  <div v-if="activeProject.tenantId">
    <el-dropdown>
      <el-button size="medium">
        {{ activeProject.name
        }}<i class="el-icon-office-building el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" v-if="projects.length > 1">
        <el-dropdown-item
          v-for="proj in projects"
          :key="proj.tenantId"
          @click.native="setProject(proj)"
        >
          {{ proj.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  computed: {
    activeProject() {
      return this.$store.state.activeProject || {};
    },
    projects() {
      return this.$store.state.projects || [];
    },
  },
  methods: {
    setProject(project) {
      this.$store.dispatch("setActiveProject", project);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
