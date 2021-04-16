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
})("Userfront","n8bjqqx7","https://mod.userfront.com/v2",window,document,"script");
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
    smoothScroll: true,
    nav: [
      { text: "Guide", link: "/guide/" },
      { text: "Examples", link: "/examples/" },
      { text: "API docs", link: "/docs/" },
      { text: "Dashboard", link: "https://userfront.com/projects" },
    ],
    sidebar: {
      "/guide/": [
        "/guide/quickstart.html",
        "/guide/",
        {
          title: "Toolkit",
          collapsable: false,
          children: [
            "/guide/toolkit.md",
            "/guide/signup.md",
            "/guide/login.md",
            "/guide/reset.md",
            "/guide/logout.md",
            // "/profile.md",
          ],
        },
        {
          title: "Tokens",
          collapsable: false,
          children: ["/guide/token-flow.md", "/guide/tokens.md"],
        },
        {
          title: "Usage",
          collapsable: false,
          children: [
            "/guide/test-mode.md",
            "/guide/multi-tenancy.md",
            "/guide/import-export.md",
          ],
        },
        "/guide/glossary.html",
        {
          title: "Learning",
          collapsable: false,
          children: [
            "/guide/authentication.md",
            "/guide/jwt-json-web-token.md",
            "/guide/auth-landscape.md",
            [
              "/vs/best-auth-comparison-auth0-okta-firebase-cognito.md",
              "Auth provider comparison",
            ],
            "/guide/cohort-analysis.md",
            "/guide/cohort.md",
          ],
        },
      ],
      "/examples/": [
        ["/examples/react", "React"],
        ["/examples/nodejs", "Node.js"],
        ["/examples/php", "PHP"],
      ],
      "/docs/": [
        "/docs/api.md",
        ["/docs/js.md", "Core JS library"],
        "/docs/webhooks.md",
      ],
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
