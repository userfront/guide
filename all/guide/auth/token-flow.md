# Token flow

Userfront will generate a set of tokens whenever a user signs up or logs into your application. These tokens are JSON Web Tokens (JWTs).

## Flow diagram

The token flow looks like this:

1. Your toolkit form (signup or login form) sends a request to Userfront when the user signs on. The form receives the response from Userfront and stores the user's tokens as cookies in the browser.

2. From then on, your frontend code should include the user's **access token** with requests to your server. Your server should verify and decode the JWT for each request in order to determine which user is making the request, along with their access level.

![Userfront token flow](https://res.cloudinary.com/component/image/upload/v1616013076/permanent/userfront-diagram.png)

:::tip
Your site should send the `Access token` to your server.

The `ID token` is intended for use on the client, and the `Refresh token` is used by Userfront automatically.
:::

## Included tokens

Each time a user signs on, they receive 3 tokens.

| Name                                        | Description                                                                   |
| ------------------------------------------- | ----------------------------------------------------------------------------- |
| [Access token](/guide/auth/#access-token)   | This token has information about the user's access levels.                    |
| [ID token](/guide/auth/#id-token)           | This token has more detailed information about the user, such as their image. |
| [Refresh token](/guide/auth/#refresh-token) | This token is used to obtain new Access & ID tokens.                          |
