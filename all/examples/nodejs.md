---
sidebar: auto
sidebarDepth: -1
---

# Node.js example

In this example, we show how to add authentication and access control to a basic Node.js application.

To use Userfront with a Node.js application, your backend server needs to read and verify JWT access tokens. After that, your code can determine how to respond to each request.

In this example, we have a server with 3 `GET` routes:

| Route        | Description                                                                                    |
| :----------- | :--------------------------------------------------------------------------------------------- |
| `/public`    | This route is accessible by anyone, whether they are logged in or not. It returns public data. |
| `/protected` | This route is accessible by any user who is logged in. It returns data specific to the user.   |
| `/admin`     | This route is only accessible by users with an `admin` role. It returns data for admins only.  |

We'll use Express.js for the routing, but other frameworks work in the same manner.

We cover each route below, along with an [interactive sample](#interactive-sample) at the end.

## Public route

No authentication or access controls are needed for the public route. Thus, the server code is straightforward:

```js
// Public route
app.get("/public", (req, res) => {
  res.send({
    data: "Public data",
    timestamp: new Date(),
  });
});
```

Response:

```json
{
  "data": "Public data",
  "timestamp": "2021-04-01T00:00:00.000Z"
}
```

## Protected route

To build a route that only logged-in users can view, we need the client (frontend) to include the user's [JWT access token](/guide/auth/#jwt-access-token) in the `authorization` header for the request.

Our server can then read the header and reject any requests without a valid JWT access token.

### Client (frontend)

The client should include the user's JWT access token in the `authorization` header of the request:

```js
fetch("https://auth.userfront.repl.co/protected", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoidGVzdCIsInRlbmFudElkIjoiZGVtbzEyMzQiLCJ1c2VySWQiOjIsInVzZXJVdWlkIjoiYTI3YzQyNDQtYjBjYy00ZWMzLWFjYzQtY2JjYzE5NTM1NDE2IiwiaXNDb25maXJtZWQiOnRydWUsImF1dGhvcml6YXRpb24iOnsiZGVtbzEyMzQiOnsidGVuYW50SWQiOiJkZW1vMTIzNCIsIm5hbWUiOiJFeGFtcGxlIHRlbmFudCIsInJvbGVzIjpbXSwicGVybWlzc2lvbnMiOltdfX0sInNlc3Npb25JZCI6ImV4YW1wbGUwLTg3MWEtMzhiYy05MThlLWNhYjgxZXhhbXBsZSIsImlhdCI6MTU5MjI5ODU1NSwiZXhwIjo5OTk5OTk5OTk5fQ.NFhDjUHc_SIh55w-yeFyVHUnh2ghe07i4Ky4aD0uoJkQPpSXfl0P9EPkjmaGf95mvWBGj5NjC5HvTfsYVfchK9g8fFUHk2iE3pNMzixGFn1ci1QIM-rxY3qCoPsaUlLSWbDxVtGK6_MNFeygPa8_6u2nQ8qVYFvHzN8-eQRoF5I",
  },
});
```

### Server (backend)

Our server route should read the `authorization` header for the request, then verify the JWT access token with the account's public key before responding. We are using the open source [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library to verify the token.

If the JWT access token is invalid or expired, we throw an error and return `Unauthorized`.

```js
const jwt = require("jsonwebtoken");

process.env.USERFRONT_JWT_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHmYqcLIIZ6G9aleXAWFm6rYEy8m
jbxGkXA23pMgd7lYwwgaTyh/V3RlHosS0Tp3a7rywulki7iYhN7NVmHSTPjm+4a9
C+ADVj+sMZnloa9hk0oBz+SN/i3CG/8LTN+ToR5j0CowF0Yl/Tze2Pm/qswgCVul
4ghWDVHmM4j/9T7RAgMBAAE=
-----END PUBLIC KEY-----`;

// Protected route
app.get("/protected", (req, res) => {
  try {
    // Read the JWT access token from the authorization header
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    // Verify the token using the account's JWT public key
    const verifiedPayload = jwt.verify(
      accessToken,
      process.env.USERFRONT_JWT_PUBLIC_KEY,
      { algorithms: ["RS256"] }
    );

    // Respond to the request
    res.send({
      data: `Data specific to user ${verifiedPayload.userId} (${verifiedPayload.userUuid}).`,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
      status: 401,
    });
  }
});
```

Response:

```json
{
  "data": "Data specific to user 2 (a27c4244-b0cc-4ec3-acc4-cbcc19535416).",
  "timestamp": "2021-04-01T00:00:00.000Z"
}
```

## Admin route

To build a route that only admin users can view, we need the client (frontend) to include the user's [JWT access token](/guide/auth/#jwt-access-token) in the `authorization` header for the request.

Our server can then read the header and reject any JWT access tokens that don't have the `admin` role.

### Client (frontend)

The client should include the user's JWT access token in the `authorization` header of the request:

```js
fetch("https://auth.userfront.repl.co/admin", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoidGVzdCIsInRlbmFudElkIjoiZGVtbzEyMzQiLCJ1c2VySWQiOjEsInVzZXJVdWlkIjoiYzYyZDZhM2UtMjhiMi00NmIwLWIwN2ItMzBmOGNlM2FlMGUzIiwiaXNDb25maXJtZWQiOnRydWUsImF1dGhvcml6YXRpb24iOnsiZGVtbzEyMzQiOnsidGVuYW50SWQiOiJkZW1vMTIzNCIsIm5hbWUiOiJFeGFtcGxlIHRlbmFudCIsInJvbGVzIjpbImFkbWluIl0sInBlcm1pc3Npb25zIjpbXX19LCJzZXNzaW9uSWQiOiJleGFtcGxlNy05MjdkLTQ2YjMtOGUwMC0wNDM0OGV4YW1wbGUiLCJpYXQiOjE1OTIyOTg1NTUsImV4cCI6OTk5OTk5OTk5OX0.NJzvR_6fD8fHumQXqIjAjtNsG2d8x9UkDieU9A86BYB8p6LLTbIJ1Goeo0FkmgZLYNY9ClZEVDKdNYVERY5R-Rzp9Ka_uAaQeMR510vRb3zkzB2b_qUXbzo3d4gbK9WdKmuBHkCp51iiXQlvpRfKRR5PQvzEiEe-LkjndD0zPj8",
  },
});
```

### Server (backend)

To restrict the route to admins only, we need to check that the JWT access token has the `admin` role.

Userfront's JWT access token look like this encoded:

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoidGVzdCIsInRlbmFudElkIjoiZGVtbzEyMzQiLCJ1c2VySWQiOjEsInVzZXJVdWlkIjoiYzYyZDZhM2UtMjhiMi00NmIwLWIwN2ItMzBmOGNlM2FlMGUzIiwiaXNDb25maXJtZWQiOnRydWUsImF1dGhvcml6YXRpb24iOnsiZGVtbzEyMzQiOnsidGVuYW50SWQiOiJkZW1vMTIzNCIsIm5hbWUiOiJFeGFtcGxlIHRlbmFudCIsInJvbGVzIjpbImFkbWluIl0sInBlcm1pc3Npb25zIjpbXX19LCJzZXNzaW9uSWQiOiJleGFtcGxlNy05MjdkLTQ2YjMtOGUwMC0wNDM0OGV4YW1wbGUiLCJpYXQiOjE1OTIyOTg1NTUsImV4cCI6OTk5OTk5OTk5OX0.NJzvR_6fD8fHumQXqIjAjtNsG2d8x9UkDieU9A86BYB8p6LLTbIJ1Goeo0FkmgZLYNY9ClZEVDKdNYVERY5R-Rzp9Ka_uAaQeMR510vRb3zkzB2b_qUXbzo3d4gbK9WdKmuBHkCp51iiXQlvpRfKRR5PQvzEiEe-LkjndD0zPj8
```

