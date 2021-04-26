<template>
  <div class="light-code">
    <div v-show="isLoggedIn">
      <div
        v-show="showWarning"
        class="el-alert el-alert--error is-light"
        style="margin-top:20px"
      >
        Unable to fetch your API key, so a demo API key is shown instead.
      </div>
      <div class="language-json" :key="`bare-${tokenToShow}`">
        <pre
          style="padding: 40px 0 10px; font-size: 16px;"
        ><code style="font-weight:600;">{{ tokenToShow }}</code></pre>
      </div>
      <tenant-picker></tenant-picker>
      <p>
        Your test API key is included in all the examples here, so you can test
        the code samples right away.
      </p>
      <p>
        In general, you should include your API key in the header of requests:
      </p>
      <div class="language-json" :key="`header-${tokenToShow}`">
        <pre><code>{
  headers: {
    authorization: "Bearer {{ tokenToShow }}"
  }
}</code></pre>
      </div>
    </div>
    <div v-if="!isLoggedIn">
      <p>
        A sample test API key is included in all the examples here, so you can
        test any example right away.
      </p>
      <p>
        To test requests using your account, replace the sample API key with
        your actual API key or sign in.
      </p>
      <p>
        <a class="action-button" href="../login?redirect=/docs/api">Sign in</a>
      </p>
    </div>
  </div>
</template>

<script>
import TenantPicker from "./tenant-picker.vue";

export default {
  components: {
    TenantPicker,
  },
  computed: {
    loading() {
      return this.$store.state.loadingToken;
    },
    showWarning() {
      return (
        !this.loading &&
        this.tokenToShow === this.demoToken &&
        this.activeTenant.tenantId !== "demo1234"
      );
    },
    demoToken() {
      return this.$demoToken;
    },
    activeTenant() {
      return this.$store.state.activeTenant;
    },
    // Display the tenantToken if it matches the tenant,
    // otherwise display the demo token
    tokenToShow() {
      const tenantToken = this.$store.state.tenantToken;
      try {
        return tenantToken.indexOf(this.activeTenant.tenantId) > 0
          ? tenantToken
          : this.demoToken;
      } catch (error) {
        return this.demoToken;
      }
    },
    isLoggedIn() {
      return !!this.$store.state.accessToken;
    },
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
