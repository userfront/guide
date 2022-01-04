(window.webpackJsonp=window.webpackJsonp||[]).push([[92],{663:function(t,s,a){"use strict";a.r(s);var n=a(39),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("toolkit-breadcrumb"),t._v(" "),a("h1",{attrs:{id:"build-a-logout-button-with-vue"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#build-a-logout-button-with-vue"}},[t._v("#")]),t._v(" Build a logout button with Vue")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("In this section, we create a custom logout button that will:")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"#disabled-state"}},[t._v("Show a disabled state")]),t._v(" when not logged in")]),t._v(" "),a("li",[a("a",{attrs:{href:"#clearing-tokens"}},[t._v("Clear the user's tokens")])]),t._v(" "),a("li",[a("a",{attrs:{href:"#redirect-after-logout"}},[t._v("Redirect after logout")]),t._v(" to your After-logout path")])])])]),t._v(" "),a("h2",{attrs:{id:"example-custom-logout-button-with-vue-js"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#example-custom-logout-button-with-vue-js"}},[t._v("#")]),t._v(" Example: custom logout button with Vue.js")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("You can clone the example logout button on "),a("a",{attrs:{href:"https://codepen.io/userfront/pen/abWZJpX",target:"_blank",rel:"noopener noreferrer"}},[t._v("CodePen"),a("OutboundLink")],1),t._v(" and make edits, or follow along below.")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),a("p",[t._v("The example form has the Userfront Core JS library added to the document, as described in the next section.")])])]),t._v(" "),a("div",{staticClass:"right"},[a("br"),t._v(" "),a("codepen",{attrs:{title:"Build a logout button with React",slug:"abWZJpX"}})],1)]),t._v(" "),a("h2",{attrs:{id:"add-the-userfront-core-js-library"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#add-the-userfront-core-js-library"}},[t._v("#")]),t._v(" Add the Userfront Core JS library")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("You can add the Userfront Core JS library by CDN or using npm.")]),t._v(" "),a("p",[t._v("You only need to do one of these.")])]),t._v(" "),a("div",{staticClass:"right"},[a("h3",{attrs:{id:"cdn"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cdn"}},[t._v("#")]),t._v(" CDN")]),t._v(" "),a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://cdn.userfront.com/core.js"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}}),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("br"),t._v(" "),a("h3",{attrs:{id:"npm"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#npm"}},[t._v("#")]),t._v(" NPM")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v(" @userfront/core\n")])])]),a("p",[t._v("Then import the library into your file(s)")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" Userfront "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@userfront/core"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),a("h2",{attrs:{id:"set-up-the-button"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#set-up-the-button"}},[t._v("#")]),t._v(" Set up the button")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("Create your logout button with the elements you want to use.")]),t._v(" "),a("p",[t._v("In this case, we're using a custom-styled "),a("code",[t._v("<button>")]),t._v(" element that is red when active and gray if the user is not logged in.")]),t._v(" "),a("h3",{attrs:{id:"logout-button-vue-code"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#logout-button-vue-code"}},[t._v("#")]),t._v(" Logout button Vue code")]),t._v(" "),a("h4",{attrs:{id:"logout-button-element"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#logout-button-element"}},[t._v("#")]),t._v(" Logout <button> element")]),t._v(" "),a("p",[t._v("We set the logout "),a("code",[t._v("<button>")]),t._v(" element to call "),a("code",[t._v("handleLogout()")]),t._v(" when it is clicked.")]),t._v(" "),a("p",[t._v("Additionally, we set the "),a("code",[t._v("disabled")]),t._v(" property for the button based on the "),a("code",[t._v("isLoggedOut")]),t._v(" variable so that the button will be gray if the user is not logged in.")]),t._v(" "),a("h4",{attrs:{id:"handlelogout"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#handlelogout"}},[t._v("#")]),t._v(" handleLogout()")]),t._v(" "),a("p",[t._v("When the logout button is clicked, this function calls "),a("code",[t._v("Userfront.logout()")]),t._v(".")]),t._v(" "),a("h4",{attrs:{id:"isloggedout"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#isloggedout"}},[t._v("#")]),t._v(" isLoggedOut")]),t._v(" "),a("p",[t._v("This computed property checks "),a("code",[t._v("Userfront.accessToken()")]),t._v(", which is only present when the user is logged in. Thus if it is absent, the user is logged out.")])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("button")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("logout-button"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click.prevent")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("handleLogout"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":disabled")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("isLoggedOut"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    Log out\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("template")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Initialize Userfront")]),t._v("\n  Userfront"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("init")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"demo1234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    methods"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Log out with Userfront.logout()")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handleLogout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        Userfront"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("logout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    computed"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// User is logged out if they don't have an access token")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("isLoggedOut")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("Userfront"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("accessToken")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("style")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("scoped")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token style"}},[a("span",{pre:!0,attrs:{class:"token language-css"}},[t._v("\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("#logout-button")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" red"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" white"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("border")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" none"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("padding")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 5px 10px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token selector"}},[t._v("#logout-button[disabled]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("background-color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" lightgray"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[t._v("color")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" gray"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("style")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])])]),t._v(" "),a("h3",{attrs:{id:"userfront-logout"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#userfront-logout"}},[t._v("#")]),t._v(" Userfront.logout()")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("The "),a("RouterLink",{attrs:{to:"/docs/js.html#logout-options"}},[t._v("logout()")]),t._v(" method allows you to log out a user.")],1),t._v(" "),a("p",[t._v("Userfront then does the following:")]),t._v(" "),a("ol",[a("li",[t._v("Invalidates the user's current session")]),t._v(" "),a("li",[t._v("Clears any Userfront-issued tokens from the browser")]),t._v(" "),a("li",[t._v("Redirects the page to the "),a("RouterLink",{attrs:{to:"/guide/glossary.html#after-logout-path"}},[t._v("After-logout path")])],1)]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("NOTE")]),t._v(" "),a("p",[t._v("If the user is not logged in, calling "),a("code",[t._v("Userfront.logout()")]),t._v(" will not do anything.")])])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Sample: how to use Userfront.logout()")]),t._v("\nUserfront"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("init")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"demo1234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nUserfront"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("logout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),a("h3",{attrs:{id:"disabled-state"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#disabled-state"}},[t._v("#")]),t._v(" Disabled state")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("We can show a disabled state by adding the "),a("code",[t._v("disabled")]),t._v(" property to the button.")]),t._v(" "),a("p",[t._v("If the user is logged out, "),a("code",[t._v("Userfront.accessToken()")]),t._v(" will not return a value, so we can use this to set the "),a("code",[t._v("isLoggedOut")]),t._v(" property.")]),t._v(" "),a("p",[t._v("Note that you are not required to show the button when the user is not logged in; usually the logout button is only shown on pages where the user must be logged in.")])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("button")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("id")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("logout-button"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("@click.prevent")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("handleLogout"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":disabled")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("isLoggedOut"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  Log out\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("button")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("computed"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// User is logged out if they don't have an access token")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("isLoggedOut")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!")]),t._v("Userfront"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("accessToken")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])])])])]),t._v(" "),a("h3",{attrs:{id:"clearing-tokens"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#clearing-tokens"}},[t._v("#")]),t._v(" Clearing tokens")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("Whenever "),a("code",[t._v("Userfront.logout()")]),t._v(" is called, the method makes an API call to Userfront to invalidate the user's current session and clear any refresh tokens.")]),t._v(" "),a("p",[t._v("The method then removes the access token and ID token cookies from the browser.")])])]),t._v(" "),a("h3",{attrs:{id:"redirect-after-logout"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#redirect-after-logout"}},[t._v("#")]),t._v(" Redirect after logout")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("Once the user's session has been invalidated and their tokens have been cleared from the browser, the browser is redirected to your account's "),a("RouterLink",{attrs:{to:"/guide/glossary.html#after-logout-path"}},[t._v("After-logout path")]),t._v(".")],1),t._v(" "),a("p",[t._v("If the user is not logged in and "),a("code",[t._v("Userfront.logout()")]),t._v(" is called, the browser will not be redirected.")])])])],1)}),[],!1,null,null,null);s.default=e.exports}}]);