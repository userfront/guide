# Auth landscape

There are many different ways to authenticate a user's identity, and just about every one of them has at least one acronym. This article will help you understand some of the more common authentication strategies along with when you might want to use each one.

The auth landscape has a long history of different approaches, several of which build on each other, serve different use cases, or overlap in some way. The earliest, and still most common, authentication strategies involve a user sending information directly to the service in question. However, some newer authentication approaches rely on a 3rd party service to provide additional security.

## Direct authentication

Direct authentication happens when a user sends their credentials directly to the website they want to access.

### HTTP Basic

One of the earliest methods of authentication was to send a username & password in the header of every request. The username and password are put together with a colon, like `username:password`, and then Base64 encoded:

`btoa("username:password") -> "dXNlcm5hbWU6cGFzc3dvcmQ="`

This resulting value is then included with every request in the `Authorization` header. In our example, the request header would look like:

`Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=`

The HTTP Basic approach is simple, but it does require the browser to always store the username & password directly, which can pose security issues. The server also has to store the password in order to compare it to the incoming password, which is another potential security risk.

For HTTP Basic, there is no way to have a user "sign out" without changing either the username or password, and there is similarly no concept of "signing in", as every request is essentially a signin.

### Bearer token

Bearer tokens solve many of the problems with HTTP Basic, and are how most websites handle authentication today. In this approach, a username and password are sent one time to "log in". If the credentials are correct, then the server creates and sends a token back to the browser. This token can be totally random characters (sometimes called an "opaque token"), or it can have some information about the user (a "non-opaque token").

For example, when a user logs in, the server might create a random, opaque token for them that looks like `cb0bf23dc6ee4730bd595a21d162efeb`. The server will store this token in the database and then send it back to the browser, which will also store the token.

The browser can store a token many different ways: as a cookie; in session storage; in local storage; or in a local SQL database on the user's computer.

As long as the browser has the token that matches the token on the server, the user is considered to be "logged in".

Once logged in, the browser sends its token in the header with each request, often with the prefix `Bearer`. So the header for a request might look like:

`Authorization: Bearer cb0bf23dc6ee4730bd595a21d162efeb`

When the server sees that this token is a match, it can confirm that the user is logged in and can respond accordingly.

In order to "log out" a user, the server can delete its own token or mark it as invalid. The server usually instructs the browser to delete its own token too, since it is no longer useful. Once the server has removed its token, any subsequent requests that try to use that token will fail.

### JSON Web Token (JWT)

### TOTP (Time-based One-Time Password)

## Delegated authorization

ability for one service to grant access to a resource for another service (e.g. Google can get access to a list on Yelp)

- Oauth 2.0
  - Access granting protocol

## Federated identity

ability to log into a site using another service as proof of identitiy

- SAML 2.0

  - Came first, but no longer as relevant for API calls
  - Relies on exchange of messages for authentication in XML SAML format
  - Older, more adoption in enterprise

- OpenID Connect (OIDC 1.0)
  - Built on top of Oauth 2.0
  - Typically uses JWT format for id-token
  - Newer, more adoption in web & mobile applications
