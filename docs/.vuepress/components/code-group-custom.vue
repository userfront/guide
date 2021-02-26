<template>
  <!-- Adapted from https://github.com/vuejs/vuepress/blob/master/packages/@vuepress/theme-default/global-components/CodeGroup.vue -->
  <ClientOnly>
    <div class="theme-code-group">
      <div class="theme-code-group__overnav" v-if="verb && path">
        <span class="overnav-verb">{{ verb }}</span>
        <span class="overnav-path">{{
          path.replace(/{/g, ":").replace(/}/g, "")
        }}</span>
      </div>
      <div class="theme-code-group__nav">
        <div class="theme-code-group__select">
          <select v-model="activeCodeTabIndex">
            <option v-for="(tab, i) in codeTabs" :key="tab.title" :value="i">{{
              tab.title
            }}</option>
          </select>
        </div>
      </div>
      <slot />
    </div>
  </ClientOnly>
</template>

<script>
export default {
  name: "CodeGroupCustom",
  props: ["path", "verb"],
  data() {
    return {
      codeTabs: [],
      activeCodeTabIndex: 0,
      activeTab: undefined,
    };
  },
  watch: {
    activeCodeTabIndex(index) {
      this.activateCodeTab(index);
    },
  },
  mounted() {
    this.loadTabs();
  },
  methods: {
    changeCodeTab(index) {
      this.activeCodeTabIndex = index;
    },
    loadTabs() {
      this.codeTabs = (this.$slots.default || [])
        .filter((slot) => Boolean(slot.componentOptions))
        .map((slot, index) => {
          if (slot.componentOptions.propsData.active === "") {
            this.activeCodeTabIndex = index;
          }

          return {
            title: slot.componentOptions.propsData.title,
            elm: slot.elm,
          };
        });

      if (this.activeCodeTabIndex === -1 && this.codeTabs.length > 0) {
        this.activeCodeTabIndex = 0;
      }

      this.activateCodeTab(0);
    },
    activateCodeTab(index) {
      this.codeTabs.forEach((tab) => {
        if (tab.elm) {
          tab.elm.classList.remove("theme-code-block__active");
        }
      });

      if (this.codeTabs[index].elm) {
        this.codeTabs[index].elm.classList.add("theme-code-block__active");
      }
      this.activeTab = this.codeTabs[index];
    },
  },
};
</script>

<style lang="stylus" scoped>
select {
  appearance: none;
  background-color: transparent;
  border: none;
  outline: none;
  padding: 2px 8px 2px 2px;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  cursor: pointer;
  line-height: inherit;
  color: white;
  font-weight: 600;
  display: grid;
  z-index: 1;
  &::-ms-expand {
    display: none;
  }
}
.theme-code-group__select {
  display: grid;
  grid-template-areas: "select";
  align-items: center;
  position: relative;
  margin-bottom: 8px;
  select,&::after {
    grid-area: select;
  }
  min-width: 100px;
  max-width: 100px;
  &::after {
    content: "";
    justify-self: end;
    width: 0.8em;
    height: 0.5em;
    background-color: gray;
    transition: background-color 200ms;
    clip-path: polygon(100% 0%, 0 0%, 50% 100%);
  }
  &:hover {
    &::after {
      background-color: white;
    }
  }
}
.theme-code-group__overnav {
  background-color: $codeBgColor;
  padding: 12px 12px 15px;
  font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  color: white;
  font-size: 12px;
  margin-bottom: -6px;
  .overnav-verb {
    text-transform: uppercase;
    color: #7ec699;
  }
  .overnav-path {
    color: #ccc;
  }
}
.theme-code-group__nav {
  background-color: darken($codeBgColor, 25%);
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding-left: 10px;
  padding-top: 10px;
  padding-bottom: 12px;
  display: flex;
  justify-content: space-between;
  margin-bottom: -25px;
}
.theme-code-group__ul {
  margin: auto 0;
  padding-left: 0;
  display: inline-flex;
  list-style: none;
}
.theme-code-group__li {}
.theme-code-group__nav-tab {
  border: 0;
  padding: 5px;
  cursor: pointer;
  background-color: transparent;
  font-size: 0.85em;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
}
.theme-code-group__nav-tab-active {
  border-bottom: #42b983 1px solid;
}
.pre-blank {
  color: #42b983;
}
</style>
