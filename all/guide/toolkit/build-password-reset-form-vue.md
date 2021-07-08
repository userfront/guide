---
title: Create a Vue.js password reset form
---

<toolkit-breadcrumb />

# Build a pasword reset form with Vue

::::: row
:::: left

In this section, we create a custom password reset form that allows a user to reset their password and includes:

- [Error messages](#error-handling)
- [Password verification](#password-verification)

::::
:::::

## Example: custom password reset form with Vue.js

::::: row
::::left

You can clone the example password reset form on [CodePen](https://codepen.io/userfront/pen/WNjxRGb) and make edits, or follow along below.

### The password reset flow is as follows:

1. **A user requests a password reset email.** Userfront sends the user an email. This email contains a link to reset the user's password.
2. **The user clicks the link.** The link has a special `token` and `uuid` in the URL.
3. **The user submits their new password.** The user submits their new password with the password reset form on the page. The form updates the user's password and then logs in the user.

<br>

::: tip NOTE
The example form has the Userfront Core JS library added to the document, as described in the section below.

**AND**

The `token` and `uuid` from the password reset email must be present in the URL. Thus, this example form does not reset an actual password.
:::

::::
:::: right

<br/>
<codepen title="Vue.js password reset form, customizable" slug="WNjxRGb"/>

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

<code>https://www.example.com/reset?<strong>token=</strong>...&<strong>uuid=</strong>...</code>

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

Create your password reset form with the elements you want.

In this case, we've added:

- `password` - required to update the password (obviously)
- `password verify` - optional, for checking the password before updating it

### Password reset form Vue code

#### &lt;form> element

In the `<form>` element, we bind our variables `password` and `passwordVerify` to the inputs using `v-model`.

We also set the form to call `checkAndResetPassword()` when it is submitted.

#### checkAndResetPassword()

When the form is submitted, this function checks that the passwords match and then calls `Userfront.resetPassword()` with the current `password` value.

::::
:::: right

```html
<template>
  <div id="app">
    <div id="alert" v-if="alert">{{ alert }}</div>

    <form @submit.prevent="checkAndResetPassword">
      <label>
        Password
        <input type="password" v-model="password" />
      </label>
      <label>
        Re-type password
        <input type="password" v-model="passwordVerify" />
      </label>
      <button type="submit">Reset password</button>
    </form>
  </div>
</template>

<script>
  // Initialize Userfront
  Userfront.init("demo1234");

  export default {
    data() {
      return {
        password: "",
        passwordVerify: "",
        alert: "",
      };
    },
    methods: {
      checkAndResetPassword() {
        this.alert = "";
        // Verify that the passwords match
        if (this.password !== this.passwordVerify) {
          this.alert = "Passwords must match";
          return;
        }
        // Call Userfront.resetPassword()
        Userfront.resetPassword({
          password: this.password,
        }).catch((error) => {
          this.alert = error.message;
        });
      },
    },
  };
</script>

<style scoped>
  button,
  input {
    display: block;
    margin-bottom: 10px;
  }

  #alert {
    color: red;
    margin-bottom: 10px;
  }
</style>
```

::::
:::::

### Userfront.resetPassword()

::::: row
:::: left

The [resetPassword()](/docs/js.html#resetpassword-options) method allows the user to submit a new password.

Userfront then does the following:

1. Verifies the user's credentials
2. Updates the user's password
3. Adds the user's access token as a cookie named `access.demo1234`
4. Redirects the page to the [After-login path](/guide/glossary.html#after-login-path)

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

### Error handling

::::: row
:::: left

::: v-pre
In this example, we use a `<div>{{ alert }}</div>` element to display the alert message.
:::

We first clear the alert message whenever the form is submitted.

If the passwords do not match, we set the alert message and return without submitting the password reset.

Whenever the `Userfront.resetPassword()` method fails, we `catch` its error in the promise chain. This error contains a `message` property with what went wrong, and we set that as the alert message.

::::
:::: right

```js {2,5,12}
checkAndResetPassword() {
  this.alert = "";
  // Verify that the passwords match
  if (this.password !== this.passwordVerify) {
    this.alert = "Passwords must match";
    return;
  }
  // Call Userfront.resetPassword()
  Userfront.resetPassword({
    password: this.password
  }).catch((error) => {
    this.alert = error.message;
  });
}
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

```js {3-7}
checkAndResetPassword() {
  this.alert = "";
  // Verify that the passwords match
  if (this.password !== this.passwordVerify) {
    this.alert = "Passwords must match";
    return;
  }
  // Call Userfront.resetPassword()
  Userfront.resetPassword({
    password: this.password
  }).catch((error) => {
    this.alert = error.message;
  });
}
```

::::
:::::
