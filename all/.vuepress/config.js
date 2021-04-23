module.exports = {
  title: "Userfront guide",
  description: "Guide and examples for Userfront",
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
    /* Production scripts */
    [
      "script",
      { id: "Userfront-script" },
      `
(function(m,o,d,u,l,a,r,i,z,e) {
  u[m]={rq:[],ready:function(j){u[m].rq.push(j);},m:m,o:o,d:d,r:r};function j(s){return encodeURIComponent(btoa(s));}z=l.getElementById(m+"-"+a);r=u.location;
  e=[d+"/page/"+o+"/"+j(r.pathname)+"/"+j(r.host)+"?t="+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});u.amvartem=m;
})("Userfront","n8bjqqx7","https://mod.userfront.com/v3",window,document,"script");
 `,
    ],
    [
      "script",
      { id: "chatwoot-script" },
      `(function(d,t) {
    var BASE_URL="https://app.chatwoot.com";
    var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    g.src=BASE_URL+"/packs/js/sdk.js";
    s.parentNode.insertBefore(g,s);
    g.onload=function(){
      window.chatwootSDK.run({
        websiteToken: '7XyQSCgsKvpygFg7zYsKKV7q',
        baseUrl: BASE_URL
      })
    }
  })(document,"script");`,
    ],
    /* Local scripts */
    //     [
    //       "script",
    //       { id: "Userfront-script" },
    //       `
    // (function (m,o,d,u,l,a,r,i,z,e) {
    //   u[m]={Project:o,rq:[],Opts:r,ready:function(j){u[m].rq.push(j)}};function j(s){return encodeURIComponent(btoa(s))};z=l.getElementById(m+'-'+a);r=u.location;
    //   e=['http://localhost:5000/v2/page/'+o+'/'+j(r.pathname)+'/'+j(r.host)+'?t='+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});
    // })('Userfront','g48xypb9','http://localhost:4000/v2',window,document,'script', { toolkit: false });`,
    //     ],
  ],
  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-164523904-2",
      },
    ],
    require("./plugins/codeCopy/index.js"),
  ],
  themeConfig: {
    smoothScroll: true, // true causes problems with linking to API docs
    searchPlaceholder: "Search the guide...",
    activeHeaderLinks: false, // true causes problems with linking to API docs
    nav: [
      { text: "Home", link: "/guide/" },
      { text: "Toolkit", link: "/guide/toolkit/" },
      { text: "Tokens & Access", link: "/guide/auth/" },
      { text: "Examples", link: "/examples/" },
      {
        text: "···",
        ariaLabel: "More resources",
        items: [
          { text: "Test mode", link: "/guide/test-mode.md" },
          { text: "Import and export users", link: "/guide/import-export.md" },
          { text: "Glossary of terms", link: "/guide/glossary.md" },
          {
            text: "Learn more about",
            items: [
              { text: "Authentication", link: "/guide/authentication.md" },
              {
                text: "JSON Web Tokens (JWTs)",
                link: "/guide/jwt-json-web-token.md",
              },
              { text: "Auth landscape", link: "/guide/auth-landscape.md" },
              {
                text: "Auth provider comparison",
                link: "/vs/best-auth-comparison-auth0-okta-firebase-cognito.md",
              },
              { text: "Cohort analysis", link: "/guide/cohort-analysis.md" },
            ],
          },
        ],
      },
      {
        text: "APIs & SDKs",
        ariaLabel: "APIs and SDKs",
        items: [
          { text: "API reference", link: "/docs/api.html" },
          { text: "Webhook reference", link: "/docs/webhooks.html" },
          { text: "Core JS library", link: "/docs/js.html" },
        ],
      },
      { text: "Dashboard", link: "https://userfront.com/projects" },
    ],
    sidebar: {
      "/guide/toolkit/": [
        "/guide/toolkit/",
        "/guide/toolkit/signup.md",
        "/guide/toolkit/login.md",
        "/guide/toolkit/reset.md",
        "/guide/toolkit/logout.md",
      ],
      "/guide/auth/": [
        "/guide/auth/token-flow.md",
        "/guide/auth/multi-tenancy.md",
      ],
      "/examples/": [
        ["/examples/react", "React"],
        ["/examples/nodejs", "Node.js"],
        ["/examples/php", "PHP"],
      ],
      "/docs/api": ["/docs/api.md"],
      "/docs/webhooks": ["/docs/webhooks.md"],
      "/docs/js": [["/docs/js.md", "Core JS library"]],
    },
    lastUpdated: "Last Updated", // string | boolean
    // https://vuepress.vuejs.org/default-theme-config/#algolia-search
    algolia: {
      apiKey: "3d15a906f533dae762fe03ca79737fa5",
      indexName: "userfront",
    },

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
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Help us improve this page",
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
