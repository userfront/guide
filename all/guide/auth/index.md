# Tokens and Access Control

::::: row
:::: left

When a user sign into your application, Userfront issues them a **JWT access token**.

You can send this JWT access token to your backend with each request to determine who the user is and what they can access.

::::
:::::

## Access token flow

::::: row
:::: left

The token flow is as follows:

1. **[User signs up or logs in](#user-signup-and-login)**: Your signup or login form sends a request to Userfront, which returns their JWT access token and saves it as a cookie.

2. **[Send access token to your server](#sending-the-jwt-access-token)**: Your frontend code should send the access token with each request, and your server should verify the access token before responding.

::::
:::::

![Userfront token flow](https://res.cloudinary.com/component/image/upload/v1616013076/permanent/userfront-diagram.png)

## User signup and login

::::: row
:::: left

You can use pre-made signup and login forms or build your own forms: see the [Toolkit](/guide/toolkit) section for how to do this.

The JWT access token is automatically saved in the browser as a cookie named <access-token-name use-account-id="true"/>

::::
:::::

## Sending the JWT access token

::::: row
:::: left

Your frontend can send the JWT access token directly as a cookie, or you can include the access token in the header of your API requests.

::::
:::::

#### Sending as a cookie

::::: row
:::: left

The JWT access token is automatically included as a cookie with each request when a user browses your website.

The cookie is named <access-token-name use-account-id="true"/>

::::
:::: right

::: card

#### Cookie name

<p>
  <access-token-name use-account-id="true"/>
</p>
:::

::::
:::::

#### Sending as a bearer token (API calls)

::::: row
:::: left

For API calls, you can include the JWT access token in the request header.

To do this, you can read the cookie by name or use [Userfront.tokens.accessToken](/docs/js.html#tokens-accesstoken).

::::
:::: right

```js
fetch('https://api.example.com', {
  method: 'GET'
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${Userfront.tokens.accessToken}`
  }
});
```

::::
:::::

## Verify the JWT access token

::::: row
:::: left

Your server can verify each incoming JWT access token to prove that the token is authentic.

You do this using a JWT library along with your account's JWT public key.

::::
:::: right
[Learn about JWT structure](https://userfront.com/guide/jwt-json-web-token.html)
::::
:::::

::::: row
:::: left

The JWT access token is a JSON Web Token (JWT) signed with the RSA algorithm (RS256), using a signing key specific to your account.

::::
:::: right
<token title="Example JWT access token" value="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjU1MjRhZWQ1LTdmZjktNGNiYi1hZGM4LWZlMTVjOTMxNWIwNiJ9.eyJtb2RlIjoidGVzdCIsInRlbmFudElkIjoiZGVtbzEyMzQiLCJ1c2VySWQiOjM2LCJ1c2VyVXVpZCI6Ijk2M2JmODk1LTFlNTEtNGQ4Yi04ZDk3LTk4Y2VjNjg3ZjQwZCIsImlzQ29uZmlybWVkIjpmYWxzZSwiYXV0aG9yaXphdGlvbiI6eyJkZW1vMTIzNCI6eyJyb2xlcyI6WyJtZW1iZXIiXX19LCJzZXNzaW9uSWQiOiIzZWJkMjhjMS03ZTEzLTRiNWMtYTJlMS04ODczZWU3NzYwMDUiLCJpYXQiOjE2Mjg4NzAzNzksImV4cCI6MTYzMTQ2MjM3OX0.lLRV3wTprz1-xrzdpTG8siMv8gsaFHH22-UCWotzuU2cWHAreNFBtG9tn-674AVPKcz5GEXVBInix_eIi7nYhU05QrvTQpmj93K5R4WzC6T8ypl-SBXs_UUIBJnxCWdkyO47XFkTiUiV-_F67s-qjjGUYVDR7CC4Q0L1ohnZsTJaToEodb_5OMCckwAWM248uECSQZI0Ip4hJrv_QAMNad3uVlZItL7RMrLoGGBrCPYQn30wcy6XGFs6jAE5G4uLg4LNe_I7xsBzeGDRqoQr5_1dc44_KOFss5zPND1mxlkvkKfXVbf6gqfri5oiR7B0Iya5Bhi3_PsJ2TI5eYj3UA" />

::::
:::::

::::: row
:::: left

To verify a JWT access token, use a JWT library along with your account's JWT public key (found in your dashboard under Settings).

::::
:::: right
::: card

#### Popular JWT libraries

- [Node.js](https://github.com/auth0/node-jsonwebtoken)
- [.NET](https://github.com/jwt-dotnet/jwt)
- [PHP](https://github.com/firebase/php-jwt)
- [See more](/guide/auth/jwt-libraries.html)

:::

```js
// Example with Node.js

const jwt = require("jsonwebtoken");

const publicKey = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAodD/IEagav7wlBX+k30YOSFpYT0u7AtV3ljwC52ShCFFGVvw86T5
VTbg5Q/L/dgQT0+OZi+Fe/aAIL6j+3d8+Md5nGg7zqTv33GE7tN4ZoSkYnPMAm1I
PjkOevpia98u8n1jWE/OnDnQqgozcy2zssGcJ1+QwJWuZWVObbFiA6ppFlyb9Hm8
2wEgvBqjuTqCvLdJO5CtY5ya5OpGLpnqlsXTRgJEEFk0VTdH56ztcLFMDMxm4OVW
aWy+i4YieTRRKnbyT7fzDPiZupkcg2jwVF49CtyB9UWtE/+/BAKtJtBLfdZ5X1dK
RqesE10ysVdGxeyeRpyFltEfF5QWAzn99wIDAQAB
-----END RSA PUBLIC KEY-----`;

// Verify the token
const verifiedPayload = jwt.verify(accessToken, publicKey, {
  algorithms: ["RS256"],
});
```

::::
:::::

### Access token payload

::::: row
:::: left

The verified access token payload will look something like this:

::::
:::::

```json
{
  "mode": "test",
  "tenantId": "demo1234",
  "userId": 36,
  "userUuid": "963bf895-1e51-4d8b-8d97-98cec687f40d",
  "isConfirmed": false,
  "authorization": {
    "demo1234": {
      "roles": ["member"]
    }
  },
  "sessionId": "3ebd28c1-7e13-4b5c-a2e1-8873ee776005",
  "iat": 1628870379,
  "exp": 1631462379
}
```

You can use this information to look up additional tables asssociated with the user or tenant, and to determine the user's access level.

#### Usage on your server

When you send the access token to your server, your backend should verify that the JWT is valid by using the JWT Public Key (found in your dashboard under account Settings).

If the access token is valid and not expired, your server can trust that it was signed by Userfront and contains accurate information.

To determine a user's level of access, your application can inspect the `authorization` object in the access token payload, which looks like:

```json
"authorization": {
  "nz569yb7": {
    "roles": ["admin"]
  }
}
```

This object contains all of the tenants, roles, and permissions associated with a user.

:::tip
Your application is responsible for determining what a given role or permission means in terms of what the user is allowed to do.
:::

#### In the user's browser

Userfront tools automatically add the access token to the browser as a cookie named `access.ACCOUNT_ID`.

Your application code can read and send this access token the same way it would read any other cookie.

## Other tokens

:::tip
The ID token is intended for use directly in the browser. To authenticate the user with your server, use the access token.
:::

## Refresh token

The refresh token is used by the Userfront script to obtain new access and ID tokens. Userfront tools automatically add the refresh token to the browser as a cookie named `refresh.ACCOUNT_ID`.

:::tip
You do not need to use the refresh token directly.
:::
