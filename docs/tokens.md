# Tokens

When a user logs into your application, they are issued 3 tokens:

| Name                            | Description                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------- |
| [Access token](#access-token)   | This token has information about the user's access levels.                    |
| [ID token](#id-token)           | This token has more detailed information about the user, such as their image. |
| [Refresh token](#refresh-token) | This token is used to obtain new Access & ID tokens.                          |

These 3 tokens are all [JWTs](/jwt-json-web-token.html) (JSON Web Tokens, pronounced "jots").

All tokens are signed using the RSA algorithm, with signing keys specific to your project.

## Access token

Your application can verify the access token and use it to determine what is accessible to the user on your server.

#### Contents

The token's payload looks like:

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

The actual JWT will look something like this:

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

#### In the user's browser

Userfront forms automatically add the access token to the browser as a cookie named `access.PROJECT_ID`.

Your application code can read and send this access token the same way it would read any other cookie.

#### Usage on your server

When you send the access token to your server, your backend should verify that the JWT is valid by using the JWT Public Key (found in your dashboard under project settings).

If the token is valid and not expired, your server can trust that it was signed by Userfront and contains accurate information.

To determine a user's level of access, your application can inspect the `authorization` object in the token payload, which looks like:

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
