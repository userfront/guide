<template>
  <div class="card">
    <h4>Hello</h4>
    <form class="form">
      <input type="url" :value="urlValue" />
      <select v-model="headerValue">
        <option
          v-for="(hv, i) in headerValues"
          :key="`header-${i}`"
          :value="hv.value"
          >{{ hv.name }}</option
        >
      </select>
      <select v-model="routeValue">
        <option
          v-for="(rv, i) in routeValues"
          :key="`route-${i}`"
          :value="rv"
          >{{ rv }}</option
        >
      </select>
    </form>
    <div style="margin-bottom:12px;">
      <el-button-group>
        <el-button
          size="small"
          :type="isHeader('none') ? 'primary' : ''"
          @click="setHeader('none')"
          >No token</el-button
        >
        <el-button
          size="small"
          :type="isHeader('user') ? 'primary' : ''"
          @click="setHeader('user')"
          >Logged in user</el-button
        >
        <el-button
          size="small"
          :type="isHeader('admin') ? 'primary' : ''"
          @click="setHeader('admin')"
          >Admin user</el-button
        >
      </el-button-group>
    </div>
    <div>
      <el-button-group>
        <el-button type="primary" size="small">/public</el-button>
        <el-button type="primary" size="small" plain>/protected</el-button>
        <el-button type="primary" size="small" plain>/admin</el-button>
      </el-button-group>
    </div>

    <pre><code>fetch({
  header: "{{ headerValue.value }}",
  route: "{{ routeValue }}"    
})</code></pre>
  </div>
</template>

<script>
export default {
  props: ["url", "headerType"],
  data() {
    return {
      urlValue: "",
      headerValue: {},
      headerValues: [
        {
          name: "No token",
          type: "none",
          value: "",
        },
        {
          name: "Logged-in user",
          type: "user",
          value: "eyreg",
        },
        {
          name: "Admin user",
          type: "admin",
          value: "eyadmin",
        },
      ],
      routeValue: "/public",
      routeValues: ["/public", "/protected", "/admin"],
    };
  },
  methods: {
    setHeader(type) {
      if (!type) return;
      this.headerValues.map((hv) => {
        if (hv.type === type) {
          this.headerValue = hv;
        }
      });
    },
    isHeader(type) {
      console.log(this.headerValue.type, type);
      return this.headerValue.type === type;
    },
  },
  mounted() {
    this.urlValue = this.url || "";
    this.setHeader(this.headerType);
  },
};
</script>
