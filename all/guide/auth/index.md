# Tokens and Access Control

::::: row
:::: left

When a user logs into your application, they are issued a [JWT access token](#jwt-access-token).

You can use the JWT access token to determine what the user can access on your server.

The access token is a JSON Web Token ([JWT](/guide/jwt-json-web-token.html)) signed using the RSA algorithm (RS256), with a signing key specific to your account.

::::
:::::

## JWT access token

::::: row
:::: left

You can use the access token to determine what the user can access on your server.

Your application should send this token to your server, which will verify and decode the access token and then use the access token payload to determine what the user can access.

::::
:::: right

<token title="Example JWT access token" value="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjU1MjRhZWQ1LTdmZjktNGNiYi1hZGM4LWZlMTVjOTMxNWIwNiJ9.eyJtb2RlIjoidGVzdCIsInRlbmFudElkIjoiZGVtbzEyMzQiLCJ1c2VySWQiOjM2LCJ1c2VyVXVpZCI6Ijk2M2JmODk1LTFlNTEtNGQ4Yi04ZDk3LTk4Y2VjNjg3ZjQwZCIsImlzQ29uZmlybWVkIjpmYWxzZSwiYXV0aG9yaXphdGlvbiI6eyJkZW1vMTIzNCI6eyJyb2xlcyI6WyJtZW1iZXIiXX19LCJzZXNzaW9uSWQiOiIzZWJkMjhjMS03ZTEzLTRiNWMtYTJlMS04ODczZWU3NzYwMDUiLCJpYXQiOjE2Mjg4NzAzNzksImV4cCI6MTYzMTQ2MjM3OX0.lLRV3wTprz1-xrzdpTG8siMv8gsaFHH22-UCWotzuU2cWHAreNFBtG9tn-674AVPKcz5GEXVBInix_eIi7nYhU05QrvTQpmj93K5R4WzC6T8ypl-SBXs_UUIBJnxCWdkyO47XFkTiUiV-_F67s-qjjGUYVDR7CC4Q0L1ohnZsTJaToEodb_5OMCckwAWM248uECSQZI0Ip4hJrv_QAMNad3uVlZItL7RMrLoGGBrCPYQn30wcy6XGFs6jAE5G4uLg4LNe_I7xsBzeGDRqoQr5_1dc44_KOFss5zPND1mxlkvkKfXVbf6gqfri5oiR7B0Iya5Bhi3_PsJ2TI5eYj3UA" />

::::
:::::

#### In the user's browser

Userfront tools automatically add the access token to the browser as a cookie named `access.ACCOUNT_ID`.

Your application code can read and send this access token the same way it would read any other cookie.

#### Contents

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

## ID token

You can use the ID token in the browser to avoid API calls for user information.

Your application should read the ID token from the browser's cookies, decode its JWT payload, and verify the token if desired.

#### In the user's browser

Userfront tools automatically add the ID token to the browser as a cookie named `id.ACCOUNT_ID`.

Your application code can read this ID token the same way it would read any other cookie.

#### Contents

The actual ID token will look something like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5LCJ1c2Vybm
FtZSI6InNvbWV1c2VyIiwidXVpZCI6IjNiMjJhMjQzLTdkZDMtNTBhMy1jOWI0L
TlkMWJiYzk2MTg4YiIsInByb2plY3QiOiJQUk9KRUNUX0lEIiwiYXV0aG9yaXph
dGlvbiI6Im1lbWJlciIsImNyZWF0ZWRBdCI6IjIwMjAtMDEtMDFUMDA6MDA6MDE
uMDAwWiIsImNvbmZpcm1lZCI6dHJ1ZSwiaXNEZXYiOmZhbHNlLCJpYXQiOjE1OT
M2NDk2MDcsImV4cCI6MTU5NjI0MTYwN30.QQPTMEDrJ6FFuBJ8sCZCZZIjDZvpA
85dI-EImILTG5g
```

This is a signed JWT; you can learn about the signing process [here](/guide/jwt-json-web-token.html).

When you decode the ID token using a JWT library, the ID token payload looks like:

```json
{
  "mode": "live",
  "userId": 99,
  "tenantId": "nz569yb7",
  "username": "your-user",
  "email": "youruser@example.com",
  "name": "Your User",
  "image": "https://example.com/user-image.png",
  "confirmedAt": "2020-02-28T18:41:58.292Z",
  "createdAt": "2019-12-10T20:09:21.565Z",
  "updatedAt": "2020-09-23T20:25:10.968Z",
  "sessionId": "9cd533f8-0a4c-43a3-9b9d-a9382231a7f2",
  "iat": 1602104109,
  "exp": 1604696109
}
```

This information can be used in your application to display the user's profile or other info while the user is logged in.

:::tip
The ID token is intended for use directly in the browser. To authenticate the user with your server, use the access token.
:::

## Refresh token

The refresh token is used by the Userfront script to obtain new access and ID tokens. Userfront tools automatically add the refresh token to the browser as a cookie named `refresh.ACCOUNT_ID`.

:::tip
You do not need to use the refresh token directly.
:::