And the JWT access token's payload looks like this decoded:

```json
{
  "mode": "test",
  "tenantId": "demo1234",
  "userId": 1,
  "authorization": {
    "demo1234": {
      "roles": ["admin"]
    }
  },
  ...
}
```

So we want to check that the `payload.authorization[tenantId].roles` array contains the `admin` role.

As with the protected route, our server should read the `authorization` header for the request, then verify the JWT access token with the account's public key before responding. We are using the open source [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library to verify the token.

If the JWT access token is invalid, expired, or missing the `admin` role, we throw an error and return `Unauthorized`.

```js
const jwt = require("jsonwebtoken");

process.env.USERFRONT_JWT_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHmYqcLIIZ6G9aleXAWFm6rYEy8m
jbxGkXA23pMgd7lYwwgaTyh/V3RlHosS0Tp3a7rywulki7iYhN7NVmHSTPjm+4a9
C+ADVj+sMZnloa9hk0oBz+SN/i3CG/8LTN+ToR5j0CowF0Yl/Tze2Pm/qswgCVul
4ghWDVHmM4j/9T7RAgMBAAE=
-----END PUBLIC KEY-----`;

// Admin-only route
app.get("/admin", (req, res) => {
  try {
    // Read the JWT access token from the authorization header
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    // Verify the token using the RSA public key
    const verifiedPayload = jwt.verify(
      accessToken,
      process.env.USERFRONT_JWT_PUBLIC_KEY,
      { algorithms: ["RS256"] }
    );

    // Make sure the token has the 'admin' role
    const roles = verifiedPayload.authorization["demo1234"].roles;
    if (!roles.includes("admin")) {
      throw new Error("Unauthorized");
    }

    // Respond to the request
    res.send({
      data: `Data for admins only. Requestor has roles: ${roles.join(" & ")}.`,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
      status: 401,
    });
  }
});
```

Response:

```json
{
  "data": "Data for admins only. Requestor has roles: admin.",
  "timestamp": "2021-04-01T00:00:00.000Z"
}
```

## Interactive sample

The above routes are combined into a working sample.

Here you can make a request to a server running live code, which is shown below.

<request-maker
  url-root="https://auth.userfront.repl.co"
  route-name="Public"
  token-type="none">
</request-maker>

The live code for the server is available to clone:

<iframe height="1200px" width="100%" src="https://replit.com/@userfront/Nodejs-Authentication-and-Access-Control?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
