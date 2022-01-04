(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{624:function(t,s,a){"use strict";a.r(s);var e=a(39),n=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"tokens-and-access-control"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tokens-and-access-control"}},[t._v("#")]),t._v(" Tokens and access control")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("When a user sign into your application, Userfront issues them a "),a("strong",[t._v("JWT access token")]),t._v(".")]),t._v(" "),a("p",[t._v("You can send this JWT access token to your backend with each request to determine who the user is and what they can access.")])])]),t._v(" "),a("h2",{attrs:{id:"access-token-flow"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#access-token-flow"}},[t._v("#")]),t._v(" Access token flow")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("The token flow is as follows:")]),t._v(" "),a("ol",[a("li",[a("p",[a("strong",[a("a",{attrs:{href:"#user-signup-and-login"}},[t._v("User signs up or logs in")])]),t._v(": Your signup or login form sends a request to Userfront, which returns their JWT access token and saves it as a cookie.")])]),t._v(" "),a("li",[a("p",[a("strong",[a("a",{attrs:{href:"#sending-the-jwt-access-token"}},[t._v("Send access token to your server")])]),t._v(": Your frontend code should send the access token with each request, and your server should verify the access token before responding.")])])])])]),t._v(" "),a("p",[a("img",{attrs:{src:"https://res.cloudinary.com/component/image/upload/v1616013076/permanent/userfront-diagram.png",alt:"Userfront token flow"}})]),t._v(" "),a("h2",{attrs:{id:"user-signup-and-login"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#user-signup-and-login"}},[t._v("#")]),t._v(" User signup and login")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("You can use pre-made signup and login forms or build your own forms: see the "),a("a",{attrs:{href:"/guide/toolkit"}},[t._v("Toolkit")]),t._v(" section for how to do this.")]),t._v(" "),a("p",[t._v("When you use a toolkit form or the Userfront core JS library, the user's JWT access token is automatically saved in the browser as a cookie named "),a("access-token-name",{attrs:{"use-account-id":"true"}})],1)])]),t._v(" "),a("h2",{attrs:{id:"sending-the-jwt-access-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sending-the-jwt-access-token"}},[t._v("#")]),t._v(" Sending the JWT access token")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("Your frontend can send the JWT access token directly as a cookie, or you can include the access token in the header of your API requests.")])])]),t._v(" "),a("h4",{attrs:{id:"sending-as-a-cookie"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sending-as-a-cookie"}},[t._v("#")]),t._v(" Sending as a cookie")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("The JWT access token is automatically included as a cookie with each request when a user browses your website.")]),t._v(" "),a("p",[t._v("The cookie is named "),a("access-token-name",{attrs:{"use-account-id":"true"}})],1)]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"card"},[a("h4",{attrs:{id:"cookie-name"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#cookie-name"}},[t._v("#")]),t._v(" Cookie name")]),t._v(" "),a("p",[a("access-token-name",{attrs:{"use-account-id":"true"}})],1)])])]),t._v(" "),a("h4",{attrs:{id:"sending-as-a-bearer-token-api-calls"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sending-as-a-bearer-token-api-calls"}},[t._v("#")]),t._v(" Sending as a bearer token (API calls)")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("For API calls, you can include the JWT access token in the request header.")]),t._v(" "),a("p",[t._v("To do this, you can read the cookie by name or use "),a("RouterLink",{attrs:{to:"/docs/js.html#tokens-accesstoken"}},[t._v("Userfront.tokens.accessToken")]),t._v(".")],1)]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("fetch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://api.example.com'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  method"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'GET'")]),t._v("\n  headers"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Content-Type'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'application/json'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Authorization'")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("Bearer ")]),a("span",{pre:!0,attrs:{class:"token interpolation"}},[a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("${")]),t._v("Userfront"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tokens"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("accessToken"),a("span",{pre:!0,attrs:{class:"token interpolation-punctuation punctuation"}},[t._v("}")])]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),a("h2",{attrs:{id:"verify-the-jwt-access-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#verify-the-jwt-access-token"}},[t._v("#")]),t._v(" Verify the JWT access token")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("Your server can verify each incoming JWT access token to prove that the token is authentic.")]),t._v(" "),a("p",[t._v("You do this using a JWT library along with your account's JWT public key.")])]),t._v(" "),a("div",{staticClass:"right"},[a("p",[a("RouterLink",{attrs:{to:"/guide/auth/jwt-json-web-token.html"}},[t._v("Learn about JWT structure")])],1)])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("The JWT access token is a JSON Web Token (JWT) signed with the RSA algorithm (RS256), using a signing key specific to your account.")])]),t._v(" "),a("div",{staticClass:"right"},[a("token",{attrs:{title:"Example JWT access token",value:"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjU1MjRhZWQ1LTdmZjktNGNiYi1hZGM4LWZlMTVjOTMxNWIwNiJ9.eyJtb2RlIjoidGVzdCIsInRlbmFudElkIjoiZGVtbzEyMzQiLCJ1c2VySWQiOjM2LCJ1c2VyVXVpZCI6Ijk2M2JmODk1LTFlNTEtNGQ4Yi04ZDk3LTk4Y2VjNjg3ZjQwZCIsImlzQ29uZmlybWVkIjpmYWxzZSwiYXV0aG9yaXphdGlvbiI6eyJkZW1vMTIzNCI6eyJyb2xlcyI6WyJtZW1iZXIiXX19LCJzZXNzaW9uSWQiOiIzZWJkMjhjMS03ZTEzLTRiNWMtYTJlMS04ODczZWU3NzYwMDUiLCJpYXQiOjE2Mjg4NzAzNzksImV4cCI6MTYzMTQ2MjM3OX0.lLRV3wTprz1-xrzdpTG8siMv8gsaFHH22-UCWotzuU2cWHAreNFBtG9tn-674AVPKcz5GEXVBInix_eIi7nYhU05QrvTQpmj93K5R4WzC6T8ypl-SBXs_UUIBJnxCWdkyO47XFkTiUiV-_F67s-qjjGUYVDR7CC4Q0L1ohnZsTJaToEodb_5OMCckwAWM248uECSQZI0Ip4hJrv_QAMNad3uVlZItL7RMrLoGGBrCPYQn30wcy6XGFs6jAE5G4uLg4LNe_I7xsBzeGDRqoQr5_1dc44_KOFss5zPND1mxlkvkKfXVbf6gqfri5oiR7B0Iya5Bhi3_PsJ2TI5eYj3UA"}})],1)]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("To verify a JWT access token, use a JWT library along with your account's JWT public key (found in your dashboard under Settings).")])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"card"},[a("h4",{attrs:{id:"popular-jwt-libraries"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#popular-jwt-libraries"}},[t._v("#")]),t._v(" Popular JWT libraries")]),t._v(" "),a("ul",[a("li",[a("a",{attrs:{href:"https://github.com/auth0/node-jsonwebtoken",target:"_blank",rel:"noopener noreferrer"}},[t._v("Node.js"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/jwt-dotnet/jwt",target:"_blank",rel:"noopener noreferrer"}},[t._v(".NET"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/firebase/php-jwt",target:"_blank",rel:"noopener noreferrer"}},[t._v("PHP"),a("OutboundLink")],1)]),t._v(" "),a("li",[a("RouterLink",{attrs:{to:"/guide/auth/jwt-libraries.html"}},[t._v("See more")])],1)])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Example with Node.js")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" jwt "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"jsonwebtoken"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" publicKey "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAodD/IEagav7wlBX+k30YOSFpYT0u7AtV3ljwC52ShCFFGVvw86T5\nVTbg5Q/L/dgQT0+OZi+Fe/aAIL6j+3d8+Md5nGg7zqTv33GE7tN4ZoSkYnPMAm1I\nPjkOevpia98u8n1jWE/OnDnQqgozcy2zssGcJ1+QwJWuZWVObbFiA6ppFlyb9Hm8\n2wEgvBqjuTqCvLdJO5CtY5ya5OpGLpnqlsXTRgJEEFk0VTdH56ztcLFMDMxm4OVW\naWy+i4YieTRRKnbyT7fzDPiZupkcg2jwVF49CtyB9UWtE/+/BAKtJtBLfdZ5X1dK\nRqesE10ysVdGxeyeRpyFltEfF5QWAzn99wIDAQAB\n-----END RSA PUBLIC KEY-----")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Verify the token")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" verifiedPayload "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" jwt"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("verify")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("accessToken"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" publicKey"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  algorithms"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"RS256"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),a("h4",{attrs:{id:"access-token-payload"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#access-token-payload"}},[t._v("#")]),t._v(" Access token payload")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("The verified access token payload is a JSON object with information about the user.")]),t._v(" "),a("p",[t._v("You can use this information to look up additional tables asssociated with the user or tenant, and to determine the user's access level.")])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// verifiedPayload =>")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  mode"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  tenantId"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"demo1234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  userId"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("36")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  userUuid"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"963bf895-1e51-4d8b-8d97-98cec687f40d"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  isConfirmed"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  authorization"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    demo1234"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      roles"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"member"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  sessionId"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"3ebd28c1-7e13-4b5c-a2e1-8873ee776005"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  iat"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1628870379")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  exp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1631462379")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),a("h2",{attrs:{id:"using-the-jwt-access-token-on-your-server"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#using-the-jwt-access-token-on-your-server"}},[t._v("#")]),t._v(" Using the JWT access token on your server")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("If the access token passes verification, your server can trust that it was signed by Userfront and contains accurate information.")]),t._v(" "),a("h4",{attrs:{id:"logged-in-or-out"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#logged-in-or-out"}},[t._v("#")]),t._v(" Logged in or out?")]),t._v(" "),a("p",[t._v("If a request has a valid JWT access token, you can consider the user as logged in.")])])]),t._v(" "),a("h4",{attrs:{id:"associated-user-information"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#associated-user-information"}},[t._v("#")]),t._v(" Associated user information")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("p",[t._v("To read or update information associated with the user on your own system, use the "),a("code",[t._v("userId")]),t._v(" or "),a("code",[t._v("userUuid")]),t._v(" from the access token payload along with a column in your database table. For example:")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("SELECT * FROM table_name WHERE user_id = 36;\n")])])]),a("h4",{attrs:{id:"access-control"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#access-control"}},[t._v("#")]),t._v(" Access control")]),t._v(" "),a("p",[t._v("To determine a user's level of access, your application can inspect the "),a("code",[t._v("authorization")]),t._v(" object in the access token payload, which looks like:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("authorization"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  demo1234"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    roles"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"member"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("p",[t._v("This object contains all of the tenants, roles, and permissions associated with a user.")]),t._v(" "),a("p",[t._v("Your application is responsible for determining what a given role or permission means in terms of what the user is allowed to do.")])]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"language-js extra-class"},[a("div",{staticClass:"highlight-lines"},[a("br"),a("br"),a("br"),a("br"),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("div",{staticClass:"highlighted"},[t._v(" ")]),a("br"),a("br"),a("br"),a("br"),a("br")]),a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// verifiedPayload =>")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  mode"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"test"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  tenantId"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"demo1234"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  userId"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("36")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  userUuid"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"963bf895-1e51-4d8b-8d97-98cec687f40d"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  isConfirmed"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  authorization"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    demo1234"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      roles"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"member"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  sessionId"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"3ebd28c1-7e13-4b5c-a2e1-8873ee776005"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  iat"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1628870379")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  exp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1631462379")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])]),t._v(" "),a("h2",{attrs:{id:"other-tokens"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#other-tokens"}},[t._v("#")]),t._v(" Other tokens")]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("h4",{attrs:{id:"id-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#id-token"}},[t._v("#")]),t._v(" ID token")]),t._v(" "),a("p",[t._v("The ID token contains additional data about the user and is intended for use directly in the browser.")]),t._v(" "),a("p",[t._v("Instead of accessing the ID token directly, you can use "),a("RouterLink",{attrs:{to:"/docs/js.html#user"}},[t._v("Userfront.user")]),t._v(".")],1)]),t._v(" "),a("div",{staticClass:"right"},[a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("You do not need to use the ID or refresh tokens directly.")])])])]),t._v(" "),a("div",{staticClass:"row"},[a("div",{staticClass:"left"},[a("h4",{attrs:{id:"refresh-token"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#refresh-token"}},[t._v("#")]),t._v(" Refresh token")]),t._v(" "),a("p",[t._v("The refresh token is used by the Userfront script to obtain new access and ID tokens.")]),t._v(" "),a("p",[t._v("Userfront automatically adds the refresh token to the browser.")]),t._v(" "),a("p",[t._v("If you have enabled the "),a("code",[t._v("httpOnly")]),t._v(" setting in live mode, you will not be able to view the refresh token in your browser. This is an additional security layer that prevents anyone from viewing or copying the refresh token.")])])])])}),[],!1,null,null,null);s.default=n.exports}}]);