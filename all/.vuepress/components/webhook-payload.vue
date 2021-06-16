<template>
  <div class="card light-code">
    <h4>Webhook request body</h4>
    <div class="language-json extra-class">
      <pre
        class="language-json"
      ><code class="language-json" v-html="highlight(responseSample, 'json')"></code></pre>
    </div>
  </div>
</template>

<script>
import Prism from "prismjs";
import "prismjs/components/prism-json";

export default {
  props: ["path", "verb", "model", "action"],
  data() {
    return {
      // Hide these fields even though they are included in docs.json
      excludeUserFields: [
        "lastActiveAt",
        "lastMessagedAt",
        "tenant",
        "updatedAt",
      ],
      excludeTenantFields: ["testTenantId"],
    };
  },
  computed: {
    record() {
      try {
        const record = JSON.parse(
          JSON.stringify(
            this.$docs.paths[this.path][this.verb].responses[200] || {}
          )
        );
        return this.excludeRecordAttributes(record);
      } catch (error) {
        return {};
      }
    },
    response() {
      return {
        action: this.action,
        model: this.model,
        mode: "test",
        record: this.record,
      };
    },
    responseSample() {
      return JSON.stringify(this.response, null, "  ");
    },
  },
  methods: {
    highlight(code, language) {
      return Prism.highlight(code, Prism.languages[language], language);
    },
    excludeRecordAttributes(record) {
      if (!record) return {};
      if (this.model === "user") {
        this.excludeUserFields.map((field) => {
          delete record[field];
        });
      }
      if (this.model === "tenant") {
        this.excludeTenantFields.map((field) => {
          delete record[field];
        });
      }
      return record;
    },
  },
};
</script>

<style lang="stylus">
.card .language-json {
  pre.response-json {
    padding: 0;
    background-color: inherit;
  }
  .token.property, .token.operator  {
    color: $codeGrayColor;
  }
  .token.string {
    color: $codeGreenColor;
  }
  .token.number, .token.boolean {
    color: $codeBlueColor;
  }
}
</style>
