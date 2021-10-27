# Token types

## HTTP Basic

One of the earliest methods of authentication was to send a username & password in the header of every request. The username and password are put together with a colon, like `username:password`, and then Base64 encoded:

```js
btoa("username:password") -> "dXNlcm5hbWU6cGFzc3dvcmQ="
```

This resulting value is then included with every request in the `Authorization` header. In our example, the request header would look like:

```
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

The HTTP Basic approach is simple, but it does require the browser to always store the username & password directly, which can pose security issues. The server also has to store the password in order to compare it to the incoming password, which is another potential security risk.

For HTTP Basic, there is no way to have a user "sign out" without changing either the username or password, and there is similarly no concept of "signing in", as every request is essentially a signin.

## Bearer token

Bearer tokens solve many of the problems with HTTP Basic, and are how most websites handle authentication today. In this approach, a username and password are sent one time to "log in". If the credentials are correct, then the server creates and sends a token back to the browser. This token can be totally random characters (sometimes called an "opaque token"), or it can have some information about the user (a "non-opaque token").

For example, when a user logs in, the server might create a random, opaque token for them that looks like `cb0bf23dc6ee4730bd595a21d162efeb`. The server will store this token in the database and then send it back to the browser, which will also store the token. Once the browser has this token, the user is considered to be "logged in".

The browser sends this token in the header with each request, often with the prefix `Bearer`. So the header for a request might look like:

```
Authorization: Bearer cb0bf23dc6ee4730bd595a21d162efeb
```

When the server sees that this token is a match, it can confirm that the user is logged in and can respond accordingly.

In order to "log out" a user, the server can delete its own token or mark it as invalid. The server usually instructs the browser to delete the token too, since it is no longer useful. Once the server has removed its token, any subsequent requests that try to use that token will fail.

## JSON Web Token (JWT)

A JSON Web Token (JWT, pronounced "jot") can be used the same way as an opaque bearer token, but instead of being random, the JWT has some information about the user included. This information is "signed" rather than "encrypted", which means that it can be read by the browser, but not edited.

A JWT consists of 3 parts: a header, a payload, and a signature. The final token is written with dots separating each part:

```
header.payload.signature
```

This will look like something like:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvZSIsImlhdCI6MTUxNjIzOTAyMn0.N5BX5TaoQqKZRodNq5Ny3EZ01UTTSWHIm6v2ijcw33Q
```

The header and payload of a JWT can be decoded by the user's browser. In this example, that means a browser with this JWT could display the username without making any API calls, because the username is encoded in the token's payload argument. The browser could decode this payload like so:

```js
atob("eyJ1c2VybmFtZSI6ImpvZSIsImlhdCI6MTUxNjIzOTAyMn0")
-> "{"username":"joe","iat":1516239022}"
```

Thus, a JWT should not contain sensitive information, since the user could read it if they wanted to.

Once constructed by a server and sent to the browser, this JWT could be sent to another server to use as authentication. As long as the other server already has the secret used to sign the JWT, it can verify that the payload has not been tampered with.
