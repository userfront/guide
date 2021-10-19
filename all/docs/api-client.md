---
sidebarDepth: 2
---

# API reference: Client-to-Server

::::: row
:::: left

The Userfront API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable resource-oriented URLs, accepts [JSON-encoded](http://www.json.org/) request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

You can use the Userfront API in test mode, which does not affect your live data. The request origin and JWT access token used to for the request determine whether the request is live mode or test mode.

<!-- Log in to see docs customized to your version of the API, with your test key and data. -->

::::
:::: right

#### Just getting started?

Check out our development [quickstart guide](/guide/quickstart/).

::: card

#### Base URL

<code style="background-color:inherit;font-size:14px;padding:0;">https://api.userfront.com</code>
:::

::::
:::::

## Authentication

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

Register a new user with an email only.

If the user already exists, sends them a login link. See [generate login link](#generate-login-link).

<parameters path="/v0/auth/link" verb="post" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/link" verb="post"/>

<response path="/v0/auth/link" verb="post" source="$docsClient"/>

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

#### If no password exists

::::: row
:::: left

If the user does not have a password (for example, if they logged in via SSO), the `password` and `existingPassword` fields are both ignored, and Userfront sends the user a password reset link.

::::
:::: right

<response-custom title="Response (if no password exists)" :response="{ message: 'OK', result: { to: 'user@example.com', messageId: '18299324-bf92-4ec9-bd47-403eda5f278d', submittedAt: new Date() }}"/>

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

Log in using an SSO provider.

The SSO provider must already be configured.

#### Query string

---

**tenant_id** required

**origin** required

<br>

<parameters path="/v0/auth/{provider}/login" verb="get" source="$docsClient"/>

::::
:::: right

<code-samples-client path="/v0/auth/{provider}/login" verb="get"/>

<response path="/v0/auth/{provider}/login" verb="get" source="$docsClient"/>

::::
:::::

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
