# Tokens and Access Control

::::: row
:::: left

When a user logs into your application, they are issued a JWT access token.

You can use the JWT access token to determine what the user can access on your server.

::::
:::::

## Access token flow

::::: row
:::: left

When a user logs into your application:

1. Your signup or login form sends a request to Userfront, which returns their JWT access token and saves it as a cookie.

2. From then on, your frontend code should [send the access token](#sending-the-access-token) with each request, and your server should [verify the access token](#verifying-the-access-token) before responding.

::::
:::::

![Userfront token flow](https://res.cloudinary.com/component/image/upload/v1616013076/permanent/userfront-diagram.png)

## Sending the access token

::::: row
:::: left

The JWT access token is automatically saved in the browser as a cookie named <access-token-name use-account-id="true"/>

Your application can read and send this cookie the same way it would for any other cookie.

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

::::: row
:::: left

For API calls, you can use [Userfront.tokens.accessToken](/docs/js.html#tokens-accesstoken) to include the access token.

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

## Verifying the access token

::::: row
:::: left

Your server can verify each incoming JWT access token by using a JWT library along with your account's JWT public key.

The access token is a JSON Web Token ([JWT](/guide/jwt-json-web-token.html)) signed with the RSA algorithm (RS256) using a signing key specific to your account.

Once your server verifies the access token, your server can use the access token payload to determine what the user can access.

::::
:::: right

<token title="Example JWT access token" value="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjU1MjRhZWQ1LTdmZjktNGNiYi1hZGM4LWZlMTVjOTMxNWIwNiJ9.eyJtb2RlIjoidGVzdCIsInRlbmFudElkIjoiZGVtbzEyMzQiLCJ1c2VySWQiOjM2LCJ1c2VyVXVpZCI6Ijk2M2JmODk1LTFlNTEtNGQ4Yi04ZDk3LTk4Y2VjNjg3ZjQwZCIsImlzQ29uZmlybWVkIjpmYWxzZSwiYXV0aG9yaXphdGlvbiI6eyJkZW1vMTIzNCI6eyJyb2xlcyI6WyJtZW1iZXIiXX19LCJzZXNzaW9uSWQiOiIzZWJkMjhjMS03ZTEzLTRiNWMtYTJlMS04ODczZWU3NzYwMDUiLCJpYXQiOjE2Mjg4NzAzNzksImV4cCI6MTYzMTQ2MjM3OX0.lLRV3wTprz1-xrzdpTG8siMv8gsaFHH22-UCWotzuU2cWHAreNFBtG9tn-674AVPKcz5GEXVBInix_eIi7nYhU05QrvTQpmj93K5R4WzC6T8ypl-SBXs_UUIBJnxCWdkyO47XFkTiUiV-_F67s-qjjGUYVDR7CC4Q0L1ohnZsTJaToEodb_5OMCckwAWM248uECSQZI0Ip4hJrv_QAMNad3uVlZItL7RMrLoGGBrCPYQn30wcy6XGFs6jAE5G4uLg4LNe_I7xsBzeGDRqoQr5_1dc44_KOFss5zPND1mxlkvkKfXVbf6gqfri5oiR7B0Iya5Bhi3_PsJ2TI5eYj3UA" />

::: card

#### Example public key

<pre class="light-code"><code>-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAodD/IEagav7wlBX+k30YOSFpYT0u7AtV3ljwC52ShCFFGVvw86T5
VTbg5Q/L/dgQT0+OZi+Fe/aAIL6j+3d8+Md5nGg7zqTv33GE7tN4ZoSkYnPMAm1I
PjkOevpia98u8n1jWE/OnDnQqgozcy2zssGcJ1+QwJWuZWVObbFiA6ppFlyb9Hm8
2wEgvBqjuTqCvLdJO5CtY5ya5OpGLpnqlsXTRgJEEFk0VTdH56ztcLFMDMxm4OVW
aWy+i4YieTRRKnbyT7fzDPiZupkcg2jwVF49CtyB9UWtE/+/BAKtJtBLfdZ5X1dK
RqesE10ysVdGxeyeRpyFltEfF5QWAzn99wIDAQAB
-----END RSA PUBLIC KEY-----</code></pre>

:::

::::
:::::

### Access token payload

The actual access token will look something like this:


This is a signed JWT; you can learn about the signing process [here](/guide/jwt-json-web-token.html).

When you decode the access token using a JWT library, the access token payload looks like:

```json
{
  "mode": "live",
  "userId": 99,
  "userUuid": "51a0d840-ffcd-457e-8676-0ab890008cc5",
  "tenantId": "nz569yb7",
  "isConfirmed": true,
  "authorization": {
    "nz569yb7": {
      "roles": ["admin"]
    }
  },
  "sessionId": "9cd533f8-0a4c-43a3-9b9d-a9382231a7f2",
  "iat": 1602104109,
  "exp": 1604696109
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
