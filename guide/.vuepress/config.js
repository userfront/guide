module.exports = {
  title: "Userfront guide",
  description: "Guide and examples for Userfront",
  base: "/guide/", // For deploying at userfront.com/guide/
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
  ],
  themeConfig: {
    smoothScroll: true,
    nav: [
      { text: "Dashboard", link: "https://userfront.com/projects" },
      { text: "API docs", link: "https://userfront.com/docs" },
    ],
    sidebar: {
      "/": [
        "/quickstart.html",
        "/",
        {
          title: "Examples",
          collapsable: true,
          children: [
            // "/examples/create-react-app",
            // "/examples/react-router",
            "/examples/react",
          ],
        },
        {
          title: "Toolkit",
          collapsable: false,
          children: [
            "/toolkit.md",
            "/signup.md",
            "/login.md",
            "/reset.md",
            "/logout.md",
            // "/profile.md",
          ],
        },
        {
          title: "Tokens",
          collapsable: false,
          children: ["/tokens.md"],
        },
        {
          title: "Usage",
          collapsable: false,
          children: ["test-mode.md", "/import-export.md"],
        },
        {
          title: "Learning",
          collapsable: false,
          children: [
            "/jwt-json-web-token.md",
            "/auth-landscape.md",
            "/authentication.md",
            "/cohort-analysis.md",
            "/cohort.md",
            // "/auth-token-types.md",
          ],
        },
        // "/dashboard.html",
        // "/messaging.html"
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
  extendMarkdown(md) {
    return {
      lineNumbers: true,
    };
  },
};
