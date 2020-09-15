# JWT structure & keys

## Access token

When a user signs up or logs in, they receive a [JWT](/jwt-json-web-token) access token in their browser as a cookie for your domain. Your application can use this token to authenticate and authorize the user.

The token's payload is:

```json
{
  "userId": 99,
  "username": "someuser",
  "uuid": "3b22a243-7dd3-50a3-c9b4-9d1bbc96188b",
  "project": "PROJECT_ID",
  "authorization": "member",
  "createdAt": "2020-01-01T00:00:01.000Z",
  "confirmed": true,
  "isDev": false,
  "iat": 1593649607,
  "exp": 1596241607
}
```

This information is encoded into a JWT and added as a cookie named `access.PROJECT_ID`, where PROJECT_ID is your project's ID.

:::tip
Your project ID is in the URL for your project:
![Project ID](https://res.cloudinary.com/component/image/upload/v1583347563/guide/project_id_ilsrsa.png)

In this example, the JWT cookie would be named `access.n8bjqqx7`
:::

The actual JWT looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjk5LCJ1c2Vybm
FtZSI6InNvbWV1c2VyIiwidXVpZCI6IjNiMjJhMjQzLTdkZDMtNTBhMy1jOWI0L
TlkMWJiYzk2MTg4YiIsInByb2plY3QiOiJQUk9KRUNUX0lEIiwiYXV0aG9yaXph
dGlvbiI6Im1lbWJlciIsImNyZWF0ZWRBdCI6IjIwMjAtMDEtMDFUMDA6MDA6MDE
uMDAwWiIsImNvbmZpcm1lZCI6dHJ1ZSwiaXNEZXYiOmZhbHNlLCJpYXQiOjE1OT
M2NDk2MDcsImV4cCI6MTU5NjI0MTYwN30.QQPTMEDrJ6FFuBJ8sCZCZZIjDZvpA
85dI-EImILTG5g
```

This is a signed JWT; you can learn about the signing process [here](/jwt-json-web-token).

## Signing keys

Your server can validate incoming JWTs with the signing keys for your project.

Visit `Settings > JWT signing keys` in your Userfront dashboard to see the production and development keys for your project:

![JWT signing keys](https://res.cloudinary.com/component/image/upload/v1593723890/permanent/jwt-keys.png)

These are the keys Userfront uses when creating your JWTs. Your application can use these keys to verify incoming JWTs.
