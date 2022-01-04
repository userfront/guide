(window.webpackJsonp=window.webpackJsonp||[]).push([[86],{657:function(e,t,s){"use strict";s.r(t);var a=s(39),o=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("toolkit-breadcrumb"),e._v(" "),s("h1",{attrs:{id:"ready-to-use-signup-form-with-vue"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#ready-to-use-signup-form-with-vue"}},[e._v("#")]),e._v(" Ready-to-use signup form with Vue")]),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"left"},[s("p",[e._v("In this section, we add an automatic signup form that can do the following:")]),e._v(" "),s("ul",[s("li",[s("a",{attrs:{href:"#register-a-user"}},[e._v("Register a user")])]),e._v(" "),s("li",[s("a",{attrs:{href:"#redirection"}},[e._v("Redirect")]),e._v(" to a URL of your choice")]),e._v(" "),s("li",[s("a",{attrs:{href:"#welcome-email"}},[e._v("Send a welcome email")])]),e._v(" "),s("li",[s("a",{attrs:{href:"#signup-webhook"}},[e._v("Send a webhook")]),e._v(" with user information")]),e._v(" "),s("li",[s("a",{attrs:{href:"#single-sign-on"}},[e._v("Single Sign-on")]),e._v(" (SSO) with Google & others")])])]),e._v(" "),s("div",{staticClass:"right"},[s("iframe-demo",{attrs:{"display-title":"Signup form"}})],1)]),e._v(" "),s("h2",{attrs:{id:"example-vue-js-signup-form"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#example-vue-js-signup-form"}},[e._v("#")]),e._v(" Example: Vue.js signup form")]),e._v(" "),s("h4",{attrs:{id:"install-the-userfront-vue-library"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#install-the-userfront-vue-library"}},[e._v("#")]),e._v(" Install the Userfront Vue library")]),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"left"},[s("p",[e._v("To add the form to your Vue project, first install "),s("code",[e._v("@userfront/vue")]),e._v(" with npm (or yarn).")])]),e._v(" "),s("div",{staticClass:"right"},[s("div",{staticClass:"language-sh extra-class"},[s("pre",{pre:!0,attrs:{class:"language-sh"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("npm")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("install")]),e._v(" @userfront/vue --save\n")])])])])]),e._v(" "),s("h4",{attrs:{id:"render-the-signup-form-in-vue"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#render-the-signup-form-in-vue"}},[e._v("#")]),e._v(" Render the signup form in Vue")]),e._v(" "),s("p",[e._v("See a "),s("a",{attrs:{href:"https://codesandbox.io/s/userfront-vue-example-5xf85?file=/src/App.vue",target:"_blank",rel:"noopener noreferrer"}},[e._v("demo on CodeSandbox"),s("OutboundLink")],1)]),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"left"},[s("p",[e._v("First, initialize the Userfront Vue library with your "),s("RouterLink",{attrs:{to:"/guide/glossary.html#account-id"}},[e._v("account ID")]),e._v(" using "),s("code",[e._v("Userfront.init()")]),e._v(".")],1),e._v(" "),s("p",[e._v("You can do this in the main file (as shown here) or in a component file. If you do this in the main file, you only need to do it once.")])]),e._v(" "),s("div",{staticClass:"right"},[s("install-vue",{attrs:{"display-title":"Signup form",file:"main.js"}})],1)]),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"left"},[s("p",[e._v("Import the "),s("code",[e._v("SignupForm")]),e._v(" component from "),s("code",[e._v("@userfront/vue")]),e._v(" and register it as a component.")]),e._v(" "),s("p",[e._v("Then you can use the "),s("code",[e._v("<signup-form />")]),e._v(" component in your "),s("code",[e._v("<template>")]),e._v(" tag. You can find your "),s("code",[e._v("tool-id")]),e._v(" in the "),s("strong",[e._v("Toolkit")]),e._v(" section of the Userfront dashboard.")])]),e._v(" "),s("div",{staticClass:"right"},[s("install-vue",{attrs:{"display-title":"Signup form",file:"App.vue"}})],1)]),e._v(" "),s("h3",{attrs:{id:"test-mode"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#test-mode"}},[e._v("#")]),e._v(" Test mode")]),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"left"},[s("p",[e._v("By default, your form in "),s("a",{attrs:{href:"/guide/test-mode"}},[e._v("test mode")]),e._v(". This allows you to experiment and develop locally without affecting your live data.")]),e._v(" "),s("p",[e._v("Test mode is used automatically for any domains that are not secured with "),s("code",[e._v("https://")]),e._v(" or that are not added to your list of live domains.")])])]),e._v(" "),s("h3",{attrs:{id:"register-a-user"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#register-a-user"}},[e._v("#")]),e._v(" Register a user")]),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"left"},[s("p",[e._v("Add your signup form to any page where you want a user to sign up.")]),e._v(" "),s("p",[e._v("For example, you may want your signup form directly on your home page and also on a page at "),s("code",[e._v("/signup")]),e._v(". You can also add it to your marketing pages if desired.")]),e._v(" "),s("p",[e._v('In order for the signup form to work properly, it should be located at the same domain as your "logged in" pages.')])])]),e._v(" "),s("h3",{attrs:{id:"redirection"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#redirection"}},[e._v("#")]),e._v(" Redirection")]),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"left"},[s("p",[e._v("When a user signs up, they are redirected to the URL of your choice.")]),e._v(" "),s("p",[e._v("The default is "),s("code",[e._v("/dashboard")]),e._v(", but you can change it in your account:")]),e._v(" "),s("p",[s("strong",[e._v("Settings > After-signup path")])]),e._v(" "),s("p",[e._v("Upon signing up, the user will be redirected to whatever domain the form is on, plus the After-signup path.")]),e._v(" "),s("p",[e._v("For example, if the signup form is at "),s("code",[e._v("https://example.com/features")]),e._v(", then the user will be redirected to "),s("code",[e._v("https://example.com/dashboard")]),e._v(" upon sign up.")])])]),e._v(" "),s("h3",{attrs:{id:"welcome-email"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#welcome-email"}},[e._v("#")]),e._v(" Welcome email")]),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"left"},[s("p",[e._v("When a user signs up with their email and password, Userfront sends them a welcome email.")]),e._v(" "),s("p",[e._v("This email says that they have signed up for your project and asks the user to verify their email address by clicking on a link.")]),e._v(" "),s("p",[e._v("When the user clicks on the link, their email address is verified, and they are redirected to your After-login path.")])])]),e._v(" "),s("h2",{attrs:{id:"signup-webhook"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#signup-webhook"}},[e._v("#")]),e._v(" Signup webhook")]),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"left"},[s("p",[e._v("If you want to be notified when a new user is created, you can add a URL to the User Created Webhook in your account settings.")]),e._v(" "),s("p",[e._v("Userfront will send a JSON "),s("code",[e._v("POST")]),e._v(" request to your Webhook URL whenever a user is created. This request will have your account's Webhook API key in the header, which you can use to verify the request in your application.")]),e._v(" "),s("p",[e._v("For more information about webhooks, see the "),s("RouterLink",{attrs:{to:"/docs/webhooks/"}},[e._v("Webhook reference")]),e._v(".")],1)])]),e._v(" "),s("h2",{attrs:{id:"single-sign-on"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#single-sign-on"}},[e._v("#")]),e._v(" Single Sign-on")]),e._v(" "),s("div",{staticClass:"row"},[s("div",{staticClass:"left"},[s("p",[e._v("To configure Single sign-on (SSO) with Google or other providers, visit the "),s("strong",[e._v("SSO")]),e._v(" tab in the Userfront dashboard.")]),e._v(" "),s("p",[e._v("From there, you can add the credentials for the providers you want to use.")]),e._v(" "),s("p",[e._v("Once you have done this, the corresponding button(s) will show up on your form automatically.")])]),e._v(" "),s("div",{staticClass:"right"},[s("p",[s("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1619211711/guide/signup-form-google.png",alt:"Single sign-on with Google"}})])])])],1)}),[],!1,null,null,null);t.default=o.exports}}]);