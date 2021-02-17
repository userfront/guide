<template>
  <div v-show="responses.length > 0">
    <code-group>
      <code-block title="cURL">
        <pre><code>
        bash curl --request DELETE \ --url
        https://api.userfront.com/v0/tenants/tenantId \ --header 'Accept: */*'
          </code></pre>
      </code-block>
      <code-block title="Node">
        ```js Some node code ```
      </code-block>

      <code-block title="PHP">
        ```php Some PHP code ```
      </code-block>
    </code-group>
    <!-- // TODO make a component that will accept a URL, payload, etc, and render a code
block with tabs for each of the methods (e.g. Node, PHP, Ruby, etc) -->
  </div>
</template>

<script>
export default {
  props: ["path", "verb"],
  computed: {
    responses() {
      try {
        return this.$swagger.paths[this.path][this.verb].responses;
      } catch (error) {
        return [];
      }
    },
  },
};
</script>
