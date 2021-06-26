---
title: Build a password reset form with HTML
---

<toolkit-breadcrumb />

# Build a password reset form with HTML

::::: row
:::: left

In this section, we create a custom password reset form that allows a user to reset their password and includes:

- [Password verification](#password-verification)
- [Error messages](#error-handling)

::::
:::::

## Example: custom password reset form

::::: row
::::left

You can clone the example password reset form on [CodePen](https://codepen.io/userfront/pen/GRWaZvB) and make edits, or follow along below.

::: tip NOTE
The example form has the Userfront Core JS library added to the document, as described in the section below.
:::

The password reset flow is as follows:

1. **A user requests a password reset email.** Userfront sends the user an email. This email contains a link to reset the user's password.
2. **The user clicks the link.** The link has a special `token` and `uuid` in the URL.
3. **The user submits their new password.** The user submits their new password with the password reset form on the page. The form updates the user's password and then logs in the user.

::::
:::: right

<br/>
<codepen title="Build a password reset form HTML" slug="GRWaZvB"/>

::: warning NOTE
The `token` and `uuid` from the password reset email must be present in the URL. Thus, this example form does not reset an actual password.
:::

::::
:::::

## Add the Userfront Core JS library

::::: row
:::: left

Start by adding the Userfront Core JS library via CDN or using npm.

You only need to do one of these.

::::
:::: right

### CDN

```html
<script src="https://cdn.userfront.com/core.js"></script>
```

<br>

### NPM

```sh
npm install @userfront/core
```

Then import the library into your file(s)

```js
import Userfront from "@userfront/core";
```

::::
:::::

## Requesting a password reset email

::::: row
::::left

In order to request a password reset email, call the [sendResetLink()](/docs/js.html#sendresetlink-email) method with the user's email address.

Userfront will email the user with a link to your account's [Password reset path](/guide/glossary.html#password-reset-path).

The link will look something like:

`https://www.example.com/reset?token=...&uuid=...`

::::
:::: right

```js
Userfront.init("demo1234");

Userfront.sendResetLink("viewer@example.com");
```

::::
:::::

## Set up the form

::::: row
::::left

Create your password reset form with whatever HTML elements you want.

In this case, we've added:

- `password` - required to update the password (obviously)
- `password verify` - optional, for checking the password before updating it

::::
:::: right

```html
<form id="password-reset-form">
  <div id="alert"></div>

  <label for="password">Password</label>
  <input type="password" id="password" />

  <label for="password-verify">Re-type password</label>
  <input type="password" id="password-verify" />

  <button type="submit">Reset password</button>
</form>
```

```css
button,
input {
  display: block;
  margin-bottom: 10px;
}

#alert {
  display: none;
  color: red;
  margin-bottom: 10px;
}
```

::::
:::::

## Pass form data to Userfront.resetPassword()

::::: row
:::: left

The [resetPassword()](/docs/js.html#resetpassword-options) method allows the user to submit a new password.

Our JavaScript needs to call this method with the new password.

Userfront will then do the following:

1. Verify the user's credentials
2. Update the user's password
3. Add the user's access token as a cookie named `access.demo1234`
4. Redirect the page to the [After-login path](/guide/glossary.html#after-login-path)

::::
:::: right

```js
// Sample: how to use Userfront.resetPassword()
Userfront.init("demo1234");
Userfront.resetPassword({
  password: "myshinynewpassword",
});
```

::::
:::::

### Example JavaScript

::::: row
:::: left

In the example code here, we do the following:

1. Reference all the elements on the page
2. Define a custom `formResetPassword()` method that calls `Userfront.resetPassword()` with the form value
3. Add an event listener to call `formResetPassword()` when the form is submitted

::::
:::: right

```js
// Initialize Userfront
Userfront.init("demo1234");

// 1. Reference the elements on the page
var passwordResetFormEl = document.getElementById("password-reset-form");
var alertEl = document.getElementById("alert");
var passwordEl = document.getElementById("password");
var passwordVerifyEl = document.getElementById("password-verify");

// 2. Reset the user's password
function formResetPassword(e) {
  // Prevent the form's default behavior
  e.preventDefault();
  // Reset the alert to empty
  setAlert();
  // Verify that the passwords match
  var password = passwordEl.value;
  var passwordVerify = passwordVerifyEl.value;
  if (password !== passwordVerify) {
    return setAlert("Password verification must match.");
  }
  // Call Userfront.resetPassword()
  Userfront.resetPassword({
    password: password,
  }).catch(function(error) {
    setAlert(error.message);
  });
}

// Set the alert element to show the message
function setAlert(message) {
  alertEl.innerText = message;
  alertEl.style.display = message ? "block" : "none";
}

// 3. Add an event listener for the password reset form submit
passwordResetFormEl.addEventListener("submit", formResetPassword);
```

::::
:::::

### Password verification

::::: row
:::: left

Userfront will verify that the password is the correct length and format, and we can additionally verify that the user has typed what they intended by having them type it twice.

This "passwords match" verification is performed before sending the information to Userfront.

::::
:::: right

```js
var password = passwordEl.value;
var passwordVerify = passwordVerifyEl.value;
if (password !== passwordVerify) {
  return setAlert("Password verification must match.");
}
```

::::
:::::

### Error handling

::::: row
:::: left

Whenever the `Userfront.resetPassword()` method fails, we can `catch` its error in the promise chain.

This error will contain a `message` property with what went wrong.

In this example, we use the `setAlert()` method to display the error message inside of our alert element.

::::
:::: right

```js
// Catch the error
Userfront.resetPassword(...)
.catch(function(error) {
  setAlert(error.message);
});

// Add the error message to the alert element
function setAlert(message) {
  alertEl.innerText = message;
  alertEl.style.display = message ? "block" : "none";
}
```

::::
:::::
