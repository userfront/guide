---
sidebarDepth: 2
title: Client-to-server API reference
---

# API reference

::::: row
:::: left

<div>
  <h3 style="margin:0 0 8px">Client-to-server</h3>
  <div style="display:flex;align-items:center;height:36px;">
    <span style="font-size:36px;">👩‍💻</span>
    <span style="font-size:36px;padding:0 12px 0 8px;">→</span>
    <img src="https://res.cloudinary.com/component/image/upload/w_32,o_80/v1634764502/permanent/server-solid.png" style="height:32px;margin-top:2px;">
  </div>
</div>

This documentation covers requests made by a user's browser or mobile app directly to Userfront's server.

For requests made by your server to Userfront's server using your application's API key, see the API reference for [server-to-server](/docs/api.html) actions.

::::
:::: right

#### Just getting started?

Check out our development [quickstart guide](/guide/quickstart/).

::::
:::::

#### REST endpoints

::::: row
:::: left

The Userfront API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable resource-oriented URLs, accepts [JSON-encoded](http://www.json.org/) request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

You can use the Userfront API in test mode, which does not affect your live data. The request origin and JWT access token used to for the request determine whether the request is live mode or test mode.

::::
:::: right

::: card

#### Base URL

<code style="background-color:inherit;font-size:14px;padding:0;">https://api.userfront.com</code>
:::

::::
:::::

## Errors

::::: row
:::: left

Userfront uses conventional HTTP response codes to indicate the success or failure of an API request. In general: Codes in the `2xx` range indicate success. Codes in the `4xx` range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.). Codes in the `5xx` range indicate an error with Userfront's servers (these are rare).

Some `4xx` errors that could be handled programmatically (e.g. a token is expired) include an error code that briefly explains the error reported.

::::
:::: right

::: card

#### HTTP Status Code Summary

|                             |                                                                                                  |
| --------------------------: | ------------------------------------------------------------------------------------------------ |
|                **200 - OK** | Everything worked as expected.                                                                   |
|       **400 - Bad Request** | The request was unacceptable, often due to missing a required parameter.                         |
|      **401 - Unauthorized** | No valid API key provided.                                                                       |
|    **402 - Request Failed** | The parameters were valid but the request failed.                                                |
|         **403 - Forbidden** | The API key doesn't have permissions to perform the request.                                     |
|         **404 - Not Found** | The requested resource doesn't exist.                                                            |
| **429 - Too Many Requests** | Too many requests hit the API too quickly. We recommend an exponential backoff of your requests. |
|      **500 - Server Error** | Something went wrong on Userfront's end. (These are rare.)                                       |

:::
::::
:::::

### Error response format

::::: row
:::: left

Errors contain a `statusCode`, `message`, and `error` object.

The `message` describes what went wrong for the request, while the `error` object contains additional information about the error.

::::
:::: right

<response-json-custom title="Error response" :response='{"statusCode":400,"message":"Incorrect email or password","error":{"type":"bad_request_error"}}'/>

::::
:::::

## Authentication actions

::::: row
:::: left

Authentication actions allow a user to sign up, log in, perform password resets, and carry out other useful interactions with your application.

Most of these actions are also implemented with helper functions in the [Core JS library](/docs/js.html).

::::
:::: right

<endpoints :endpoints="[
  { verb: 'post', path: '/v0/auth/create', anchor: 'sign-up-with-password' },
  { verb: 'post', path: '/v0/auth/basic', anchor: 'log-in-with-password' },
  { verb: 'put', path: '/v0/auth/basic', anchor: 'update-own-password' },
  { verb: 'post', path: '/v0/auth/link', anchor: 'send-login-link-email' },
  { verb: 'put', path: '/v0/auth/link', anchor: 'log-in-with-login-link' },
  { verb: 'post', path: '/v0/auth/code', anchor: 'send-verification-code' },
  { verb: 'put', path: '/v0/auth/code', anchor: 'log-in-with-verification-code' },
  { verb: 'get', path: '/v0/auth/totp', anchor: 'set-up-totp' },
  { verb: 'post', path: '/v0/auth/totp', anchor: 'log-in-with-totp' },
  { verb: 'get', path: '/v0/auth/{provider}/login', anchor: 'log-in-with-sso' },
  { verb: 'get', path: '/v0/auth/refresh', anchor: 'refresh-jwt-access-token' },
  { verb: 'post', path: '/v0/auth/reset/link', anchor: 'send-password-reset-email' },
  { verb: 'put', path: '/v0/auth/reset', anchor: 'reset-password-with-link-credentials' },
  { verb: 'post', path: '/v0/auth/verify/email', anchor: 'send-account-verification-email' },
  { verb: 'post', path: '/v0/auth/verify/phone', anchor: 'verify-a-phone-number' },
  { verb: 'get', path: '/v0/auth/logout', anchor: 'log-out' },
]"/>

