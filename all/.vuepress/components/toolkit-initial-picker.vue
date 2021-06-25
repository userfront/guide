<template>
  <div>
    <!-- Mod -->
    <el-dropdown>
      <el-button>
        {{ selectedMod.name }}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" class="toolkit-breadcrumb">
        <el-dropdown-item
          v-for="mod in mods"
          :key="mod.pathPart"
          @click.native="setSelectedMod(mod)"
        >
          {{ mod.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- /Mod -->
    <!-- Type -->
    <el-dropdown>
      <el-button>
        {{ selectedType.name }}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" class="toolkit-breadcrumb">
        <el-dropdown-item
          v-for="type in types"
          :key="type.pathPart"
          @click.native="setSelectedType(type)"
        >
          {{ type.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- /Type -->
    <!-- Tech -->
    <el-dropdown>
      <el-button>
        {{ selectedTech.name }}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown" class="toolkit-breadcrumb">
        <el-dropdown-item
          v-for="tech in techs"
          :key="tech.pathPart"
          @click.native="setSelectedTech(tech)"
        >
          {{ tech.name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- /Tech -->
    <p>
      {{ destinationPath }}
    </p>
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
      selectedType: toolkitOptions.types[0],
      selectedMod: toolkitOptions.mods[0],
      selectedTech: toolkitOptions.techs[0],
      selectedTypePathPart: toolkitOptions.types[0].pathPart,
    };
  },
  computed: {
    destinationPath() {
      return `/guide/toolkit/${this.selectedType.pathPart}-${this.selectedMod.pathPart}-${this.selectedTech.pathPart}.html`;
    },
  },
  methods: {
    setSelectedType(type) {
      this.selectedType = type;
    },
    setSelectedMod(mod) {
      this.selectedMod = mod;
    },
    setSelectedTech(tech) {
      this.selectedTech = tech;
    },
  },
};
</script>
