(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{635:function(e,t,a){"use strict";a.r(t);var s=a(39),o=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"glossary"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#glossary"}},[e._v("#")]),e._v(" Glossary")]),e._v(" "),a("h3",{attrs:{id:"access-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#access-token"}},[e._v("#")]),e._v(" Access token")]),e._v(" "),a("p",[e._v("Access tokens define what a user can access on your server.")]),e._v(" "),a("p",[e._v("When a user signs up or logs into your application, they receive an access token in their browser as a cookie. Your frontend should send this access token to your server, and your server should verify and decode the access token to determine which user is making the request along with what they are allowed to do.")]),e._v(" "),a("p",[e._v("For more information about how to use access tokens, see "),a("RouterLink",{attrs:{to:"/guide/auth/#jwt-access-token"}},[e._v("Tokens & Access")]),e._v(".")],1),e._v(" "),a("h3",{attrs:{id:"account-id"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#account-id"}},[e._v("#")]),e._v(" Account ID")]),e._v(" "),a("p",[e._v("The ID for your account. The account token can be found in the URL when you are logged into the Userfront dashboard:")]),e._v(" "),a("p",[a("code",[e._v("https://userfront.com/projects/ { accountId } /users")])]),e._v(" "),a("p",[e._v("Account IDs are a type of "),a("a",{attrs:{href:"#tenant-id"}},[e._v("tenant ID")]),e._v(", which are 8-character alphanumeric IDs, like "),a("code",[e._v("a1b2c3d4")]),e._v(".")]),e._v(" "),a("h3",{attrs:{id:"after-login-path"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#after-login-path"}},[e._v("#")]),e._v(" After-login path")]),e._v(" "),a("p",[e._v("Where users should be redirected upon logging in.")]),e._v(" "),a("p",[e._v("Defaults to "),a("code",[e._v("/dashboard")]),e._v(".")]),e._v(" "),a("p",[e._v("Can be edited in your account's Settings tab.")]),e._v(" "),a("h3",{attrs:{id:"after-logout-path"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#after-logout-path"}},[e._v("#")]),e._v(" After-logout path")]),e._v(" "),a("p",[e._v("Where users should be redirected upon logging out.")]),e._v(" "),a("p",[e._v("Defaults to "),a("code",[e._v("/login")]),e._v(".")]),e._v(" "),a("p",[e._v("Can be edited in your account's Settings tab.")]),e._v(" "),a("h3",{attrs:{id:"after-signup-path"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#after-signup-path"}},[e._v("#")]),e._v(" After-signup path")]),e._v(" "),a("p",[e._v("Where users should be redirected upon signing up.")]),e._v(" "),a("p",[e._v("Defaults to your "),a("a",{attrs:{href:"#after-login-path"}},[e._v("After-login path")]),e._v(".")]),e._v(" "),a("p",[e._v("Can be edited in your account's Settings tab.")]),e._v(" "),a("h3",{attrs:{id:"id-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#id-token"}},[e._v("#")]),e._v(" ID token")]),e._v(" "),a("p",[e._v("ID tokens have information about the user for frontend display purposes.")]),e._v(" "),a("p",[e._v("When a user signs up or logs into your application, they receive an ID token in their browser as a cookie. Your frontend can read this cookie for information such as the user's email address, image, name, and more.")]),e._v(" "),a("p",[e._v("For more information about how to use ID tokens, see "),a("RouterLink",{attrs:{to:"/guide/auth/#id-token"}},[e._v("Tokens & Access")]),e._v(".")],1),e._v(" "),a("h3",{attrs:{id:"json-web-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#json-web-token"}},[e._v("#")]),e._v(" JSON Web Token")]),e._v(" "),a("p",[e._v("A type of signed, secure token that contains information in the form of an encoded JSON object.")]),e._v(" "),a("p",[e._v("For more information, see the section about "),a("RouterLink",{attrs:{to:"/guide/auth/jwt-json-web-token.html"}},[e._v("JSON Web Tokens (JWTs)")]),e._v(".")],1),e._v(" "),a("h3",{attrs:{id:"jwt"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#jwt"}},[e._v("#")]),e._v(" JWT")]),e._v(" "),a("p",[e._v("Acronym for "),a("a",{attrs:{href:"#json-web-token"}},[e._v("JSON Web Token")]),e._v('. JWT is pronounced "jot".')]),e._v(" "),a("h3",{attrs:{id:"password-reset-path"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#password-reset-path"}},[e._v("#")]),e._v(" Password reset path")]),e._v(" "),a("p",[e._v("Where users should be redirected to reset their password after clicking the link in the reset email.")]),e._v(" "),a("p",[e._v("Defaults to "),a("code",[e._v("/reset")]),e._v(".")]),e._v(" "),a("p",[e._v("Can be edited in your account's Settings tab.")]),e._v(" "),a("h3",{attrs:{id:"refresh-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#refresh-token"}},[e._v("#")]),e._v(" Refresh token")]),e._v(" "),a("p",[e._v("Refresh tokens are used to obtain new access and ID tokens.")]),e._v(" "),a("p",[e._v("You do not need to use refresh tokens directly.")]),e._v(" "),a("h3",{attrs:{id:"rsa"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rsa"}},[e._v("#")]),e._v(" RSA")]),e._v(" "),a("p",[e._v("RSA is an algorithm used for signing tokens. The algorithm uses a public key, which can be shared with anyone so that they can verify the token is authentic, and a private key, which is known only to the token creator, and is used to create tokens.")]),e._v(" "),a("p",[e._v("Userfront uses RSA to sign your users' access tokens and ID tokens.")]),e._v(" "),a("p",[e._v("You can find your public RSA key(s) in the Settings section of the Userfront dashboard. Userfront maintains your private RSA keys in a secure manner.")]),e._v(" "),a("h3",{attrs:{id:"tenant-id"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tenant-id"}},[e._v("#")]),e._v(" Tenant ID")]),e._v(" "),a("p",[e._v("The ID for a tenant within your account. Your tenants can be found in the Access Control tab of the Userfront dashboard.")]),e._v(" "),a("p",[e._v("Tenant IDs are 8-character alphanumeric IDs, like "),a("code",[e._v("a1b2c3d4")]),e._v(".")])])}),[],!1,null,null,null);t.default=o.exports}}]);