::::
:::::

---

### Sign up with password

::::: row
:::: left

Register a new user with an email and password.

<parameters path="/v0/auth/create" verb="post" source="$docsClient"/>

<br />

#### Welcome / signup email

By default, Userfront sends new users a welcome email to confirm their account. The link in this email contains a `uuid` and `token` that allow login the same way as a [login link](/docs/api-client.html#log-in-with-login-link).

You can disable this email with the `options.noSignupEmail` parameter above.

In test mode, Userfront does not send emails.

::::
:::: right

<code-samples-client path="/v0/auth/create" verb="post" :show-only="['email','password','username','name','data','tenantId', 'options']"/>

<response-json path="/v0/auth/create" verb="post" source="$docsClient"/>

::::
:::::

#### Alternate response: MFA - First factor code

::::: row
:::: left

Response when tenant requires MFA.

See [Multi-factor authentication - First factor code](#first-factor-code) for more information on how to request & submit a verification code using the information in this response.

::::
:::: right

<response-json-custom title="Response (MFA - First factor code)" :response="{ message: 'OK', result: {
  mode: 'live',
  firstFactorCode: '304a8def-651c-4ab2-9ca0-1e3fca9e280a',
  allowedStrategies: ['verificationCode'],
  allowedChannels: ['sms'],
}}"/>

::::
:::::

---

### Sign up with passwordless

::::: row
:::: left

Register a new user with an email, and send them a login link email.

