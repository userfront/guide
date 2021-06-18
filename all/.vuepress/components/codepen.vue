<template>
  <p
    class="codepen"
    data-height="400"
    data-theme-id="dark"
    data-default-tab="result"
    data-user="userfront"
    :data-slug-hash="slug"
    style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 24px 0; padding: 1em;"
    :data-pen-title="title"
  >
    <span>
      See the Pen
      <a :href="`https://codepen.io/userfront/pen/${slug}`"> {{ title }}</a>
    </span>
  </p>
</template>

<script>
export default {
  props: ["title", "slug"],
  mounted() {
    // Load the embed if the method has been defined
    // https://blog.codepen.io/documentation/embedded-pens/#delayed-embeds-6
    if (window.__CPEmbed) return __CPEmbed();

    // Add the codepen ei.js script if not already on the page
    const el = document.createElement("script");
    el.src = "https://cpwebassets.codepen.io/assets/embed/ei.js";
    el.async = true;
    document.body.appendChild(el);
  },
};
</script>
