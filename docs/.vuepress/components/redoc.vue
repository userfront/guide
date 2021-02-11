<template>
  <section ref="redoc-container"></section>
</template>

<script>
const env = process.env.NODE_ENV;
export default {
  mounted() {
    const swaggerFile =
      process.env.NODE_ENV === "development"
        ? "http://localhost:5001/swagger.json"
        : "https://api.userfront.com/swagger.json";
    console.log(env);
    Redoc.init(
      swaggerFile,
      {
        // scrollYOffset: 50,
        hideDownloadButton: true,
        hideSingleRequestSampleTab: true,
        pathInMiddlePanel: true,
      },
      this.$refs["redoc-container"]
    );
  },
};
</script>
