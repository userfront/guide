# Tokens

When a user logs into your application, they are issued 3 tokens:

| Name                            | Description                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------- |
| [Access token](#access-token)   | This token has information about the user's access levels.                    |
| [ID token](#id-token)           | This token has more detailed information about the user, such as their image. |
| [Refresh token](#refresh-token) | This token is used to obtain new Access & ID tokens.                          |

These tokens are all [JWTs](/jwt-json-web-token.html) (JSON Web Tokens) signed using the RSA algorithm, with signing keys specific to your project.

## Access token

You can use the access token to determine what the user can access on your server.

Your application should send this token to your server, which will verify and decode the access token and then use the access token payload to determine what the user can access.

#### In the user's browser

Userfront tools automatically add the access token to the browser as a cookie named `access.PROJECT_ID`.

Your application code can read and send this access token the same way it would read any other cookie.

#### Contents

The actual access token will look something like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5LCJ1c2Vybm
FtZSI6InNvbWV1c2VyIiwidXVpZCI6IjNiMjJhMjQzLTdkZDMtNTBhMy1jOWI0L
TlkMWJiYzk2MTg4YiIsInByb2plY3QiOiJQUk9KRUNUX0lEIiwiYXV0aG9yaXph
dGlvbiI6Im1lbWJlciIsImNyZWF0ZWRBdCI6IjIwMjAtMDEtMDFUMDA6MDA6MDE
uMDAwWiIsImNvbmZpcm1lZCI6dHJ1ZSwiaXNEZXYiOmZhbHNlLCJpYXQiOjE1OT
M2NDk2MDcsImV4cCI6MTU5NjI0MTYwN30.QQPTMEDrJ6FFuBJ8sCZCZZIjDZvpA
85dI-EImILTG5g
```

This is a signed JWT; you can learn about the signing process [here](/jwt-json-web-token.html).

When you decode the access token using a JWT library, the access token payload looks like:

```json
{
  "mode": "live",
  "userId": 99,
  "tenantId": "nz569yb7",
  "username": "your-user",
  "email": "youruser@example.com",
  "isConfirmed": true,
  "authorization": {
    "nz569yb7": {
      "tenantId": "nz569yb7",
      "name": "Your application",
      "roles": ["admin"],
      "permissions": []
    }
  },
  "sessionId": "9cd533f8-0a4c-43a3-9b9d-a9382231a7f2",
  "iat": 1602104109,
  "exp": 1604696109
}
```

You can use this information to look up additional tables asssociated with the user or tenant, and to determine the user's access level.

#### Usage on your server

When you send the access token to your server, your backend should verify that the JWT is valid by using the JWT Public Key (found in your dashboard under project settings).

If the access token is valid and not expired, your server can trust that it was signed by Userfront and contains accurate information.

To determine a user's level of access, your application can inspect the `authorization` object in the access token payload, which looks like:

```js
authorization: {
  nz569yb7: {
    tenantId: "nz569yb7",
    name: "Your application",
    roles: ["admin"],
    permissions: []
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

Userfront tools automatically add the ID token to the browser as a cookie named `id.PROJECT_ID`.

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

This is a signed JWT; you can learn about the signing process [here](/jwt-json-web-token.html).

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

The refresh token is used by the Userfront script to obtain new access and ID tokens. Userfront tools automatically add the refresh token to the browser as a cookie named `refresh.PROJECT_ID`.

:::tip
You do not need to use the refresh token directly.
:::
