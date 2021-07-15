<template>
  <div>
    <div v-show="this.step == 1">
      <el-button
        v-for="mod in mods"
        :key="mod.pathName"
        class="btn-square"
        :type="mod.name === selectedMod.name ? 'primary' : ''"
        @click="setSelectedMod(mod)"
        plain
      >
        {{ mod.name }}
      </el-button>
    </div>
    <div v-show="this.step == 2">
      <el-button
        class="btn-square"
        :type="selectedType.pathName === 'automatic' ? 'primary' : ''"
        @click="setSelectedType(types[0])"
        plain
      >
        Ready to use
      </el-button>
      <el-button
        class="btn-square"
        :type="selectedType.pathName === 'build' ? 'primary' : ''"
        @click="setSelectedType(types[1])"
        plain
      >
        Build your own
      </el-button>
    </div>
    <div v-show="this.step == 3">
      <el-button
        v-for="tech in techs"
        :key="tech.pathName"
        class="btn-square"
        :type="tech.name === selectedTech.name ? 'primary' : ''"
        @click="setSelectedTech(tech)"
        plain
      >
        {{ tech.name }}
      </el-button>
    </div>
    <div style="min-height: 40px">
      <el-button @click="step = 1" type="text" v-if="selectedMod.name">{{
        selectedMod.name
      }}</el-button>
      <span v-if="selectedType.name">/</span>
      <el-button @click="step = 2" type="text" v-if="selectedType.name">{{
        selectedType.name
      }}</el-button>
    </div>
  </div>
</template>

<script>
import { toolkitOptions } from "../constants.js";

export default {
  data() {
    return {
      step: 1,
      types: toolkitOptions.types,
      mods: toolkitOptions.mods,
      techs: toolkitOptions.techs,
      selectedType: {},
      selectedMod: {},
      selectedTech: {},
    };
  },
  computed: {
    destinationPath() {
      return `/guide/toolkit/${this.selectedType.pathPart}-${this.selectedMod.pathPart}-${this.selectedTech.pathPart}.html`;
    },
  },
  methods: {
    setSelectedMod(mod) {
      this.selectedMod = mod;
      this.step = 2;
    },
    setSelectedType(type) {
      this.selectedType = type;
      this.step = 3;
    },
    setSelectedTech(tech) {
      this.selectedTech = tech;
      this.$router.push({ path: this.destinationPath });
    },
  },
};
</script>
