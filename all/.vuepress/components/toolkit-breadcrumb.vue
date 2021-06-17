<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">Toolkit</el-breadcrumb-item>
      <!-- Type -->
      <el-breadcrumb-item>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ currentType }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="type in types" :key="type.pathPart">
              {{ type.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-breadcrumb-item>
      <!-- /Type -->
      <!-- Mod -->
      <el-breadcrumb-item>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ currentMod }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="mod in mods" :key="mod.pathPart">
              {{ mod.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-breadcrumb-item>
      <!-- /Mod -->
      <!-- Tech -->
      <el-breadcrumb-item>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ currentTech }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="tech in techs" :key="tech.pathPart">
              {{ tech.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-breadcrumb-item>
      <!-- /Tech -->
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: [
        { name: "Automatic", pathPart: "automatic" },
        { name: "Build your own", pathPart: "build" },
      ],
      mods: [
        { name: "Signup form", pathPart: "signup-form" },
        { name: "Login form", pathPart: "login-form" },
        { name: "Password reset", pathPart: "password-reset-form" },
        { name: "Logout button", pathPart: "logout-button" },
      ],
      techs: [
        { name: "HTML", pathPart: "html" },
        { name: "React", pathPart: "react" },
        { name: "Vue", pathPart: "vue" },
        { name: "Angular", pathPart: "angular" },
      ],
    };
  },
  computed: {
    currentType() {
      return this.getCurrentName(this.types);
    },
    currentMod() {
      return this.getCurrentName(this.mods);
    },
    currentTech() {
      return this.getCurrentName(this.techs);
    },
  },
  methods: {
    // Return element.name from the array with a pathPart in the path
    getCurrentName(arr) {
      let name;
      arr.map((item) => {
        if (this.$route.path.includes(item.pathPart)) {
          name = item.name;
        }
      });
      return name;
    },
  },
  mounted() {
    console.log(this.$route.path);
  },
};
</script>
