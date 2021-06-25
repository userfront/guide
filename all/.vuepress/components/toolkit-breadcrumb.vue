<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>
        <RouterLink :to="{ path: '/guide/toolkit' }">
          Toolkit
        </RouterLink>
      </el-breadcrumb-item>
      <!-- Type -->
      <el-breadcrumb-item>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ currentType }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" class="toolkit-breadcrumb">
            <el-dropdown-item v-for="type in types" :key="type.pathPart">
              <RouterLink :to="{ path: buildPath('type', type.pathPart) }">
                {{ type.name }}
              </RouterLink>
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
          <el-dropdown-menu slot="dropdown" class="toolkit-breadcrumb">
            <el-dropdown-item v-for="mod in mods" :key="mod.pathPart">
              <RouterLink :to="{ path: buildPath('mod', mod.pathPart) }">
                {{ mod.name }}
              </RouterLink>
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
          <el-dropdown-menu slot="dropdown" class="toolkit-breadcrumb">
            <el-dropdown-item v-for="tech in techs" :key="tech.pathPart">
              <RouterLink :to="{ path: buildPath('tech', tech.pathPart) }">
                {{ tech.name }}
              </RouterLink>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-breadcrumb-item>
      <!-- /Tech -->
    </el-breadcrumb>
  </div>
</template>

<script>
import { toolkitOptions } from "../constants.js";

export default {
  data() {
    return {
      types: toolkitOptions.types,
      mods: toolkitOptions.mods,
      techs: toolkitOptions.techs,
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
    currentPathParts() {
      let parts = this.$route.path.split("toolkit/")[1].split("-");
      // First element is type, last is tech, middle is mod
      const type = parts.shift();
      const tech = parts.pop().replace(".html", "");
      const mod = parts.join("-");
      return {
        type,
        tech,
        mod,
      };
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
    // Build the path to a different section
    buildPath(category, pathPart) {
      let basePath = this.$route.path.split("/");
      basePath.pop();
      basePath = basePath.join("/");
      const parts = JSON.parse(JSON.stringify(this.currentPathParts));
      parts[category] = pathPart;
      return `${basePath}/${parts.type}-${parts.mod}-${parts.tech}.html`;
    },
  },
};
</script>

<style lang="scss">
@import "../styles/_variables.scss";
.toolkit-breadcrumb .router-link-active {
  color: $default-color;
}
</style>
