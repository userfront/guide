# Node.js example

In this example, we show how to add authentication and access control to a basic Node.js application.

We use Express.js for the routing, but other frameworks work in the same manner.

To use Userfront with a Node.js application, your backend server needs to read and verify JWT access tokens. After that, your code can determine how to respond to each request.

In this example, we have a server with 3 `GET` routes:

| Route        | Description                                                                                         |
| :----------- | :-------------------------------------------------------------------------------------------------- |
| `/public`    | This route is accessible by anyone, whether they are logged in or not. It only returns a timestamp. |
| `/protected` | This route is accessible by any user who is logged in. It returns data specific to the user.        |
| `/admin`     | This route is only accessible by users with an `admin` role. It returns data for admins only.       |

We cover each route below, along with an [interactive sample](#interactive-sample) at the end.

## Public route

No authentication or access controls are needed for the public route. Thus, the server code is straightforward:

```js
// Public route
app.get("/public", (req, res) => {
  res.send({
    timestamp: new Date(),
  });
});
```

Response:

```json
{
  "timestamp": "2021-04-01T00:00:00.000Z"
}
```

## Protected route

To build a route that only logged-in users can view, we need the client (frontend) to include the user's JWT access token in the `authorization` header for the request.

Our server can then read the header and reject any requests without a valid JWT access token.

### Client (frontend)

The client should include the user's JWT access token in the `authorization` header of the request:

```
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoidGVzdCIsImlzQ29uZmlybWVkIjp0cnVlLCJ1c2VySWQiOjEsInVzZXJVdWlkIjoiYWI1M2RiZGMtYmIxYS00ZDRkLTllZGYtNjgzYTZjYTNmNjA5IiwidGVuYW50SWQiOiJkZW1vMTIzNCIsInNlc3Npb25JZCI6IjBhZTI3NjI3LWEyMjYtNGQxMS04Yzk0LTMyYjliYmEzZjI4NSIsImF1dGhvcml6YXRpb24iOnsiZGVtbzEyMzQiOnsidGVuYW50SWQiOiJkZW1vMTIzNCIsIm5hbWUiOiJEZW1vIFByb2plY3QiLCJyb2xlcyI6WyJ2aWV3ZXIiLCJtZW1iZXIiLCJhZG1pbiJdLCJwZXJtaXNzaW9ucyI6W119fSwiaWF0IjoxNjE3MzIwMTAzLCJleHAiOjE2MTk5MTIxMDN9.SS-aBsyOsafVzlaM5k8-3bUk7jzKdhg8-fcAYbb_WZeAJFL7KwdIXCJy8JCmqHmyvG851GXBJDJCms6VutYmY4RpuFzoarXe-ZAfukfEg2nFRvGLzZAM5nF_6NZfzWU1vb2jFLlYhjUp8_hAmvr8hrSdSsYRpbAc6OHvg9XV7Scft4MjMV38_d52a9AT_6GR-60PkXbQmlUIqG2PtDcU9ngklv-f2q1oYUBWGQR7jCGr0AGkoE9rDutpw489ZviTHxzi9nMgn5o-CDx9ewTF9uu8TjqaiZiK-rATvUhXMDboun2W9XoRNVSFiQMLCcSMbgI-oW1HhUt7NzVnd5SDCA
```

### Server (backend)

Our server route should read the `authorization` header for the request, then verify the JWT access token with the project's public key before responding. We are using the open source [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library to verify the token.

If the JWT access token is invalid or expired, we throw an error and return `Unauthorized`.

```js
const jwt = require("jsonwebtoken");

process.env.USERFRONT_JWT_PUBLIC_KEY = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAodD/IEagav7wlBX+k30YOSFpYT0u7AtV3ljwC52ShCFFGVvw86T5
VTbg5Q/L/dgQT0+OZi+Fe/aAIL6j+3d8+Md5nGg7zqTv33GE7tN4ZoSkYnPMAm1I
PjkOevpia98u8n1jWE/OnDnQqgozcy2zssGcJ1+QwJWuZWVObbFiA6ppFlyb9Hm8
2wEgvBqjuTqCvLdJO5CtY5ya5OpGLpnqlsXTRgJEEFk0VTdH56ztcLFMDMxm4OVW
aWy+i4YieTRRKnbyT7fzDPiZupkcg2jwVF49CtyB9UWtE/+/BAKtJtBLfdZ5X1dK
RqesE10ysVdGxeyeRpyFltEfF5QWAzn99wIDAQAB
-----END RSA PUBLIC KEY-----`;

// Protected route
app.get("/protected", (req, res) => {
  try {
    // Read the JWT access token from the authorization header
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    // Verify the token using the project's JWT public key
    const verifiedPayload = jwt.verify(
      accessToken,
      process.env.USERFRONT_JWT_PUBLIC_KEY,
      { algorithm: "RS256" }
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
  "data": "Data specific to user 5 (dd7392a-cba2-a40b-0ff8-793a6ca3fcda).",
  "timestamp": "2021-04-01T00:00:00.000Z"
}
```

## Admin route

To build a route that only admin users can view, we need the client (frontend) to include the user's JWT access token in the `authorization` header for the request.

Our server can then read the header and reject any JWT access tokens that don't have the `admin` role.

### Client (frontend)

The client should include the user's JWT access token in the `authorization` header of the request:

```
Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoidGVzdCIsImlzQ29uZmlybWVkIjp0cnVlLCJ1c2VySWQiOjEsInVzZXJVdWlkIjoiYWI1M2RiZGMtYmIxYS00ZDRkLTllZGYtNjgzYTZjYTNmNjA5IiwidGVuYW50SWQiOiJkZW1vMTIzNCIsInNlc3Npb25JZCI6IjBhZTI3NjI3LWEyMjYtNGQxMS04Yzk0LTMyYjliYmEzZjI4NSIsImF1dGhvcml6YXRpb24iOnsiZGVtbzEyMzQiOnsidGVuYW50SWQiOiJkZW1vMTIzNCIsIm5hbWUiOiJEZW1vIFByb2plY3QiLCJyb2xlcyI6WyJ2aWV3ZXIiLCJtZW1iZXIiLCJhZG1pbiJdLCJwZXJtaXNzaW9ucyI6W119fSwiaWF0IjoxNjE3MzIwMTAzLCJleHAiOjE2MTk5MTIxMDN9.SS-aBsyOsafVzlaM5k8-3bUk7jzKdhg8-fcAYbb_WZeAJFL7KwdIXCJy8JCmqHmyvG851GXBJDJCms6VutYmY4RpuFzoarXe-ZAfukfEg2nFRvGLzZAM5nF_6NZfzWU1vb2jFLlYhjUp8_hAmvr8hrSdSsYRpbAc6OHvg9XV7Scft4MjMV38_d52a9AT_6GR-60PkXbQmlUIqG2PtDcU9ngklv-f2q1oYUBWGQR7jCGr0AGkoE9rDutpw489ZviTHxzi9nMgn5o-CDx9ewTF9uu8TjqaiZiK-rATvUhXMDboun2W9XoRNVSFiQMLCcSMbgI-oW1HhUt7NzVnd5SDCA
```

### Server (backend)

To restrict the route to admins only, we need to check that the JWT access token has the `admin` role.

Userfront's JWT access token payloads look like this when decoded:

```json
{
  "mode": "test",
  "tenantId": "demo1234",
  "userId": 1,
  ...
  "authorization": {
    "demo1234": {
      ...
      "roles": ["admin"]
    }
  }
}
```

So we want to check that the `payload.authorization[tenantId].roles` array contains the `admin` role.

As with the protected route, our server should read the `authorization` header for the request, then verify the JWT access token with the project's public key before responding. We are using the open source [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) library to verify the token.

If the JWT access token is invalid, expired, or missing the `admin` role, we throw an error and return `Unauthorized`.

```js
const jwt = require("jsonwebtoken");

process.env.USERFRONT_JWT_PUBLIC_KEY = `-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAodD/IEagav7wlBX+k30YOSFpYT0u7AtV3ljwC52ShCFFGVvw86T5
VTbg5Q/L/dgQT0+OZi+Fe/aAIL6j+3d8+Md5nGg7zqTv33GE7tN4ZoSkYnPMAm1I
PjkOevpia98u8n1jWE/OnDnQqgozcy2zssGcJ1+QwJWuZWVObbFiA6ppFlyb9Hm8
2wEgvBqjuTqCvLdJO5CtY5ya5OpGLpnqlsXTRgJEEFk0VTdH56ztcLFMDMxm4OVW
aWy+i4YieTRRKnbyT7fzDPiZupkcg2jwVF49CtyB9UWtE/+/BAKtJtBLfdZ5X1dK
RqesE10ysVdGxeyeRpyFltEfF5QWAzn99wIDAQAB
-----END RSA PUBLIC KEY-----`;

// Admin-only route
app.get("/admin", (req, res) => {
  try {
    // Read the JWT access token from the authorization header
    const accessToken = req.headers.authorization.replace("Bearer ", "");

    // Verify the token using the RSA public key
    const verifiedPayload = jwt.verify(
      accessToken,
      process.env.USERFRONT_JWT_PUBLIC_KEY,
      { algorithm: "RS256" }
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

## Interactive sample

The above routes are combined into a working sample below.

<request-maker
  url-root="https://auth.userfront.repl.co"
  route-name="Public"
  token-type="none">
</request-maker>

<iframe height="1200px" width="100%" src="https://replit.com/@userfront/Nodejs-Authentication-and-Access-Control?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
