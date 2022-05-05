# Userfront core JS library

::::: row
:::: left

The Userfront core JavaScript library is intended for use in frontend applications.

It can be used for the following:

- **Authentication**: useful for building your own custom forms and auth flows.

  - [signup()](#signup-options)
  - [login()](#login-options)
  - [logout()](#logout-options)
  - [redirectIfLoggedIn()](#redirectifloggedin)
  - [resetPassword()](#resetpassword-options)
  - [sendLoginLink()](#sendloginlink-email)
  - [sendResetLink()](#sendresetlink-email)
  - [sendSms()](#sendsms-options)

- **User**: read or update information about a logged in user.

  - [user](#user)
  - [user.update()](#user-update-options)
  - [user.hasRole()](#user-hasrole-rolename-options)

- **Tokens**: read the user's access or ID token.
  - [tokens.accessToken](#tokens-accesstoken)
  - [tokens.accessTokenName](#tokens-accesstokenname)
  - [tokens.idToken](#tokens-idtoken)
  - [tokens.idTokenName](#tokens-idtokenname)

::::
:::: right

::: card

#### Libraries

The following libraries each implement all of the core JS methods:

- [@userfront/core](https://github.com/userfront/userfront-core)
- [Userfront HTML](https://github.com/userfront/userfront-html)
- [@userfront/react](https://github.com/userfront/userfront-react)
- [@userfront/vue](https://github.com/userfront/userfront-vue)

:::

::::
:::::

# Setup

::::: row
:::: left

::: tip Note
The core library must always be initialized with an account or tenant ID using the [init()](#init-tenantid) method.
:::

::::
:::::

## init (tenantId)

::::: row
:::: left

Initializes the Userfront core library with your account or tenant ID.

::::
:::: right

```js
import Userfront from "@userfront/core";

Userfront.init("demo1234");
```

::::
:::::

## addInitCallback (function)

::::: row
:::: left

Calls the supplied callback whenever `Userfront.init()` is called. A JSON object with the `tenantId` is supplied to the callback.

If `addInitCallback` is called more than once, callbacks are called in the order they were added (first added = first called).

Once `Userfront.init()` is called, the callbacks are reset and are not called on subsequent `Userfront.init()` calls.

::::
:::: right

```js
import Userfront, { addInitCallback } from "@userfront/core";

addInitCallback((data) => console.log(data));
addInitCallback(console.log("Again"));

Userfront.init("demo1234");

// => { tenantId: "demo1234" }
// => Again

Userfront.init("demo1234");

// No callbacks
```

::::
:::::

# Authentication

## signup (options)

Registers a new user with one of the available methods.

| Option     | Description                                                                                                                                                          |
| :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _method_   | The method for registering. Options are: `password`, `passwordless`, `apple`, `azure`, `facebook`, `github`,`google`,`linkedin`. See below for more info on methods. |
| _email_    | The user's email address, which is required for the `password` and `passwordless` methods.                                                                           |
| _username_ | The user's username (optional). Used only with the `password` and `passwordless` methods.                                                                            |
| _name_     | The user's name (optional). Used only with the `password` and `passwordless` methods.                                                                                |
| _data_     | The user's custom data object (optional). Used only with the `password` and `passwordless` methods.                                                                  |
| _password_ | The user's password. Used only with the `password`.                                                                                                                  |
| _redirect_ | Manually set the path to redirect to, or `false` to prevent redirection.                                                                                             |

### Signup via `password` method

::::: row
:::: left

Submits an email and password to create a user.

Upon success, receives auth tokens and adds the auth tokens to the browser's cookies, then redirects the browser to the After-signup path.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Example with email
Userfront.signup({
  method: "password",
  email: "user@example.com",
  password: "testmodepassword",
});

// Example with name and username included
Userfront.signup({
  method: "password",
  email: "user@example.com",
  name: "Jane Doe",
  username: "jdoe11",
  data: {
    custom: "information",
  },
  password: "testmodepassword",
});
```

::: caret Return values
<response-js method="Userfront.signup(...)" path="/v0/auth/create" verb="post" source="$docsClient"
error-message="Password must be at least 16 characters OR at least 8 characters including a number and a letter"/>
:::

::::
:::::

### Signup via `passwordless` method

::::: row
:::: left

Creates a user and sends them an email with a link to log in. This link works with the [Login via link](/docs/js.html#login-via-link-method) method.

If a user with the given email address already exists, sends them an email to log in.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Example with email
Userfront.signup({
  method: "passwordless",
  email: "user@example.com",
});

// Example with name and username included
Userfront.signup({
  method: "passwordless",
  email: "user@example.com",
  name: "Jane Doe",
  username: "jdoe11",
  data: {
    custom: "information",
  },
});
```

::: caret Return values
<response-js method="Userfront.signup(...)" path="/v0/auth/link" verb="post" source="$docsClient"
error-message="Email format is invalid"/>
:::

::::
:::::

### Signup via `apple`, `azure`, `facebook`, `github`, `google`, or `linkedin` methods

<br/>

::::: row
:::: left

Initiates the sign-on flow for a given SSO provider.

::: tip Note
When using SSO, there is no difference between the `signup` and `login` methods.

Both methods initiate the sign-on flow:

- New users are ultimately redirected to your After-signup path
- Existing users are ultimately redirected to your After-login path.

:::

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Example with GitHub
Userfront.signup({ method: "github" });

// Example with Google
Userfront.signup({ method: "google" });
```

::::
:::::

## login (options)

Initiates a login for a user with one of the available methods.

| Option            | Description                                                                                                                                                                                |
| :---------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _method_          | The method for logging in. Options are: `password`, `passwordless`, `link`, `mfa`, `apple`, `azure`, `facebook`, `github`,`google`,`linkedin`, `saml`. See below for more info on methods. |
| _email_           | The user's email. Used with the `password` and `passwordless` methods.                                                                                                                     |
| _username_        | The user's username. Used only with the `password` method.                                                                                                                                 |
| _emailOrUsername_ | The user's email or username. Used only with the `password` method.                                                                                                                        |
| _password_        | The user's password. Used only with the `password` method.                                                                                                                                 |
| _token_           | The `token=` URL parameter sent in a login link. Used only with the `link` method.                                                                                                         |
| _uuid_            | The `uuid=` URL parameter sent in a login link. Used only with the `link` method.                                                                                                          |
| _redirect_        | Manually set the path to redirect to, or `false` to prevent redirection.                                                                                                                   |
| _firstFactorCode_ | A string identifier obtained from the login response (requires MFA enabled for your tenant) to complete MFA login. Used only with `mfa` method.                                            |
| _securityCode_    | MFA security code sent to the user's device. Used only with `mfa` method.                                                                                                                  |

### Login via `password` method

::::: row
:::: left

Sends a username or email along with a password in order to receive auth tokens, then adds the auth tokens to the browser's cookies and redirects the browser to the After-login path.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Example with email
Userfront.login({
  method: "password",
  email: "user@example.com",
  password: "testmodepassword",
});

// Example with username
Userfront.login({
  method: "password",
  username: "janedoe",
  password: "testmodepassword",
});

// Example with emailOrUsername
Userfront.login({
  method: "password",
  emailOrUsername: "user@example.com", // or "janedoe"
  password: "testmodepassword",
});
```

::: caret Return values
<response-js method="Userfront.login(...)" path="/v0/auth/basic" verb="post" source="$docsClient"
error-message="Incorrect email or password"/>
:::

::::
:::::

### Login via `passwordless` method

::::: row
:::: left

Sends the user an email with a link to log in. This link works with the [Login via link](/docs/js.html#login-via-link-method) method.

::: tip Note
If no user exists with the given email, this method creates a new user and sends them a login link.

See also: [signup via passwordless method](#signup-via-passwordless-method).
:::

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Send a login link email
Userfront.login({
  method: "passwordless",
  email: "user@example.com",
});
```

::: caret Return values
<response-js method="Userfront.login(...)" path="/v0/auth/link" verb="post" source="$docsClient"
error-message="Email format is invalid"/>
:::

::::
:::::

### Login via `link` method

::::: row
:::: left

This method is used to read the URL query parameters `token` and `uuid` that are sent with login link emails, and uses these parameters to log in a user.

Sends the token and uuid in order to receive auth tokens, then adds the auth tokens to the browser's cookies and redirects the browser to the After-login path.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Get token & uuid from URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");
const uuid = urlParams.get("uuid");

// Log in with link
Userfront.login({
  method: "link",
  token: token,
  uuid: uuid,
});
```

::: caret Return values
<response-js method="Userfront.login(...)" path="/v0/auth/link" verb="put" source="$docsClient"
error-message="Invalid token"/>
:::

::::
:::::

### Login via `apple`, `azure`, `facebook`, `github`, `google`, or `linkedin` methods

<br />

::::: row
:::: left

Initiates the sign-on flow for a given SSO provider.

::: tip Note
When using SSO, there is no difference between the `signup` and `login` methods.

Both methods initiate the sign-on flow:

- New users are ultimately redirected to your After-signup path
- Existing users are ultimately redirected to your After-login path.

:::

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Example with GitHub
Userfront.login({ method: "github" });

// Example with Google
Userfront.login({ method: "google" });
```

::::
:::::

### Login via `saml` method

<br />

::::: row
:::: left

Completes the sign-on flow for a SAML service provider.

Obtains a SAML token and redirects the browser to the Userfront API SAML login endpoint where the login response will be sent to the service provider who initiated the SAML login request.

When a user clicks a link to log in to a service provider, the service provider sends a SAML login request to the Userfront API which will then redirect the browser to your [After-logout path](https://userfront.com/guide/glossary.html#after-logout-path) where this method should be called.

::: tip Note
When using the `saml` method, there is no difference between signing the user _in_ and signing the user _up_.

Both cases are handled by the service provider during the sign-on flow:

- New users are redirected to the service provider's signup process.
- Existing users will be redirected to the service provider's path after logging in.

:::

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.login({ method: "saml" });
```

::::
:::::

### Login via `mfa` method

Completes the login process using an MFA security code.

::::: row
:::: left

::: warning Note
Requires MFA to be enabled for tenant.

MFA is currently in beta. If you would like to enable it for your account, please contact us using the chat in the bottom-right.
:::

| Property          | Type   | Description                                                                                                                                                |
| :---------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `firstFactorCode` | String | The string identifier obtained from the [login()](#login-options) response to complete MFA login - see [sendSms()](#sendsms-options) for more information. |
| `securityCode`    | String | The security code sent to the user's device.                                                                                                               |

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.login({
  method: "mfa",
  firstFactorCode: "a9c9b41c-ce76-4f7e-915a-abf18a36a4ae",
  securityCode: "123456",
});
```

::: caret Return values
<response-js method="Userfront.login(...)" path="/v0/auth/mfa" verb="put" source="$docsClient"
error-message="Missing information"/>
:::

::::
:::::

## logout (options)

Initiates logout for a user.

| Option     | Description                                                              |
| :--------- | :----------------------------------------------------------------------- |
| _redirect_ | Manually set the path to redirect to, or `false` to prevent redirection. |
| _method_   | The method for logging out. Currently only used for SAML.                |

### Default `logout()`

::::: row
:::: left

Logs a user out by invalidating their session, removes auth tokens from the browser, and then redirects the browser to the After-logout path.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Log out a user
Userfront.logout();

// Log out a user without redirecting
Userfront.logout({ redirect: false });
```

::: caret Return values
<response-js method="Userfront.logout(...)" path="/v0/auth/logout" verb="get" source="$docsClient"/>
:::

::::
:::::

### Log out of SAML service provider

::::: row
:::: left

Completes the SAML logout process.

Obtains a SAML token and redirects the browser to the SAML logout endpoint where the logout response will be sent to the service provider who initiated the SAML logout request.

When a user wants to log out of a service provider, the service provider sends a SAML logout request to the Userfront API which will then redirect the browser to your [After-logout path](https://userfront.com/guide/glossary.html#after-logout-path) where this method should be called.

Upon successful logout, the user will be logged out of the service provider yet remain logged in to your tenant's application.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Complete log out process for service provider
Userfront.logout({ method: "saml" });
```

::::
:::::

## redirectIfLoggedIn ()

::::: row
:::: left

Checks if the user is logged in and, if so, redirects the browser to the After-login path.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.redirectIfLoggedIn();
```

::::
:::::

## resetPassword (options)

::::: row
:::: left

Resets a user's password, then logs the user in by adding auth tokens to the browser's cookies and redirects the browser to the After-login path.

| Option     | Required | Description                                                 |
| :--------- | -------- | :---------------------------------------------------------- |
| _password_ | ✓        | The new password to set for the user.                       |
| _token_    |          | The `token=` URL parameter sent in the password reset link. |
| _uuid_     |          | The `uuid=` URL parameter sent in the password reset link.  |

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Read token & uuid from the URL
Userfront.resetPassword({
  password: "myshinynewpassword",
});

// Pass token & uuid explicitly
Userfront.resetPassword({
  password: "myshinynewpassword",
  token: "34765497-f806-4be2-a32e-26df63ce9f7f",
  uuid: "9994b8d1-d51b-4a83-aa85-7e7508b92525",
});
```

::: caret Return values
<response-js method="Userfront.resetPassword(...)" path="/v0/auth/reset" verb="put" source="$docsClient"
error-message="Invalid token"/>
:::

::::
:::::

## sendLoginLink (email)

::::: row
:::: left

Sends an email containing a login link. This link directs the user to the After-logout path, where the login form should be located.

The user in question must exist already.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.sendLoginLink("user@example.com");
```

::: caret Return values
<response-js method="Userfront.sendLoginLink(...)" path="/v0/auth/link" verb="post" source="$docsClient"
error-message="Email format is invalid"/>
:::

::::
:::::

## sendResetLink (email)

::::: row
:::: left

Sends an email containing a password reset link. This link directs the user to the Password reset path.

The user in question must exist already.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.sendResetLink("user@example.com");
```

::: caret Return values
<response-js method="Userfront.sendResetLink(...)" path="/v0/auth/reset/link" verb="post" source="$docsClient"
error-message="Email format is invalid"/>
:::

::::
:::::

## sendSms (options)

::::: row
:::: left

Sends an SMS to a phone number.

| Option            | Description                                                                                                                                                                                                                                           |
| :---------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _type_            | The type of SMS to send. Currently the only option is `mfa`. See below for more info.                                                                                                                                                                 |
| _to_              | The phone number where the SMS should be sent. The phone number should be in E.164 format. <br><br>E.164 numbers are formatted [+] [country code] [subscriber number including area code] and can have a maximum of fifteen digits. e.g. +15558675309 |
| _firstFactorCode_ | A string identifier obtained from the [login()](#login-options) response to complete MFA login.                                                                                                                                                       |

::::

:::: right

The `firstFactorCode` parameter is obtained in the response of [login()](#login-options) when **MFA is enabled** for your tenant:

```json
{
  "message": "OK",
  "result": {
    "mode": "live",
    "firstFactorCode": "304a8def-651c-4ab2-9ca0-1e3fca9e280a",
    "allowedStrategies": ["securityCode"],
    "allowedChannels": ["sms"]
  }
}
```

::::
:::::

### Send SMS via type `securityCode`

::::: row
:::: left

Sends an SMS containing an MFA security code to the phone number provided.

::: warning Note
Requires MFA to be enabled for tenant.

MFA is currently in beta. If you would like to enable it for your account, please contact us using the chat in the bottom-right.
:::

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.sendSms({
  type: "securityCode",
  to: "+15558675309",
  firstFactorCode: "a9c9b41c-ce76-4f7e-915a-abf18a36a4ae",
});
```

::: caret Return values
<response-js method="Userfront.sendSms(...)" path="/v0/auth/mfa" verb="post" source="$docsClient"
error-message="Phone number must be in E.164 format."/>
:::

::::
:::::

# User

## user

::::: row
:::: left
Returns information about the currently logged in user.

::: tip Note
Userfront.user is intended for frontend use only, to help you display information about the user.
:::

::::
:::::

::::: row
:::: left

| Property      | Type          | Description                                |
| :------------ | :------------ | :----------------------------------------- |
| `email`       | String        |                                            |
| `name`        | String        | Full name                                  |
| `image`       | String        | Image URL                                  |
| `data`        | Object        | Custom JSON data object                    |
| `username`    | String        |
| `confirmedAt` | String        | When the user confirmed their email        |
| `isConfirmed` | Boolean       | Whether the user has confirmed their email |
| `createdAt`   | String        | When the user record was created           |
| `updatedAt`   | String        | When the user record was last updated      |
| `mode`        | String        | `live` or `test` mode                      |
| `tenantId`    | String        |
| `userId`      | Integer       |
| `userUuid`    | String (UUID) |

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.user;

/** =>
 * {
 *    email: "jane@example.com",
 *    name: "Jane Example",
 *    image: "https://res.cloudinary.com/component/image/upload/avatars/avatar-plain-9.png",
 *    data: {
 *      value: "anything-you-want",
 *      custom: {
 *        value: "custom-value"
 *      }
 *    },
 *    username: "jane-example",
 *    confirmedAt: "2020-01-01T00:00:00.000Z",
 *    isConfirmed: true,
 *    createdAt: "2020-01-01T00:00:00.000Z",
 *    updatedAt: "2020-01-01T00:00:00.000Z",
 *    mode: "test",
 *    tenantId: "demo1234",
 *    userId: 1,
 *    userUuid: "d6f0f045-f6ea-4262-8724-dfc0b77e7dc9",
 * }
 */
```

::::
:::::

## user.update (options)

::::: row
:::: left

Sends a request to update the currently logged in user.

The following user attributes are editable:

| Property   | Type   |
| :--------- | :----- |
| `name`     | String |
| `image`    | String |
| `username` | String |
| `data`     | Object |

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.user.update({
  name: "John Example",
  data: {
    somethingCustom: true,
  },
});
```

::::
:::::

## user.hasRole (roleName, options)

::::: row
:::: left

Helper method to determine if the logged in user has a given role in the `authorization` object of their JWT access token.

Returns `true` if the role is present, or `false` if not present.

::: warning Note
user.hasRole() should only be used to show or hide public elements like buttons or badges.

Sensitive information should always rely on server-side checks.
:::

| Option     | Description                                                                           |
| :--------- | :------------------------------------------------------------------------------------ |
| _tenantId_ | The tenant to check against. Defaults to the tenantId from `Userfront.init(tenantId)` |

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

/**
 * {
 *   ...
 *   authorization: {
 *     demo1234: {
 *       roles: ["admin"]
 *     },
 *     abcd1234: {
 *       roles: ["custom role"]
 *     },
 *   }
 * }
 */

// Check for a role in demo1234 tenant
Userfront.user.hasRole("admin");
// => true
Userfront.user.hasRole("member");
// => false

// Check for a role in abcd1234 tenant
Userfront.user.hasRole("custom role", {
  tenantId: "abcd1234",
});
// => true
```

::::
:::::

# Tokens

## tokens.accessToken

::::: row
:::: left

Returns the JWT access token.

Your frontend application can send the access token to your server in order to authenticate a user and provide information about their access levels. For more information, see [Tokens & Access](/guide/auth/).

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.tokens.accessToken;

// => "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoidGVzdCIsImlzQ29uZmlybWVkIjp0cnVlLCJ1c2VySWQiOjEsInVzZXJVdWlkIjoiZDAwNTlmN2UtYzU0OS00NmYzLWEzYTMtOGEwNDY0MDkzZmMyIiwidGVuYW50SWQiOiJwOW55OGJkaiIsInNlc3Npb25JZCI6IjRlZjBlMjdjLTI1NDAtNDIzOS05YTJiLWRkZjgyZjE3YmExYiIsImF1dGhvcml6YXRpb24iOnsicDlueThiZGoiOnsidGVuYW50SWQiOiJwOW55OGJkaiIsIm5hbWUiOiJVc2VyZnJvbnQiLCJyb2xlcyI6WyJhZG1pbiJdLCJwZXJtaXNzaW9ucyI6W119fSwiaWF0IjoxNjE3MTQ4MDY3LCJleHAiOjE2MTk3NDAwNjd9.gYz4wxPHLY6PNp8KPEyIjLZ8QzG3-NFJGPitginuLaU"
```

::::
:::::

## tokens.accessTokenName

::::: row
:::: left

Returns the name of the cookie that holds the JWT access token.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.tokens.accessTokenName;

// => "access.demo1234"
```

::::
:::::

## tokens.idToken

::::: row
:::: left

::: warning Note
The ID token is not intended for authentication or access control.

It is used client-side as a verifiable copy of the user's data. Typically it is easier to reference the [user](#user) object instead.
:::

Returns the JWT ID token.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.tokens.idToken;

// => "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2RlIjoidGVzdCIsInRlbmFudElkIjoicDlueThiZGoiLCJ1c2VySWQiOjEsInVzZXJVdWlkIjoiZDAwNTlmN2UtYzU0OS00NmYzLWEzYTMtOGEwNDY0MDkzZmMyIiwiZW1haWwiOiJhZG1pbkBleGFtcGxlLmNvbSIsImlzQ29uZmlybWVkIjp0cnVlLCJ1c2VybmFtZSI6ImFkbWluIiwibmFtZSI6IkFkbWluIFVzZXIiLCJpbWFnZSI6Imh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2NvbXBvbmVudC9pbWFnZS91cGxvYWQvYXZhdGFycy9hdmF0YXItMDcucG5nIiwiZGF0YSI6eyJjdXN0b20iOiJkYXRhIn0sImNvbmZpcm1lZEF0IjoiMjAyMC0wOS0xMVQyMTo1MjoyOC44MjBaIiwiY3JlYXRlZEF0IjoiMjAyMC0wOS0xMVQyMTo1MjoyOC4wOTVaIiwidXBkYXRlZEF0IjoiMjAyMS0wMy0yNFQyMDo1MzowMi4zMDVaIiwic2Vzc2lvbklkIjoiNGVmMGUyN2MtMjU0MC00MjM5LTlhMmItZGRmODJmMTdiYTFiIiwiaWF0IjoxNjE3MTQ4MDY3LCJleHAiOjE2MTk3NDAwNjd9.SZXylt-4G9KtS1Tr52ei75l0Y2eYqYWhVYzQLzXMvS8"
```

::::
:::::

## tokens.idTokenName

::::: row
:::: left

Returns the name of the cookie that holds the JWT ID token.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.tokens.idTokenName;

// => "id.demo1234"
```

::::
:::::
