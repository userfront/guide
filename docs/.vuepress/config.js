module.exports = {
  title: "Userfront API docs",
  description: "API docs for Userfront",
  base: "/docs/", // For deploying at userfront.com/docs/
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
        href: "https://fonts.googleapis.com/css2?family=Material+Icons",
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
    nav: [
      { text: "Guide", link: "https://userfront.com/guide" },
      { text: "Dashboard", link: "https://userfront.com/projects" },
    ],
    sidebar: {
      "/": [
        "/api.html",
        "/webhooks.html",
        // {
        //   title: "Examples",
        //   collapsable: true,
        //   children: ["/examples/create-react-app", "/examples/react-router"],
        // },
      ],
    },
    // search: false,
    lastUpdated: false, // string | boolean
    // https://vuepress.vuejs.org/default-theme-config/#algolia-search
    // algolia: {},

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
    editLinks: false,
    // custom text for edit link. Defaults to "Edit this page"
    // editLinkText: "Help us improve this page",
  },
  markdown: {
    extendMarkdown: (md) => {
      md.use(require("markdown-it-container"), "left");
      md.use(require("markdown-it-container"), "right");
      md.use(require("markdown-it-container"), "row");
      md.use(require("markdown-it-container"), "card");
      md.use(require("markdown-it-include"));
    },
  },
};
