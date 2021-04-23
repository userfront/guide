<template>
  <div id="top-right">
    <project-picker v-if="isLoggedIn"></project-picker>

    <div v-show="!isLoggedIn">
      <el-link type="primary" href="/signup" target="_blank"
        >Create account</el-link
      >&nbsp;&nbsp;
      <a class="el-button el-button--default el-button--small" :href="loginPath"
        >Log in</a
      >
    </div>
  </div>
</template>

<script>
import ProjectPicker from "./project-picker.vue";

export default {
  computed: {
    isLoggedIn() {
      return !!this.$store.state.accessToken;
    },
    activeProject() {
      return this.$store.state.activeProject || {};
    },
    loginPath() {
      return `/login?redirect=${this.$route.path}`;
    },
  },
  components: {
    ProjectPicker,
  },
};
</script>

<style lang="scss" scoped>
#top-right {
  position: fixed;
  top: 12px;
  right: 24px;
  z-index: 20;
  .el-button--small {
    font-size: 13px;
    padding: 8px 12px;
    font-weight: bold;
  }
}
</style>
