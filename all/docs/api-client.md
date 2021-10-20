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
  { verb: 'post', path: '/v0/auth/link', anchor: 'generate-login-link' },
  { verb: 'put', path: '/v0/auth/link', anchor: 'log-in-with-login-link' },
  { verb: 'get', path: '/v0/auth/{provider}/login', anchor: 'log-in-with-sso' },
  { verb: 'post', path: '/v0/auth/reset/link', anchor: 'generate-password-reset-link' },
  { verb: 'put', path: '/v0/auth/reset', anchor: 'reset-password-with-password-reset-link' },
  { verb: 'post', path: '/v0/auth/verify/link', anchor: 'generate-account-verification-link' },
  { verb: 'get', path: '/v0/auth/logout', anchor: 'log-out' },
]"/>

::::
:::::

### Sign up with password

::::: row
:::: left

Register a new user with an email and password.

<parameters path="/v0/auth/create" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/create" verb="post"/>

<response path="/v0/auth/create" verb="post" source="$docsClient"/>

::::
:::::

### Sign up with passwordless

::::: row
:::: left

Register a new user with an email, and send them a login link.

If the user already exists, sends them a login link. See [generate login link](#generate-login-link).

<parameters path="/v0/auth/link" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/link" verb="post"/>

<response path="/v0/auth/link" verb="post" source="$docsClient"/>

::::
:::::

::::: row
:::: left

#### Test mode

In test mode, Userfront does not send emails. Instead, the API response will contain a `link` attribute that can be followed directly to log in.

::::
:::: right

<response-custom title="Response (test mode)" :response="{ message: 'OK', result: { link: 'http://localhost:3000/login?uuid=64758625-a004-44d0-90fe-fa7e5b012be4&token=d889bf75-9ab7-4354-82f9-3a1d9c8d6e6e&type=welcome' }}"/>

::::
:::::

### Log in with password

::::: row
:::: left

Log in with a password and email/username.

<parameters path="/v0/auth/basic" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/basic" verb="post"/>

<response path="/v0/auth/basic" verb="post" source="$docsClient"/>

::::
:::::

### Update own password

::::: row
:::: left

Update a user's password using their valid JWT access token and their existing password.

<parameters path="/v0/auth/basic" verb="put" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/basic" verb="put"/>

<response-custom :response="{ message: 'OK' }"/>

::::
:::::

::::: row
:::: left

#### If no password exists

If the user does not have a password (for example, if they logged in via SSO), the `password` and `existingPassword` fields are both ignored, and Userfront sends the user a password reset link.

::::
:::: right

<response-custom title="Response (if no password exists)" :response="{ message: 'OK', result: { to: 'user@example.com', messageId: '18299324-bf92-4ec9-bd47-403eda5f278d', submittedAt: new Date() }}"/>

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

<response-custom title="Response (if no password exists, test mode)" :response="{ message: 'OK', result: { link: 'http://localhost:3000/reset?uuid=64758625-a004-44d0-90fe-fa7e5b012be4&token=d889bf75-9ab7-4354-82f9-3a1d9c8d6e6e' }}"/>

::::
:::::

### Generate login link

::::: row
:::: left

Generate and send a login link email.

If no user exists with the given email, creates a new user and sends them a login link. See [sign up with passwordless](#sign-up-with-passwordless).

<parameters path="/v0/auth/link" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/link" verb="post"/>

<response path="/v0/auth/link" verb="post" source="$docsClient"/>

::::
:::::

::::: row
:::: left

#### Test mode

In test mode, Userfront does not send emails. Instead, the API response will contain a `link` attribute that can be followed directly to log in.

::::
:::: right

<response-custom title="Response (test mode)" :response="{ message: 'OK', result: { link: 'http://localhost:3000/login?uuid=64758625-a004-44d0-90fe-fa7e5b012be4&token=d889bf75-9ab7-4354-82f9-3a1d9c8d6e6e&type=login' }}"/>

::::
:::::

### Log in with login link

::::: row
:::: left

Log in using the token and uuid from a login link.

<parameters path="/v0/auth/link" verb="put" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/link" verb="put"/>

<response path="/v0/auth/link" verb="put" source="$docsClient"/>

::::
:::::

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

### Generate password reset link

::::: row
:::: left

Generate and send a password reset link email.

<parameters path="/v0/auth/reset/link" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/reset/link" verb="post"/>

<response path="/v0/auth/reset/link" verb="post" source="$docsClient"/>

::::
:::::

::::: row
:::: left

#### Test mode

In test mode, Userfront does not send emails. Instead, the API response will contain a `link` attribute that can be followed directly to reset the user's password.

::::
:::: right

<response-custom title="Response (test mode)" :response="{ message: 'OK', result: { link: 'http://localhost:3000/reset?uuid=64758625-a004-44d0-90fe-fa7e5b012be4&token=d889bf75-9ab7-4354-82f9-3a1d9c8d6e6e' }}"/>

::::
:::::

### Generate account verification link

::::: row
:::: left

Generate and send an account verification link email.

Functionally, an account verification link works the same as a login link, so the resulting `token` and `uuid` from the email can be handled via [Log in with login link](/docs/api-client.html#log-in-with-login-link).

<parameters path="/v0/auth/verify/link" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/verify/link" verb="post"/>

<response path="/v0/auth/verify/link" verb="post" source="$docsClient"/>

::::
:::::

::::: row
:::: left

#### Test mode

In test mode, Userfront does not send emails. Instead, the API response will contain a `link` attribute that can be followed directly to log in.

::::
:::: right

<response-custom title="Response (test mode)" :response="{ message: 'OK', result: { link: 'http://localhost:3000/login?uuid=64758625-a004-44d0-90fe-fa7e5b012be4&token=d889bf75-9ab7-4354-82f9-3a1d9c8d6e6e&type=verify' }}"/>

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

<code-samples-client path="/v0/auth/logout" verb="get" show-access-token="true"/>

<response path="/v0/auth/logout" verb="get" source="$docsClient"/>

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
