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
      {
        src: "https://cdn.userfront.com/core.js",
      },
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
    //     [
    //       "script",
    //       { id: "Userfront-script" },
    //       `
    // (function(m,o,d,u,l,a,r,i,z,e) {
    //   u[m]={rq:[],ready:function(j){u[m].rq.push(j);},m:m,o:o,d:d,r:r};function j(s){return encodeURIComponent(btoa(s));}z=l.getElementById(m+"-"+a);r=u.location;
    //   e=[d+"/page/"+o+"/"+j(r.pathname)+"/"+j(r.host)+"?t="+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});u.amvartem=m;
    // })("Userfront","n8bjqqx7","https://cdn.userfront.com/toolkit",window,document,"script");
    //  `,
    //     ],
    /* Local scripts */
    //     [
    //       "script",
    //       { id: "Userfront-script" },
    //       `
    // (function (m,o,d,u,l,a,r,i,z,e) {
    //   u[m]={Project:o,rq:[],Opts:r,ready:function(j){u[m].rq.push(j)}};function j(s){return encodeURIComponent(btoa(s))};z=l.getElementById(m+'-'+a);r=u.location;
    //   e=['http://localhost:5000/v2/page/'+o+'/'+j(r.pathname)+'/'+j(r.host)+'?t='+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});
    // })('Userfront','g48xypb9','http://localhost:4000/v3',window,document,'script', { toolkit: false });`,
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
      { text: "SSO", link: "/guide/sso/" },
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
              {
                text: "Default-Secure Software",
                link: "/guide/default-secure-software.md",
              },
              { text: "Authentication", link: "/guide/authentication.md" },
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
          { text: "API reference: Server-to-server", link: "/docs/api.html" },
          {
            text: "API reference: Client-to-server",
            link: "/docs/api-client.html",
          },
          { text: "Core JS library", link: "/docs/js.html" },
          { text: "Webhook reference", link: "/docs/webhooks.html" },
        ],
      },
      { text: "Dashboard", link: "https://userfront.com/projects" },
    ],
    sidebar: {
      "/guide/auth/": [
        ["/guide/auth/", "Tokens & access"],
        ["/guide/auth/jwt-json-web-token.md", "JWT structure"],
        ["/guide/auth/jwt-public-private-keys.md", "JWT public & private keys"],
        "/guide/auth/jwt-libraries.md",
        "/guide/auth/multi-tenancy.md",
      ],
      "/examples/": [
        {
          title: "Examples",
          collapsable: false,
          children: [
            ["/examples/react", "React"],
            ["/examples/vue", "Vue.js"],
            ["/examples/nodejs", "Node.js"],
            ["/examples/php", "PHP"],
            ["/examples/react-native", "React Native"],
          ],
        },
      ],
      "/guide/sso": [],
      "/guide/toolkit": [
        {
          title: "Ready to use",
          collapsable: false,
          initialOpenGroupIndex: -1,
          children: [
            {
              title: "HTML",
              children: [
                ["/guide/toolkit/automatic-signup-form-html", "Signup form"],
                ["/guide/toolkit/automatic-login-form-html", "Login form"],
                [
                  "/guide/toolkit/automatic-password-reset-form-html",
                  "Password reset form",
                ],
                [
                  "/guide/toolkit/automatic-logout-button-html",
                  "Logout button",
                ],
              ],
            },
            {
              title: "React",
              children: [
                ["/guide/toolkit/automatic-signup-form-react", "Signup form"],
                ["/guide/toolkit/automatic-login-form-react", "Login form"],
                [
                  "/guide/toolkit/automatic-password-reset-form-react",
                  "Password reset form",
                ],
                [
                  "/guide/toolkit/automatic-logout-button-react",
                  "Logout button",
                ],
              ],
            },
            {
              title: "Vue.js",
              children: [
                ["/guide/toolkit/automatic-signup-form-vue", "Signup form"],
                ["/guide/toolkit/automatic-login-form-vue", "Login form"],
                [
                  "/guide/toolkit/automatic-password-reset-form-vue",
                  "Password reset form",
                ],
                ["/guide/toolkit/automatic-logout-button-vue", "Logout button"],
              ],
            },
          ],
        },
        {
          title: "Build your own",
          collapsable: false,
          initialOpenGroupIndex: -1,
          children: [
            {
              title: "HTML",
              children: [
                ["/guide/toolkit/build-signup-form-html", "Signup form"],
                ["/guide/toolkit/build-login-form-html", "Login form"],
                [
                  "/guide/toolkit/build-password-reset-form-html",
                  "Password reset form",
                ],
                ["/guide/toolkit/build-logout-button-html", "Logout button"],
              ],
            },
            {
              title: "React",
              children: [
                ["/guide/toolkit/build-signup-form-react", "Signup form"],
                ["/guide/toolkit/build-login-form-react", "Login form"],
                [
                  "/guide/toolkit/build-password-reset-form-react",
                  "Password reset form",
                ],
                ["/guide/toolkit/build-logout-button-react", "Logout button"],
              ],
            },
            {
              title: "Vue.js",
              children: [
                ["/guide/toolkit/build-signup-form-vue", "Signup form"],
                ["/guide/toolkit/build-login-form-vue", "Login form"],
                [
                  "/guide/toolkit/build-password-reset-form-vue",
                  "Password reset form",
                ],
                ["/guide/toolkit/build-logout-button-vue", "Logout button"],
              ],
            },
          ],
        },
      ],
      "/docs/api-client": ["/docs/api-client.md"],
      "/docs/api": ["/docs/api.md"], // Keep below /docs/api-client
      "/docs/webhooks": ["/docs/webhooks.md"],
      "/docs/js": [["/docs/js.md", "Core JS library"]],
      "/tutorials": [
        {
          title: "Examples",
          collapsable: false,
          children: [
            ["/examples/react", "React"],
            ["/examples/vue", "Vue.js"],
            ["/examples/nodejs", "Node.js"],
            ["/examples/php", "PHP"],
            ["/examples/react-native", "React Native"],
          ],
        },
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
      // Custom ::: caret container
      md.use(require("markdown-it-container"), "caret", {
        validate: function(params) {
          return params.trim().match(/^caret\s+(.*)$/);
        },

        render: function(tokens, idx) {
          var m = tokens[idx].info.trim().match(/^caret\s+(.*)$/);

          if (tokens[idx].nesting === 1) {
            // opening tag
            return (
              `<details class="caret-container"><summary>` +
              md.utils.escapeHtml(m[1]) +
              "</summary>\n"
            );
          } else {
            // closing tag
            return "</details>\n";
          }
        },
      });

      md.use(require("markdown-it-include"));
    },
  },
};
