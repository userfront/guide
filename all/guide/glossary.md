# Glossary

### Access token

Access tokens define what a user can access on your server.

When a user signs up or logs into your application, they receive an access token in their browser as a cookie. Your frontend should send this access token to your server, and your server should verify and decode the access token to determine which user is making the request along with what they are allowed to do.

For more information about how to use access tokens, see [Tokens & Access](/guide/auth/#jwt-access-token).

### Account ID

The ID for your account. The account token can be found in the URL when you are logged into the Userfront dashboard:

`https://userfront.com/projects/ { accountId } /users`

Account IDs are a type of [tenant ID](#tenant-id), which are 8-character alphanumeric IDs, like `a1b2c3d4`.

### After-login path

Where users should be redirected upon logging in.

Defaults to `/dashboard`.

Can be edited in your account's Settings tab.

### After-logout path

Where users should be redirected upon logging out.

Defaults to `/login`.

Can be edited in your account's Settings tab.

### After-signup path

Where users should be redirected upon signing up.

Defaults to your [After-login path](#after-login-path).

Can be edited in your account's Settings tab.

### ID token

ID tokens have information about the user for frontend display purposes.

When a user signs up or logs into your application, they receive an ID token in their browser as a cookie. Your frontend can read this cookie for information such as the user's email address, image, name, and more.

For more information about how to use ID tokens, see [Tokens & Access](/guide/auth/#id-token).

### JSON Web Token

A type of signed, secure token that contains information in the form of an encoded JSON object.

For more information, see the section about [JSON Web Tokens (JWTs)](/guide/auth/jwt-json-web-token.html).

### JWT

Acronym for [JSON Web Token](#json-web-token). JWT is pronounced "jot".

### Password reset path

Where users should be redirected to reset their password after clicking the link in the reset email.

Defaults to `/reset`.

Can be edited in your account's Settings tab.

### Refresh token

Refresh tokens are used to obtain new access and ID tokens.

You do not need to use refresh tokens directly.

### RSA

RSA is an algorithm used for signing tokens. The algorithm uses a public key, which can be shared with anyone so that they can verify the token is authentic, and a private key, which is known only to the token creator, and is used to create tokens.

Userfront uses RSA to sign your users' access tokens and ID tokens.

You can find your public RSA key(s) in the Settings section of the Userfront dashboard. Userfront maintains your private RSA keys in a secure manner.

### Tenant ID

The ID for a tenant within your account. Your tenants can be found in the Access Control tab of the Userfront dashboard.

Tenant IDs are 8-character alphanumeric IDs, like `a1b2c3d4`.
