# JSON Web Token (JWT)

## What is a JWT?

A JSON Web Token (JWT, pronounced "jot") is a token that has some information about the user included. This information is "signed" rather than "encrypted", which means that it can be read by the browser, but not edited. Because a JWT contains information that is readable by the browser, it is referred to as "non-opaque".

A JWT is signed using an algorithm designed to make data readable by a 3rd party like the browser, but not editable. The most commonly used algorithm for this is called HMACSHA256, or HS256.

JWTs consist of 3 parts: a header, a signature, and a payload. The final token is written with dots separating each part:

```
header.payload.signature
```

## Header

The header has information about the signing algorithm, written in JSON format. This then gets Base64 encoded to form the JWT header:

```js
var header = {
  "alg": "HS256",
  "typ": "JWT"
}
btoa(encodeURIComponent(header))

-> "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
```

## Payload

Information about the user is included in the payload and is written in JSON format. Like the header, this also gets Base64 encoded to form the JWT payload:

```js
var payload = {
  "username": "joe",
  "iat": 1516239022
}
btoa(encodeURIComponent(payload))

-> "eyJ1c2VybmFtZSI6ImpvZSIsImlhdCI6MTUxNjIzOTAyMn0"
```

Here, `iat` means "issued at" and represents a Unix timestamp of when the token was created.

## Signature

The signature is formed by combining the encoded header and payload, and then signing with a signature algorithm like HS256.

```
HS256(encodedHeader + "." + encodedPayload, secret)
```

## Result

The final JWT will look like something like:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvZSIsImlhdCI6MTUxNjIzOTAyMn0.N5BX5TaoQqKZRodNq5Ny3EZ01UTTSWHIm6v2ijcw33Q
```

The header and payload of a JWT can be read by the user's browser. In this example, that means a browser with this JWT could display the username without making any API calls, because the username is in the token's payload:

```js
atob("eyJ1c2VybmFtZSI6ImpvZSIsImlhdCI6MTUxNjIzOTAyMn0")
-> "{"username":"joe","iat":1516239022}"
```

Thus, a JWT should not contain sensitive information, since the user could read it if they wanted to.

Once constructed by a server and sent to the browser, this JWT could be sent to another server to use as authentication. As long as the other server already has the secret used to sign the JWT, the server can verify that the payload has not been tampered with.

:::tip
To learn more about the pros and cons of JWTs, read about the [Auth landscape](/guide/auth-landscape.html).
:::
