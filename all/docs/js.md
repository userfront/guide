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
  - [sendVerificationCode()](#sendverificationcode-options)
  - [sendSms()](#sendsms-options)

- **User**: read or update information about a logged in user.

  - [user](#user)
  - [user.update()](#user-update-options)
  - [user.updatePassword()](#user-updatepassword-options)
  - [user.getTotp()](#user-gettotp)
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

| Option        | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _method_      | The method for registering. Options are: [password](#signup-via-password-method), [passwordless](#signup-via-passwordless-method), [verificationCode](#signup-via-verificationcode-method), [apple, azure, facebook, github, google, or linkedin](#signup-via-apple-azure-facebook-github-google-or-linkedin-methods). See below for more info on methods. See below for more info on methods. |
| _email_       | The user's email address, which is required for the `password` and `passwordless` methods.                                                                                                                                                                                                                                                                                                     |
| _phoneNumber_ | The user's phone number, which is required for the `verificationCode` method when using the `sms` channel.                                                                                                                                                                                                                                                                                     |
| _username_    | The user's username (optional). Used only with the `password` and `passwordless` methods.                                                                                                                                                                                                                                                                                                      |
| _name_        | The user's name (optional). Used only with the `password` and `passwordless` methods.                                                                                                                                                                                                                                                                                                          |
| _data_        | The user's custom data object (optional). Used only with the `password` and `passwordless` methods.                                                                                                                                                                                                                                                                                            |
| _password_    | The user's password. Used only with the `password`.                                                                                                                                                                                                                                                                                                                                            |
| _redirect_    | Manually set the path to redirect to, or `false` to prevent redirection.                                                                                                                                                                                                                                                                                                                       |

### Signup via `password` method

::::: row
:::: left

Submits an email and password to create a user.

Upon success, receives JWT access token and adds the JWT access token to the browser's cookies, then redirects the browser to the After-signup path.

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

### Signup via `verificationCode` method

::::: row
:::: left

This method creates a new user and sends them a 6-digit `verificationCode` by SMS or email.

If a user with the given phone number or email address already exists, it sends them a 6-digit verification code to log in.

This verification code works with the [Login via verificationCode](#login-via-verificationcode-method) method.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Sign up with SMS verificationCode (default)
Userfront.signup({
  method: "verificationCode",
  channel: "sms",
  phoneNumber: "+15558675309",
  name: "John Doe",
  username: "jdoe11",
  email: "user@example.com",
  data: {
    custom: "information",
  },
});

// Sign up with email verificationCode
Userfront.signup({
  method: "verificationCode",
  channel: "email",
  email: "user@example.com",
  data: {
    custom: "information",
  },
});
```

::: caret Return values
<response-js method="Userfront.login(...)" path="/v0/auth/code" verb="post" source="$docsClient"
error-message="Email exists"/>
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

| Option             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _method_           | The method for logging in. Options are: [password](#login-via-password-method), [passwordless](#login-via-passwordless-method), [link](#login-via-link-method), [totp](#login-via-totp-method), [verificationCode](#login-via-verificationcode-method), [apple, azure, facebook, github, google, linkedin](#login-via-apple-azure-facebook-github-google-or-linkedin-methods), and [saml](#login-via-saml-method). See below for more info on methods. |
| _email_            | The user's email. Used with the `password` and `passwordless` methods.                                                                                                                                                                                                                                                                                                                                                                                 |
| _username_         | The user's username. Used only with the `password` method.                                                                                                                                                                                                                                                                                                                                                                                             |
| _emailOrUsername_  | The user's email or username. Used only with the `password` method.                                                                                                                                                                                                                                                                                                                                                                                    |
| _password_         | The user's password. Used only with the `password` method.                                                                                                                                                                                                                                                                                                                                                                                             |
| _token_            | The `token=` URL parameter sent in a login link. Used only with the `link` method.                                                                                                                                                                                                                                                                                                                                                                     |
| _uuid_             | The `uuid=` URL parameter sent in a login link. Used only with the `link` method.                                                                                                                                                                                                                                                                                                                                                                      |
| _totpCode_         | A one-time code generated by a TOTP authenicator device. Used only with the `totp` method.                                                                                                                                                                                                                                                                                                                                                             |
| _backupCode_       | A single-use backup code to be used in place of the `totpCode` if a TOTP authenticator device is lost. Used only with the `totp` method.                                                                                                                                                                                                                                                                                                               |
| _verificationCode_ | A 6-digit code sent by email or SMS. Used only with `verificationCode` method.                                                                                                                                                                                                                                                                                                                                                                         |
| _redirect_         | Manually set the path to redirect to, or `false` to prevent redirection.                                                                                                                                                                                                                                                                                                                                                                               |

### Login via `password` method

::::: row
:::: left

This method is used to log in with a `password` along with an `email` or `username`.

Sends a `username` or `email` along with a `password` in order to receive a JWT access token, then adds the JWT access token to the browser's cookies and redirects the browser to the After-login path.

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

This method is used to send the user a magic/passwordless login link.

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

Sends the `token` and `uuid` in order to receive JWT access token, then adds the JWT access token to the browser's cookies and redirects the browser to the After-login path.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Read token & uuid from the URL
Userfront.login({ method: "link" });

// Pass token & uuid explicitly
Userfront.login({
  method: "link",
  token: "34765497-f806-4be2-a32e-26df63ce9f7f",
  uuid: "9994b8d1-d51b-4a83-aa85-7e7508b92525",
});
```

::: caret Return values
<response-js method="Userfront.login(...)" path="/v0/auth/link" verb="put" source="$docsClient"
error-message="Invalid token"/>
:::

::::
:::::

### Login via `totp` method

::::: row
:::: left

This method is used to pass a one-time `totpCode` generated by the user's TOTP authenticator device.

The [user.getTotp()](#getTotp) method allows a user to pair their TOTP authenticator device to generate codes.

#### Backup codes

When a user pairs their TOTP authenticator device with [user.getTotp()](#getTotp), the response also returns an array of single-use backup codes.

These `backupCodes` can be used once each, to log in without a `totpCode` in case their TOTP authenticator device is lost.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Log in with totpCode
Userfront.login({
  method: "totp",
  emailOrUsername: "user@example.com",
  totpCode: "123456",
});

// Log in with backupCode
Userfront.login({
  method: "totp",
  emailOrUsername: "user@example.com",
  backupCode: "aaaaa-bbbbb",
});
```

::: caret Return values
<response-js method="Userfront.login(...)" path="/v0/auth/totp" verb="post" source="$docsClient"
error-message="Invalid TOTP code"/>
:::

::::
:::::

### Login via `verificationCode` method

::::: row
:::: left

This method is used to log in with a 6-digit `verificationCode`.

Sends the `channel`, `phoneNumber` (or `email`), and `verificationCode` in order to receive a JWT access token, then adds the JWT access token to the browser's cookies and redirects the browser to the After-login path.

See the [sendVerificationCode()](#sendverificationcode-options) method to send the user a verification code by `sms` or `email`.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Log in with SMS verificationCode (default)
Userfront.login({
  method: "verificationCode",
  channel: "sms",
  phoneNumber: "+15558675309",
  verificationCode: "123456",
});

// Log in with email verificationCode
Userfront.login({
  method: "verificationCode",
  channel: "email",
  email: "user@example.com",
  verificationCode: "123456",
});
```

::: caret Return values
<response-js method="Userfront.login(...)" path="/v0/auth/code" verb="put" source="$docsClient"
error-message="Invalid verificationCode"/>
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

Completes the login process using an MFA verification code.

::::: row
:::: left

::: warning Note
Requires MFA to be enabled for tenant.

MFA is currently in beta. If you would like to enable it for your account, please contact us using the chat in the bottom-right.
:::

| Property           | Type   | Description                                                                                                                                                |
| :----------------- | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `firstFactorCode`  | String | The string identifier obtained from the [login()](#login-options) response to complete MFA login - see [sendSms()](#sendsms-options) for more information. |
| `verificationCode` | String | The verification code sent to the user's device.                                                                                                           |

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.login({
  method: "mfa",
  firstFactorCode: "a9c9b41c-ce76-4f7e-915a-abf18a36a4ae",
  verificationCode: "123456",
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

Logs a user out by invalidating their session, removes JWT access token from the browser, and then redirects the browser to the After-logout path.

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

Reset a user's password with the reset link credentials (`token` and `uuid`).

Uses the reset link credentials (`token` and `uuid`) to reset the user's password, then logs the user in by adding their JWT access token to the browser's cookies, and finally redirects the browser to the After-login path.

If the user does not have a password yet, then their password is created.

| Option     | Description                                                              |
| :--------- | :----------------------------------------------------------------------- |
| _password_ | The new password to set for the user.                                    |
| _token_    | The `token=` URL parameter sent in the password reset link.              |
| _uuid_     | The `uuid=` URL parameter sent in the password reset link.               |
| _redirect_ | Manually set the path to redirect to, or `false` to prevent redirection. |

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Read token & uuid from the URL
Userfront.updatePassword({
  password: "myshinynewpassword",
});

// Pass token & uuid explicitly
Userfront.updatePassword({
  password: "myshinynewpassword",
  token: "34765497-f806-4be2-a32e-26df63ce9f7f",
  uuid: "9994b8d1-d51b-4a83-aa85-7e7508b92525",
});
```

::: caret Return values
<response-js method="Userfront.updatePassword(...)" path="/v0/auth/reset" verb="put" source="$docsClient"
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

The password reset link contains the `token` and `uuid` credentials, which can be used with the [updatePassword](#updatepassword-options) method.

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

## sendVerificationCode (options)

::::: row
:::: left

Sends an SMS or email containing a 6-digit verification code.

The verification code can be used with the [Login via verificationCode](#login-via-verificationcode-method) method.

If the user does not exist yet, a new record is created.

| Option        | Description                                                                                     |
| :------------ | :---------------------------------------------------------------------------------------------- |
| _channel_     | `"sms"` (default) or `"email"`                                                                  |
| _phoneNumber_ | The user's phone number. Required when using the `sms` channel.                                 |
| _email_       | The user's email address. Required when using the `email` channel or if registering a new user. |
| _username_    | The user's username (optional). Used if registering a new user.                                 |
| _name_        | The user's name (optional). Used if registering a new user.                                     |
| _data_        | The user's custom data object (optional). Used if registering a new user.                       |

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Send verification code by SMS (default)
Userfront.sendVerificationCode({
  channel: "sms",
  phoneNumber: "+15558675309",
});

// Send verification code by email
Userfront.sendVerificationCode({
  channel: "email",
  email: "user@example.com",
});
```

::: caret Return values
<response-js method="Userfront.sendVerificationCode(...)" path="/v0/auth/code" verb="post" source="$docsClient"
error-message='"phoneNumber" not found or not yet verified'/>
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
    "allowedStrategies": ["verificationCode"],
    "allowedChannels": ["sms"]
  }
}
```

::::
:::::

### Send SMS via type `verificationCode`

::::: row
:::: left

Sends an SMS containing an MFA verification code to the phone number provided.

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
  type: "verificationCode",
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

## user.updatePassword (options)

::::: row
:::: left

Updates a user's password while they are logged in.

If the user has a password already, the `existingPassword` field must be correct.

If the user does not have a password yet (e.g. if they signed up with SSO), the `existingPassword` field is ignored, and the `password` field is set directly.

| Option             | Description                                                                                                                                                                                                           |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _password_         | The new password to set for the user.                                                                                                                                                                                 |
| _existingPassword_ | The user's existing password. Ignored if they do not have an existing password.                                                                                                                                       |
| _method_           | If not defined, `user.updatePassword` first checks for reset link credentials (`token` and `uuid`), then checks the user's JWT access token. To skip checking for reset link credentials, specify `{ method: "jwt" }` |

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

// Update a user's password while logged in
Userfront.user.updatePassword({
  password: "myshinynewpassword",
  existingPassword: "mydulloldpassword",
});
```

::: caret Return values
<response-js method="Userfront.updatePassword(...)" path="/v0/auth/basic" verb="put" source="$docsClient"
error-message="Incorrect password"/>
:::

::::
:::::

## user.getTotp ()

::::: row
:::: left

Reads TOTP credentials for the currently logged in user, allowing them to pair a TOTP authenticator device to their account.

Once a device is paired, users can generate codes to [Login via TOTP method](#login-via-totp-method).

### QR code

The `qrCode` attribute is the URL for a png image that can be displayed directly to the user.

```html
<img src="data:image/png;base64,iVBORw0KG..." />
```

<img src="data:image/png;base64,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"/>

### Backup codes

Each user initially begins with 10 single-use backup codes for TOTP.

You should display these backup codes to the user so that they can store them in case they lose access to their authenticator device.

If all 10 single-use backup codes are used, the user will have to re-pair their authenticator device, at which time they will receive 10 new codes.

::::
:::: right

```js
import Userfront from "@userfront/core";
Userfront.init("demo1234");

Userfront.user.getTotp();
```

::: caret Return values
<response-js method="Userfront.user.getTotp()" path="/v0/auth/totp" verb="get" source="$docsClient"
error-message="Unauthorized"/>
:::

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
