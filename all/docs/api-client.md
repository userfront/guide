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
  { verb: 'get', path: '/v0/auth/{provider}/login', anchor: 'log-in-with-sso' },
  { verb: 'get', path: '/v0/auth/refresh', anchor: 'refresh-jwt-access-token' },
  { verb: 'post', path: '/v0/auth/reset/link', anchor: 'send-password-reset-email' },
  { verb: 'put', path: '/v0/auth/reset', anchor: 'reset-password-with-link-credentials' },
  { verb: 'post', path: '/v0/auth/verify/link', anchor: 'send-account-verification-email' },
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

You can disable this email with the `noSignupEmail` parameter above.

In test mode, Userfront does not send emails.

::::
:::: right

<code-samples-client path="/v0/auth/create" verb="post" :show-only="['email','password','username','name','data','tenantId', 'options']"/>

<response-json path="/v0/auth/create" verb="post" source="$docsClient"/>

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

::::: row
:::: left

#### Test mode

In test mode, Userfront does not send emails. Instead, the API response will contain a `link` attribute that can be followed directly to log in.

::::
:::: right

<response-json-custom title="Response (test mode)" :response="{ message: 'OK', result: { link: 'http://localhost:3000/login?uuid=64758625-a004-44d0-90fe-fa7e5b012be4&token=d889bf75-9ab7-4354-82f9-3a1d9c8d6e6e&type=welcome' }}"/>

::::
:::::

::::: row
:::: left

#### Welcome / signup email

By default, Userfront sends new users a welcome email to confirm their account. The link in this email contains a `uuid` and `token` and works the same way as a [login link](/docs/api-client.html#log-in-with-login-link).

You can disable this email with the `noSignupEmail` parameter above.
::::
:::: right

<response-json-custom title="Response (noSignupEmail: true)" :response="{ message: 'OK' }"/>
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

<code-samples-client path="/v0/auth/basic" verb="post"/>

<response-json path="/v0/auth/basic" verb="post" source="$docsClient"/>

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

Update a user's own email address by passing the new email address to the [send account verification email](#send-account-verification-email) endpoint.

This will generate a link the user can click to verify their new email address. They will retain their old email address until the link is clicked.

See [send account verification email](#send-account-verification-email).

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

---

### Log in with SSO

::::: row
:::: left

Log in using an SSO provider by visiting a link for that provider.

The SSO provider must already be configured.

#### Provider

The `:provider` value should be the lowercased name of the SSO provider.

For example: `google`, `github`, `linkedin`, `facebook`, or `azure`.

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
https://api.userfront.com/v0/auth/google/login?tenant_id=demo1234&origin=https://example.com"
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

<code-samples-client path="/v0/auth/reset/link" verb="post"/>

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

---

### Send account verification email

::::: row
:::: left

Generate and send an account verification link email.

After a user follows the account verification link, their user record is marked `isConfirmed: true`.

If the user submitted a new email address to this endpoint, their email address is updated when they follow the account verification link.

You can process the account verification link's `token` and `uuid` credentials the same way as login link credentials: with [Log in with login link](/docs/api-client.html#log-in-with-login-link).

<parameters path="/v0/auth/verify/link" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/verify/link" verb="post"/>

<response-json path="/v0/auth/verify/link" verb="post" source="$docsClient"/>

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

::::: row
:::: left

#### Generate link credentials without sending email

You can generate account verification link credentials to use in your own custom emails by using the [generate link credentials](/docs/api.html#generate-link-credentials) endpoint.

::::
:::::

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