If the user already exists, sends them a login link email. See [send login link email](#send-login-link-email).

<parameters path="/v0/auth/link" verb="post" source="$docsClient" :show-only="['email', 'username', 'name', 'data', 'tenantId', 'options', 'options.redirect', 'options.noSignupEmail']"/>

::::
:::: right

<code-samples-client path="/v0/auth/link" verb="post" :show-only="['email', 'username','name','data','tenantId', 'options']"/>

<response-json path="/v0/auth/link" verb="post" source="$docsClient"/>

::::
:::::

#### Test mode

::::: row
:::: left

In test mode, Userfront does not send emails. Instead, the API response will contain a `link` attribute that can be followed directly to log in.

::::
:::: right

<response-json-custom title="Response (test mode)" :response="{ message: 'OK', result: { link: 'http://localhost:3000/login?uuid=64758625-a004-44d0-90fe-fa7e5b012be4&token=d889bf75-9ab7-4354-82f9-3a1d9c8d6e6e&type=welcome' }}"/>

::::
:::::

#### Welcome / signup email

::::: row
:::: left

By default, Userfront sends new users a welcome email to confirm their account. The link in this email contains a `uuid` and `token` and works the same way as a [login link](/docs/api-client.html#log-in-with-login-link).

You can disable this email with the `options.noSignupEmail` parameter above.
::::
:::: right

<response-json-custom title="Response (options.noSignupEmail: true)" :response="{ message: 'OK' }"/>
::::
:::::

---

### Log in with password

::::: row
:::: left

Log in with a password and email/username.

<parameters path="/v0/auth/basic" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/basic" verb="post" :show-only="['password','emailOrUsername','tenantId','options']"/>

<response-json path="/v0/auth/basic" verb="post" source="$docsClient"/>

::::
:::::

#### Password reset email

::::: row
:::: left

By default, Userfront sends a password reset link email to users when they try to log in with a password but have not yet set a password.

You can disable this email with the `options.noResetEmail` parameter, which will then return an error of the type `"intended_error"`. This distinguishes the request from a user who has a password; their error would be `"bad_request_error"`
::::
:::: right

<response-json-custom title="Response (options.noResetEmail: true)" :response='{"statusCode":400,"message":"Incorrect email or password","error":{"type":"intended_error"}}'/>
::::
:::::

#### Alternate response: MFA - First factor code

::::: row
:::: left

Response when tenant requires MFA.

See [Multi-factor authentication - First factor code](#first-factor-code) for more information on how to request & submit a verification code using the information in this response.

::::
:::: right

<response-json-custom title="Response (MFA - First factor code)" :response="{ message: 'OK', result: {
  mode: 'live',
  firstFactorCode: '304a8def-651c-4ab2-9ca0-1e3fca9e280a',
  allowedStrategies: ['verificationCode'],
  allowedChannels: ['sms'],
}}"/>

::::
:::::

---

### Update own password

::::: row
:::: left

Update a user's password using their valid JWT access token and their existing password.

The request must include a valid JWT access token in the `Authorization` header.

<parameters path="/v0/auth/basic" verb="put" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/basic" verb="put" show-token="access"/>

<response-json-custom :response="{ message: 'OK' }"/>

::::
:::::

::::: row
:::: left

#### If no password exists

If the user does not have a password (for example, if they logged in via SSO), the `password` and `existingPassword` fields are both ignored, and Userfront sends the user a password reset link.

::::
:::: right

<response-json-custom title="Response (if no password exists)" :response="{ message: 'OK', result: { to: 'user@example.com', messageId: '18299324-bf92-4ec9-bd47-403eda5f278d', submittedAt: new Date() }}"/>

::::
:::::

::::: row
:::: left

#### Test mode

In test mode, Userfront does not send emails.

If a test user does not have a password, the API response will contain a `link` attribute that can be followed directly in order to set the password.

This link will direct the user to your Password reset path.

::::
:::: right

<response-json-custom title="Response (if no password exists, test mode)" :response="{ message: 'OK', result: { link: 'http://localhost:3000/reset?uuid=64758625-a004-44d0-90fe-fa7e5b012be4&token=d889bf75-9ab7-4354-82f9-3a1d9c8d6e6e' }}"/>

::::
:::::

---

### Update own email address

::::: row
:::: left

To update a user's own email address, send the new email address to the [send account verification email](#send-account-verification-email) endpoint.

This will generate a link the user can click to verify their new email address. They will retain their old email address until the link is clicked.

::::
:::: right

::: card
See [send account verification email](#send-account-verification-email).
:::
::::
:::::

<br>
<br>

---

### Send login link email

::::: row
:::: left

Generate and send a login link email.

::: tip Note
If no user exists with the given email, this endpoint creates a new user and sends them a login link.

See also: [sign up with passwordless](#sign-up-with-passwordless).
:::

<parameters path="/v0/auth/link" verb="post" source="$docsClient" :show-only="['email', 'options', 'options.redirect']"/>

::::
:::: right

<code-samples-client path="/v0/auth/link" verb="post" :show-only="['email', 'options']"/>

<response-json path="/v0/auth/link" verb="post" source="$docsClient"/>

::::
:::::

::::: row
:::: left

#### Test mode

In test mode, Userfront does not send emails. Instead, the API response will contain a `link` attribute that can be followed directly to log in.

::::
:::: right

<response-json-custom title="Response (test mode)" :response="{ message: 'OK', result: { link: 'http://localhost:3000/login?uuid=64758625-a004-44d0-90fe-fa7e5b012be4&token=d889bf75-9ab7-4354-82f9-3a1d9c8d6e6e&type=login' }}"/>

::::
:::::

::::: row
:::: left

#### Generate link credentials without sending email

You can generate login link credentials to use in your own custom emails by using the [generate link credentials](/docs/api.html#generate-link-credentials) endpoint.

::::
:::::

---

### Log in with login link

::::: row
:::: left

Log in using the `token` and `uuid` from a login link.

<parameters path="/v0/auth/link" verb="put" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/link" verb="put"/>

<response-json path="/v0/auth/link" verb="put" source="$docsClient"/>

::::
:::::

#### Alternate response: MFA - First factor code

::::: row
:::: left

Response when tenant requires MFA.

See [Multi-factor authentication - First factor code](#first-factor-code) for more information on how to request & submit a verification code using the information in this response.

::::
:::: right

<response-json-custom title="Response (MFA - First factor code)" :response="{ message: 'OK', result: {
  mode: 'live',
  firstFactorCode: '304a8def-651c-4ab2-9ca0-1e3fca9e280a',
  allowedStrategies: ['verificationCode'],
  allowedChannels: ['sms'],
}}"/>

::::
:::::

---

### Send verification code

::::: row
:::: left

Generate and send a 6-digit verification code by SMS or email.

<parameters path="/v0/auth/code" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/code" verb="post" :show-only="['tenantId','channel','phoneNumber']"/>

<response-json path="/v0/auth/code" verb="post" source="$docsClient"/>

::::
:::::

::::: row
:::: left

#### Test mode

In test mode, Userfront does not send SMS messages or emails. Instead, the API response will contain the verification code directly.

::::
:::: right

<response-json-custom title="Response (test mode)" :response="{ message: 'OK', result: { phoneNumber: '+15558675309', channel: 'sms', verificationCode: '123456' }}"/>

::::
:::::

---

### Log in with verification code

::::: row
:::: left

Log in using a 6-digit verification code.

The request must use the same `channel` and `phoneNumber` / `email` as were used to generate the verification code.

<parameters path="/v0/auth/code" verb="put" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/code" verb="put" :show-only="['tenantId','channel','phoneNumber','verificationCode']"/>

<response-json path="/v0/auth/code" verb="put" source="$docsClient"/>

::::
:::::

---

### Set up TOTP authenticator

::::: row
:::: left

Read a user's TOTP information, including their QR code image and their remaining single-use backup codes.

The request must include a valid JWT access token in the `Authorization` header.

<parameters path="/v0/auth/totp" verb="get" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/totp" verb="get" show-token="access"/>

<response-json path="/v0/auth/totp" verb="get" source="$docsClient"/>

::::
:::::

#### QR code

::::: row
:::: left

The `qrCode` attribute is a base-64 encoded png that can be displayed directly to the user.

<img src="data:image/png;base64,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"/>

#### Backup codes

Each user initially begins with 10 single-use backup codes for TOTP.

You should display these backup codes to the user so that they can store them in case they lose access to their authenticator device.

If all 10 single-use backup codes are used, the user will have to re-pair their authenticator device, at which time they will receive 10 new codes.

::::
:::: right

```html
<img src="data:image/png;base64..." />
```

::::
:::::

---

### Log in with TOTP authenticator

::::: row
:::: left

Log in using a code generated by a TOTP authenticator app, or with a single-use backup code.

In addition to either a `totpCode` or a `backupCode`, the request must contain one of the following to identify the user: `userId`, `userUuid`, `emailOrUsername`, `email`, `username`, or `phoneNumber`.

<parameters path="/v0/auth/totp" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/totp" verb="post" :show-only="['tenantId','userId','totpCode']"/>

<response-json path="/v0/auth/totp" verb="post" source="$docsClient"/>

::::
:::::

#### Log in with backup code

::::: row
:::: left

Login with a `backupCode` works the same way as login with a `totpCode`.

Each user initially begins with 10 single-use backup codes for TOTP.

If all 10 single-use backup codes are used, the user will have [set up TOTP authenticator](#set-up-totp-authenticator) again, at which time they will receive 10 new codes.

::::
:::: right

<code-samples-client path="/v0/auth/totp" verb="post" :show-only="['tenantId','userId','backupCode']"/>

::::
:::::

---

### Log in with SSO

::::: row
:::: left

Log in using an SSO provider by visiting a link for that provider.

The SSO provider must already be configured.

#### Provider

The `:provider` value should be the lowercased name of the SSO provider.

Example: `github`

#### Query strings

---

<parameter name="tenant_id" description="Unique identifier for the tenant. Note that this querystring uses underscore instead of camelcase." :required="true"/>

<parameter name="origin" description="The origin of the requesting page." :required="true"/>

<parameter name="redirect" description="A path to redirect the user to upon sign on." :required="false"/>

::::
:::: right

<code-group-custom verb="get" path="/v0/auth/{provider}/login">
  <code-block-custom
    title="JavaScript"
    language="js"
    code="// Example link
https://api.userfront.com/v0/auth/github/login?tenant_id=demo1234&origin=https://example.com"
  />
</code-group-custom>

::::
:::::

<br>
<br>

---

### Refresh JWT access token

::::: row
:::: left

Send a user's valid refresh token to obtain a new JWT access token.

The request must include a valid refresh token in the `Authorization` header.

<parameters path="/v0/auth/refresh" verb="get" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/refresh" verb="get" show-token="refresh"/>

<response-json path="/v0/auth/refresh" verb="get" source="$docsClient"/>
::::
:::::

<br>

---

### Send password reset email

::::: row
:::: left

Generate and send a password reset link email.

<parameters path="/v0/auth/reset/link" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/reset/link" verb="post" :show-only="['email','tenantId','options']"/>

<response-json path="/v0/auth/reset/link" verb="post" source="$docsClient"/>

::::
:::::

::::: row
:::: left

#### Test mode

In test mode, Userfront does not send emails. Instead, the API response will contain a `link` attribute that can be followed directly to reset the user's password.

::::
:::: right

<response-json-custom title="Response (test mode)" :response="{ message: 'OK', result: { link: 'http://localhost:3000/reset?uuid=64758625-a004-44d0-90fe-fa7e5b012be4&token=d889bf75-9ab7-4354-82f9-3a1d9c8d6e6e' }}"/>

::::
:::::

::::: row
:::: left

#### Generate link credentials without sending email

You can generate password reset link credentials to use in your own custom emails by using the [generate link credentials](/docs/api.html#generate-link-credentials) endpoint.

::::
:::::

---

### Reset password with link credentials

::::: row
:::: left

Reset a user's password using the `token` and `uuid` from a password reset link.

Upon success, returns a JWT access token so that the user can log in directly.

<parameters path="/v0/auth/reset" verb="put" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/reset" verb="put"/>

<response-json path="/v0/auth/reset" verb="put" source="$docsClient"/>

::::
:::::

#### Alternate response: MFA - First factor code

::::: row
:::: left

Response when tenant requires MFA.

See [Multi-factor authentication - First factor code](#first-factor-code) for more information on how to request & submit a verification code using the information in this response.

::::
:::: right

<response-json-custom title="Response (MFA - First factor code)" :response="{ message: 'OK', result: {
  mode: 'live',
  firstFactorCode: '304a8def-651c-4ab2-9ca0-1e3fca9e280a',
  allowedStrategies: ['verificationCode'],
  allowedChannels: ['sms'],
}}"/>

::::
:::::

---

### Send account verification email

::::: row
:::: left

Generate and send an account verification link email.

After a user follows the account verification link, their user record is marked `isConfirmed: true`.

If the user submitted a new email address to this endpoint, their email address is updated when they follow the account verification link.

You can process the account verification link's `token` and `uuid` credentials the same way as login link credentials: with [Log in with login link](/docs/api-client.html#log-in-with-login-link).

<parameters path="/v0/auth/verify/email" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/verify/email" verb="post":show-only="['email','userId','userUuid','tenantId','options']"/>

<response-json path="/v0/auth/verify/email" verb="post" source="$docsClient"/>

::::
:::::

::::: row
:::: left

#### Test mode

In test mode, Userfront does not send emails. Instead, the API response will contain a `link` attribute that can be followed directly to log in.

::::
:::: right

<response-json-custom title="Response (test mode)" :response="{ message: 'OK', result: { link: 'http://localhost:3000/login?uuid=64758625-a004-44d0-90fe-fa7e5b012be4&token=d889bf75-9ab7-4354-82f9-3a1d9c8d6e6e&type=verify' }}"/>

::::
:::::

---

### Verify a phone number

::::: row
:::: left

Generate a verification code and send it to a phone number.

To add a new phone number for a user, the request must include a valid JWT access token in the `Authorization` header.

After a user submits the verification code to the [verification code endpoint](#log-in-with-verification-code), their phone number is verified and can be used in login and MFA flows.

<parameters path="/v0/auth/verify/phone" verb="post" source="$docsClient" :show-only="['phoneNumber','userId','userUuid','tenantId']"/>

::::
:::: right

<code-samples-client path="/v0/auth/verify/phone" verb="post" :show-only="['phoneNumber','userId','tenantId']" show-token="access"/>

<response-json path="/v0/auth/verify/phone" verb="post" source="$docsClient"/>

::::
:::::

::::: row
:::: left

#### Test mode

In test mode, Userfront does not send SMS messages. Instead, the API response will contain the verification code directly.

::::
:::: right

<response-json-custom title="Response (test mode)" :response="{ message: 'OK', result: { channel: 'sms', phoneNumber: '+15558675309', verificationCode: '123456' }}"/>

::::
:::::

---

### Log out

::::: row
:::: left

Log a user out and invalidate their current session.

In order to invalidate the user's current session, the request must include a valid JWT access token or refresh token in the `Authorization` header. This token can be expired.

<parameters path="/v0/auth/logout" verb="get" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/logout" verb="get" show-token="access"/>

<response-json path="/v0/auth/logout" verb="get" source="$docsClient"/>

::::
:::::

## Multi-factor authentication

::::: row
:::: left

::: warning Note
MFA is currently in beta. If you would like to enable it for your account, please contact us using the chat in the bottom-right.
:::

When Multi-factor authentication (MFA) is enabled, a user's initial login request will return a `firstFactorCode` instead of their JWT access token.

This `firstFactorCode` can then be sent along with a second factor in order to obtain the JWT access token.

::::
:::::

### First factor code

::::: row
:::: left

The response to the right is returned when using one of the following methods when **MFA is enabled** for your tenant.

::::
:::: right

<response-json-custom title="Response (MFA - First factor code)" :response="{ message: 'OK', result: {
  mode: 'live',
  firstFactorCode: '304a8def-651c-4ab2-9ca0-1e3fca9e280a',
  allowedStrategies: ['verificationCode'],
  allowedChannels: ['sms'],
}}"/>

::::
:::::

## SAML

::::: row
:::: left

There are three endpoints to log users in and out using SAML.

View the [SAML set up guide](https://userfront.com/guide/sso/saml.html) to set up your service provider in the Userfront dashboard. SAML is only available in live mode.

::::
:::: right

<endpoints :endpoints="[
  { verb: 'get', path: '/v0/auth/saml/idp/token', anchor: 'generate-saml-token' },
  { verb: 'get', path: '/v0/auth/saml/idp/login', anchor: 'login-with-saml' },
  { verb: 'get', path: '/v0/auth/saml/idp/logout', anchor: 'logout-with-saml' },
]"/>

::::
:::::

---

### Generate SAML token

Generate token to complete SAML login/logout.

::::: row
:::: left

You will need to obtain a SAML token with a valid JWT access token in the Authorization header. You will then use the token to complete the SAML flow using either of the endpoints below to log a user in or out:

- `GET /v0/auth/saml/idp/login`
- `GET /v0/auth/saml/idp/logout`

<parameters path="/v0/auth/saml/idp/token" verb="get" source="$docsClient" />

::::
:::: right

<code-samples-client path="/v0/auth/saml/idp/token" verb="get" show-token="access"/>

<response-json-custom title="Response" :response="{ token: 'd889bf75-9ab7-4354-82f9-3a1d9c8d6e6e' }"/>

::::
:::::

---

### Log in with SAML

::::: row
:::: left

Complete SAML login with token.

When a service provider requests your identity provider's Login URL, the Userfront API will redirect the client to your [After-logout path](https://userfront.com/guide/glossary.html#after-logout-path) where you will obtain a token using the user's JWT access token as specified in [Generate SAML token](/docs/api-client.html#generate-saml-token).

The response is a self-submitting form containing the SAML response which sends a `POST` request to the service provider to complete the login process.

#### Parameters

---

<parameter
key="tenant_id"
name="tenant_id"
description="Unique identifier for the tenant. Note that this querystring uses underscore instead of camelcase."
:required="true" />

<parameter
key="token"
name="token"
description="Generated SAML token."
:required="true" />

<parameter
key="uuid"
name="uuid"
description="The user's UUID."
:required="true" />

::::
:::: right

<code-samples-client path="/v0/auth/saml/idp/login?tenant_id=&token=&uuid=" verb="get" />

::::
:::::

---

### Log out with SAML

::::: row
:::: left

Complete SAML logout with token.

When a service provider requests your identity provider's Logout URL, the Userfront API will redirect the client to your [After-logout path](https://userfront.com/guide/glossary.html#after-logout-path) where you will obtain a token using the user's JWT access token as specified in [Generate SAML token](/docs/api-client.html#generate-saml-token).

The response is a self-submitting form containing the SAML response which sends a `POST` request to the service provider to complete the logout process.

#### Parameters

---

<parameter
key="tenant_id"
name="tenant_id"
description="Unique identifier for the tenant. Note that this querystring uses underscore instead of camelcase."
:required="true" />

<parameter
key="token"
name="token"
description="Generated SAML token."
:required="true" />

<parameter
key="uuid"
name="uuid"
description="The user's UUID."
:required="true" />

::::
:::: right

<code-samples-client path="/v0/auth/saml/idp/logout?tenant_id=&token=&uuid=" verb="get" />

::::
:::::

<!-- ---

::::: row
:::: left

// Roles routes

`/v0/roles/invite`,
`/v0/roles`,
`/v0/users/{userId}/roles`,
"/v0/tenants/{tenantId}/roles/invite",
"/v0/tenants/{tenantId}/users/{userId}/roles",

// Tenants routes

"/v0/tenants/{tenantId}/tenants",
"/v0/tenants/{tenantId}",

// TenantKeys routes

"/v0/keys/admin",
"/v0/keys/readonly",
"/v0/keys/webhook",
"/v0/keys/jwt",
::::
::::: -->

```

```
