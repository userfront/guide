<template>
  <ClientOnly>
    <div class="code-copy">
      <!-- Adapted from https://github.com/znicholasbrown/vuepress-plugin-code-copy -->
      <i class="material-icons" @click="copyToClipboard">content_copy</i>
      <span :class="success ? 'success' : ''">
        {{ options.successText }}
      </span>
    </div>
  </ClientOnly>
</template>

<script>
export default {
  props: {
    parent: Object,
    code: String,
    options: {
      align: String,
      color: String,
      backgroundTransition: Boolean,
      backgroundColor: String,
      successText: String,
      staticIcon: Boolean,
    },
  },
  data() {
    return {
      success: false,
      originalBackground: null,
      originalTransition: null,
    };
  },
  mounted() {
    this.originalTransition = this.parent.style.transition;
    this.originalBackground = this.parent.style.background;
  },
  beforeDestroy() {
    this.parent.style.transition = this.originalTransition;
    this.parent.style.background = this.originalBackground;
  },
  methods: {
    // From: https://stackoverflow.com/a/5624139
    hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    },
    copyToClipboard(el) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(this.code).then(
          () => {
            this.setSuccessTransitions();
          },
          () => {}
        );
      } else {
        let copyelement = document.createElement("textarea");
        document.body.appendChild(copyelement);
        copyelement.value = this.code;
        copyelement.select();
        document.execCommand("Copy");
        copyelement.remove();

        this.setSuccessTransitions();
      }
    },
    setSuccessTransitions() {
      clearTimeout(this.successTimeout);

      if (this.options.backgroundTransition) {
        this.parent.style.transition = "background 350ms";

        let color = this.hexToRgb(this.options.backgroundColor);
        this.parent.style.background = `rgba(${color.r}, ${color.g}, ${color.b}, 0.1)`;
      }

      this.success = true;
      this.successTimeout = setTimeout(() => {
        if (this.options.backgroundTransition) {
          this.parent.style.background = this.originalBackground;
          this.parent.style.transition = this.originalTransition;
        }
        this.success = false;
      }, 1000);
    },
  },
};
</script>

<style lang="stylus" scoped>
i {
  position: absolute;
  top: 7px;
  right: 0px;
  opacity: 0.75;
  cursor: pointer;
  font-size: 24px;
  padding: 2px 8px;
  cursor: pointer;
  color: grey;
  transition: color 0.2s;
  user-select: none;
  &:hover {
    color: white;
  }
}

span {
  position: absolute;
  top: 10px;
  right: 40px;
  font-size: 0.85rem;
  line-height: 0.425rem;
  z-index: 1;
  opacity: 0;
  color: white;
  background: $codeGreenColor;
  padding: 8px;
  border-radius: 4px;
  transition: opacity 500ms;
}

.success {
  opacity: 1 !important;
}
</style>
