(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{374:function(s,t,e){"use strict";e.r(t);var a=e(42),r=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"jwt-structure-keys"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#jwt-structure-keys"}},[s._v("#")]),s._v(" JWT structure & keys")]),s._v(" "),e("h2",{attrs:{id:"access-token"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#access-token"}},[s._v("#")]),s._v(" Access token")]),s._v(" "),e("p",[s._v("When a user signs up or logs in, they receive a "),e("a",{attrs:{href:"/jwt-json-web-token"}},[s._v("JWT")]),s._v(" access token in their browser as a cookie for your domain. Your application can use this token to authenticate and authorize the user.")]),s._v(" "),e("p",[s._v("The token's payload is:")]),s._v(" "),e("div",{staticClass:"language-json extra-class"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"userId"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("99")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"username"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"someuser"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"uuid"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"3b22a243-7dd3-50a3-c9b4-9d1bbc96188b"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"project"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"PROJECT_ID"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"authorization"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"member"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"createdAt"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2020-01-01T00:00:01.000Z"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"confirmed"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"isDev"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"iat"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1593649607")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"exp"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token number"}},[s._v("1596241607")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])])]),e("p",[s._v("This information is encoded into a JWT and added as a cookie named "),e("code",[s._v("access.PROJECT_ID")]),s._v(", where PROJECT_ID is your project's ID.")]),s._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",{staticClass:"custom-block-title"},[s._v("TIP")]),s._v(" "),e("p",[s._v("Your project ID is in the URL for your project:\n"),e("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1583347563/guide/project_id_ilsrsa.png",alt:"Project ID"}})]),s._v(" "),e("p",[s._v("In this example, the JWT cookie would be named "),e("code",[s._v("access.n8bjqqx7")])])]),s._v(" "),e("p",[s._v("The actual JWT looks like this:")]),s._v(" "),e("div",{staticClass:"language- extra-class"},[e("pre",{pre:!0,attrs:{class:"language-text"}},[e("code",[s._v("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5LCJ1c2Vybm\nFtZSI6InNvbWV1c2VyIiwidXVpZCI6IjNiMjJhMjQzLTdkZDMtNTBhMy1jOWI0L\nTlkMWJiYzk2MTg4YiIsInByb2plY3QiOiJQUk9KRUNUX0lEIiwiYXV0aG9yaXph\ndGlvbiI6Im1lbWJlciIsImNyZWF0ZWRBdCI6IjIwMjAtMDEtMDFUMDA6MDA6MDE\nuMDAwWiIsImNvbmZpcm1lZCI6dHJ1ZSwiaXNEZXYiOmZhbHNlLCJpYXQiOjE1OT\nM2NDk2MDcsImV4cCI6MTU5NjI0MTYwN30.QQPTMEDrJ6FFuBJ8sCZCZZIjDZvpA\n85dI-EImILTG5g\n")])])]),e("p",[s._v("This is a signed JWT; you can learn about the signing process "),e("a",{attrs:{href:"/jwt-json-web-token"}},[s._v("here")]),s._v(".")]),s._v(" "),e("h2",{attrs:{id:"signing-keys"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#signing-keys"}},[s._v("#")]),s._v(" Signing keys")]),s._v(" "),e("p",[s._v("Your server can validate incoming JWTs with the signing keys for your project.")]),s._v(" "),e("p",[s._v("Visit "),e("code",[s._v("Settings > JWT signing keys")]),s._v(" in your Userfront dashboard to see the production and development keys for your project:")]),s._v(" "),e("p",[e("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1593723890/permanent/jwt-keys.png",alt:"JWT signing keys"}})]),s._v(" "),e("p",[s._v("These are the keys Userfront uses when creating your JWTs. Your application can use these keys to verify incoming JWTs.")])])}),[],!1,null,null,null);t.default=r.exports}}]);