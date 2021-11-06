<template>
  <div>
    <code-group>
      <code-block-custom
        title="Success"
        language="js"
        :code="`${responseSuccess}`"
      />
      <code-block-custom title="Error" language="js" :code="`${response400}`" />
    </code-group>
  </div>
</template>

<script>
export default {
  props: ["method", "path", "verb", "source", "errorMessage"],
  computed: {
    response() {
      try {
        const source = this.source || "$docs";
        return this[source].paths[this.path][this.verb].responses[200] || {};
      } catch (error) {
        return {};
      }
    },
    responseSuccess() {
      return `const res = await ${this.method};
console.log(res);
${this.responsify(this.response)}`;
    },
    errorPrepend() {
      return `try {
  await ${this.method};
} catch (error) {
  console.log(error);
}
`;
    },
    response400() {
      return (
        this.errorPrepend +
        this.responsify({
          statusCode: 400,
          error: "Bad Request",
          message: this.errorMessage || "Problem with request",
        })
      );
    },
  },
  methods: {
    // Turn a JSON object into a response string
    responsify(obj) {
      return (
        "// =>\n" +
        JSON.stringify(obj, null, "  ").replace(/"([^"]+)":/g, "$1:")
      );
    },
  },
};
</script>

<style lang="stylus"></style>
