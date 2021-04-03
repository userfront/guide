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

    <pre><code>fetch({
  route: "{{ routeValue }}"    
})</code></pre>
  </div>
</template>

<script>
export default {
  props: ["url"],
  data() {
    return {
      urlValue: "",
      headerValue: "Bearer ",
      routeValue: "/public",
      headerValues: [
        {
          name: "No token",
          value: "",
        },
        {
          name: "Logged-in user",
          value: "eyreg",
        },
        {
          name: "Admin user",
          value: "eyadmin",
        },
      ],
      routeValues: ["/public", "/protected", "/admin"],
    };
  },
  mounted() {
    this.urlValue = this.url || "";
    this.headerValue = this.header || this.headerValue;
  },
};
</script>
