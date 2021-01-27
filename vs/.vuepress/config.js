module.exports = {
  title: "Comparisons",
  description: "Comparison of auth providers",
  base: "/vs/", // For deploying at userfront.com/vs/
  head: [
    [
      "link",
      {
        rel: "icon",
        href:
          "https://res.cloudinary.com/component/image/upload/v1582652683/circle_400_light_jrgbjq.png",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Material+Icons",
      },
    ],
  ],
  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-164523904-2",
      },
    ],
  ],
  themeConfig: {
    smoothScroll: true,
    nav: [{ text: "Userfront", link: "https://userfront.com" }],
    // sidebar: {
    //   "/": [
    //     "/quickstart.html",
    //     "/",
    //     {
    //       title: "Toolkit",
    //       collapsable: false,
    //       children: [
    //         "/toolkit.md",
    //         "/signup.md",
    //         "/login.md",
    //         "/reset.md",
    //         "/logout.md",
    //         // "/profile.md",
    //       ],
    //     },
    //     {
    //       title: "Tokens",
    //       collapsable: false,
    //       children: ["/tokens.md"],
    //     },
    //     {
    //       title: "Usage",
    //       collapsable: false,
    //       children: ["test-mode.md", "/import-export.md"],
    //     },
    //     {
    //       title: "Learning",
    //       collapsable: false,
    //       children: [
    //         "/jwt-json-web-token.md",
    //         "/auth-landscape.md",
    //         "/authentication.md",
    //         "/cohort-analysis.md",
    //         "/cohort.md",
    //         // "/auth-token-types.md",
    //       ],
    //     },
    //     // "/dashboard.html",
    //     // "/messaging.html"
    //   ],
    // },
    lastUpdated: "Last Updated", // string | boolean
    // https://vuepress.vuejs.org/default-theme-config/#algolia-search
    // algolia: {
    //   apiKey: "3d15a906f533dae762fe03ca79737fa5",
    //   indexName: "userfront",
    // },

    // Assumes GitHub. Can also be a full GitLab url.
    // repo: 'userfront/guide',
    // repoLabel: 'Contribute',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    // docsRepo: 'userfront/guide',
    // if your docs are not at the root of the repo:
    // docsDir: '..',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: "master",
    // defaults to false, set to true to enable
    // editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    // editLinkText: "Help us improve this page",
  },
  extendMarkdown(md) {
    return {
      lineNumbers: true,
    };
  },
};
