<template>
  <section ref="redoc-container"></section>
</template>

<script>
export default {
  mounted() {
    Redoc.init(
      "https://api.userfront.com/swagger.json",
      {
        scrollYOffset: 50,
      },
      this.$refs["redoc-container"]
    );
  },
};
</script>
