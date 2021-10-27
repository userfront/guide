# JSON Web Token (JWT)

## What is a JWT?

::::: row
:::: left

A JSON Web Token (JWT, pronounced "jot") is a token that has some information about the user included. This information is "signed" rather than "encrypted", which means that it can be read by the browser, but not edited.

A JWT is signed using an algorithm designed to make data readable by a 3rd party like the browser, but not editable. Userfront uses an algorithm for this is called `RS256`, which uses RSA signing with SHA-256 hashing.

::::
:::::

::::: row
:::: left

JWTs consist of 3 parts: a header, a payload, and a signature. The final token is written with dots separating each part.

::::
:::: right

```
header.payload.signature
```

::::
:::::

## Header

::::: row
:::: left

The header has information about the signing algorithm, written in JSON format.

This information is Base64 encoded to form the JWT header.

::::
:::: right

```js
var header = {
  alg: "RS256",
  typ: "JWT",
};

btoa(JSON.stringify(header));

// => "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9"
```

::::
:::::

## Payload

::::: row
:::: left

Information about the user is included in the payload and is written in JSON format. Like the header, this also gets Base64 encoded to form the JWT payload.

The standard attribute `iat` means "issued at" and represents a Unix timestamp of when the token was created.
::::
:::: right

```js
var payload = {
  username: "joe",
  iat: 1516239022,
};

btoa(JSON.stringify(payload));

// => "eyJ1c2VybmFtZSI6ImpvZSIsImlhdCI6MTUxNjIzOTAyMn0"
```

::::
:::::

## Signature

::::: row
:::: left

The signature is formed by combining the encoded header and payload, and then signing with a signature algorithm like `RS256`.

::::
:::: right

```
RS256(encodedHeader + "." + encodedPayload, secret)
```

::::
:::::

## Result

::::: row
:::: left

The final JWT is formed by joining the payload, header, and signature pieces together, with each section separated by a period `.` character.

::::
:::: right

```
eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvZSIsImlhdCI6MTUxNjIzOTAyMn0.CKJU9aGLxszIG0pXHGezlQFFxstmf9C09d30-UO38kULh1-EvzWPBFJFDSiy3WQqUaFYk5T0y2cEYthalkHcbWv1wO1OXipBwafUuXLeD_sy6C-LsCow3NWradkqcKQOXJ6d-qO8N1h8Gi6V0cJvKXJr6CVGUR12dOo1JiBenOs
```

::::
:::::

::::: row
:::: left

The header and payload of a JWT can be read by the user's browser.

In this example, the JWT can be used to display the username without making any API calls, because the username is in the JWT payload.

:::tip
A JWT should only contain information that the user is allowed to see.
:::

Once constructed by a server and sent to the browser, this JWT can be sent to any other server to identify the user.

The other server can use a public key to verify that the payload has not been tampered with.
::::
:::: right

```js
// Header
atob("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9");
// =>
{
  alg: "RS256",
  typ: "JWT"
}

// Payload
atob("eyJ1c2VybmFtZSI6ImpvZSIsImlhdCI6MTUxNjIzOTAyMn0");
// =>
{
  username: "joe",
  iat: 1516239022,
}
```

::::
:::::
