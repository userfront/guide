---
title: Create a Vue.js signup form
---

<toolkit-breadcrumb />

# Build a signup form with Vue

::::: row
:::: left

In this section, we create a custom signup form with email and password that includes:

- [A custom field](#custom-fields)
- [Error messages](#error-handling)
- [Password verification](#password-verification)
- [Single sign-on](#single-sign-on) (SSO) with Google

::::
:::::

## Example: custom signup form with Vue.js

::::: row
::::left

You can clone the example signup form on [CodePen](https://codepen.io/userfront/pen/ZEKOBWd) and make edits, or follow along below.

::: tip NOTE
The example form has the Userfront Core JS library added to the document, as described in the next section.
:::

::::
:::: right

<br/>
<codepen title="Vue.js signup form, customizable" slug="ZEKOBWd"/>

::::
:::::

## Add the Userfront Core JS library

::::: row
:::: left

You can add the Userfront Core JS library by CDN or using npm.

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

## Set up the form

::::: row
::::left

Create your signup form with the elements you want to use.

In this case, we've added:

- `email` - required for signup
- `account name` - example of a custom field
- `password` - required for signup with password (obviously)
- `password verify` - optional, for checking the password before registering the user

### Signup form Vue code

#### &lt;form> element

In the `<form>` element, we bind our variables `email`, `accountName`, `password`, and `passwordVerify` to the inputs using `v-model`.

We also set the form to call `signupWithPassword()` when it is submitted.

#### signupWithPassword()

When the form is submitted, this function calls `Userfront.signup()` with the current `email`, `accountName`, and `password`.

#### SSO &lt;button> element

We set the SSO `<button>` element to call `signupWithSSO()` when it is clicked.

#### signupWithSSO()

When the SSO button is clicked, this function calls `Userfront.signup()` with `"google"` as the signup method.

::::
:::: right

```html
<template>
  <div id="app">
    <div id="alert" v-if="alert">{{ alert }}</div>

    <form @submit.prevent="signupWithPassword">
      <label>
        Email address
        <input type="email" v-model="email" />
      </label>
      <label>
        Account name (custom field)
        <input type="text" v-model="accountName" />
      </label>
      <label>
        Password
        <input type="password" v-model="password" />
      </label>
      <label>
        Verify password
        <input type="password" v-model="passwordVerify" />
      </label>
      <button type="submit">Sign up</button>
    </form>

    <p>or</p>

    <button @click.prevent="signupWithSSO">Sign up with Google</button>
  </div>
</template>

<script>
  // Initialize Userfront
  Userfront.init("demo1234");

  export default {
    data() {
      return {
        email: "",
        accountName: "",
        password: "",
        passwordVerify: "",
        alert: "",
      };
    },
    methods: {
      // Sign up with the form's email and password
      signupWithPassword() {
        // Reset the alert to empty
        this.alert = "";
        // Verify that the passwords match
        if (this.password !== this.passwordVerify) {
          this.alert = "Passwords must match";
          return;
        }
        // Call Userfront.signup()
        Userfront.signup({
          method: "password",
          email: this.email,
          password: this.password,
          data: {
            accountName: this.accountName,
          },
        }).catch((error) => {
          this.alert = error.message;
        });
      },
      // Sign up with SSO (google)
      signupWithSSO() {
        Userfront.signup({ method: "google" });
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

### Custom fields

::::: row
:::: left

The form has a field for `Account Name`, which is a custom field.

When we pass this to the `Userfront.signup()` method under the `data` object, it is saved to the user's record as `user.data.accountName`.

::::
:::: right

```js {5-7}
Userfront.signup({
  method: "password",
  email: this.email,
  password: this.password,
  data: {
    accountName: this.accountName,
  },
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

If the passwords do not match, we set the alert message and return without submitting the signup.

Whenever the `Userfront.signup()` method fails, we `catch` its error in the promise chain. This error contains a `message` property with what went wrong, and we set that as the alert message.

::::
:::: right

```js {2,5,13}
signupWithPassword() {
  this.alert = "";
  // Verify that the passwords match
  if (this.password !== this.passwordVerify) {
    this.alert = "Passwords must match";
    return;
  }

  Userfront.signup({
    // ...
  })
  .catch((error) => {
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

```js {4-8}
signupWithPassword() {
  // Reset the alert to empty
  this.alert = "";
  // Verify that the passwords match
  if (this.password !== this.passwordVerify) {
    this.alert = "Passwords must match";
    return;
  }
  // Call Userfront.signup()
  Userfront.signup({
    // ...
  }).catch((error) => {
    this.alert = error.message;
  });
}
```

::::
:::::

## Single sign-on

::::: row
:::: left

To configure Single sign-on (SSO), first add the provider you want to use in the Userfront dashboard in the **SSO** tab.

The SSO flow is as follows:

1. The user clicks the SSO button ("Sign up with Google"), which triggers `Userfront.signup()`
2. The browser redirects to the provider (Google), where the user authorizes your application
3. Upon success, the browser redirects back to your login page (your [After-logout path](/guide/glossary.html#after-logout-path)) with `uuid` and `token` login credentials in the URL
4. Your application calls `Userfront.login()` to log in the user with the `uuid` and `token`

::::
:::::

#### Sign up with Google button

::::: row
:::: left

To configure Single sign-on (SSO), first add the provider you want to use in the Userfront dashboard in the **SSO** tab.

In this example, we add an SSO `<button>` to allow signup with Google.

Ultimately, we need to call `Userfront.signup({ method: "google" })` whenever the button is clicked. You can style the button however you like.

You can find more provider options like GitHub, LinkedIn, and Facebook in the docs for [signup()](/docs/js.html#signup-options).

::::
:::: right

```js
signupWithSSO() {
  Userfront.signup({ method: "google" });
}
```

::::
:::::

::::: row
:::: left

We added an SSO `<button>` element to call `signupWithSSO()` when clicked.

::::
:::: right

```html
<button @click.prevent="signupWithSSO">
  Sign up with Google
</button>
```

::::
:::::

#### Login after redirect

::::: row
:::: left

Once the browser is redirected back to your login page after SSO approval, your application should call

`Userfront.login({ method: "link" })`

You can set up your JS to call this method automatically by checking whether the URL contains the `token` and `uuid` parameters.

If your original SSO signup call contained a `redirect` parameter, it will be included in the URL and followed automatically.

::::
:::: right

```js
// On your login page:

Userfront.init("demo1234");

// If the URL contains token & uuid params, log in
if (
  document.location.search.includes("token=") &&
  document.location.search.includes("uuid=")
) {
  Userfront.login({ method: "link" });
}
```

::::
:::::
