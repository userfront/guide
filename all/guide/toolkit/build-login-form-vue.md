---
title: Create a Vue.js login form
---

<toolkit-breadcrumb />

# Build a login form with Vue

::::: row
:::: left

In this section, we create a custom login form with email/username and password that includes:

- [Email or username](#email-or-username-field) field
- [Error messages](#error-handling)
- [Single sign-on](#single-sign-on) (SSO) with Google

::::
:::::

## Example: custom login form with Vue.js

::::: row
::::left

You can clone the example login form on [CodePen](https://codepen.io/userfront/pen/GRmZXVM) and make edits, or follow along below.

::: tip NOTE
The example form has the Userfront Core JS library added to the document, as described in the next section.
:::

::::
:::: right

<br/>
<codepen title="Create a Vue.js login form" slug="GRmZXVM"/>

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

Create your login form with the elements you want to use.

In this case, we've added:

- `email or username` - the user's email address or username
- `password` - required for login with password (obviously)

### Login form Vue code

#### &lt;form> element

In the `<form>` element, we bind our variables `emailOrUsername` and `password` to the inputs using `v-model`.

We also set the form to call `loginWithPassword()` when it is submitted.

#### loginWithPassword()

When the form is submitted, this function calls `Userfront.login()` with the current `emailOrUsername` and `password`.

#### SSO &lt;button> element

We set the SSO `<button>` element to call `loginWithSSO()` when it is clicked.

#### loginWithSSO()

When the SSO button is clicked, this function calls `Userfront.login()` with `"google"` as the login method.

::::
:::: right

```html
<template>
  <div id="app">
    <div id="alert" v-if="alert">{{ alert }}</div>

    <form @submit.prevent="loginWithPassword">
      <label>
        Email or username
        <input type="text" v-model="emailOrUsername" />
      </label>
      <label>
        Password
        <input type="password" v-model="password" />
      </label>
      <button type="submit">Log in</button>
    </form>

    <p>or</p>

    <button @click.prevent="loginWithSSO">
      Log in with Google
    </button>
  </div>
</template>

<script>
  // Initialize Userfront
  Userfront.init("demo1234");

  export default {
    data() {
      return {
        emailOrUsername: "",
        password: "",
        alert: "",
      };
    },
    methods: {
      // Log in with the form's email/username and password
      loginWithPassword() {
        this.alert = "";
        Userfront.login({
          method: "password",
          emailOrUsername: this.emailOrUsername,
          password: this.password,
        }).catch((error) => {
          this.alert = error.message;
        });
      },
      // Log in with SSO (google)
      loginWithSSO() {
        Userfront.login({ method: "google" });
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

### Email or username field

::::: row
:::: left

For login, you can use the `emailOrUsername` field, which will accept both email and username.

If you want email only, or username only, you can use the `email` or `username` attributes instead of `emailOrUsername`.

::::
:::: right

```js
Userfront.login({
  // ...
  emailOrUsername: "member@example.com",
});

// Is the same as

Userfront.login({
  // ...
  email: "member@example.com",
});

// Or you can use "username"

Userfront.login({
  // ...
  username: "member1234",
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

Whenever the `Userfront.login()` method fails, we `catch` its error in the promise chain. This error contains a `message` property with what went wrong, and we set that as the alert message.

::::
:::: right

```js {2,7}
loginWithPassword() {
  this.alert = "";

  Userfront.login({
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

In this example, we add an SSO `<button>` to allow login with Google.

Ultimately, we need to call `Userfront.login({ method: "google" })` whenever the button is clicked. You can style the button however you like.

You can find more provider options like GitHub, LinkedIn, and Facebook in the docs for [login()](/docs/js.html#login-options).

::::
:::: right

```js
loginWithSSO() {
  Userfront.login({ method: "google" });
}
```

::::
:::::

::::: row
:::: left

We added an SSO `<button>` element to call `loginWithSSO()` when clicked.

::::
:::: right

```html
<button @click.prevent="loginWithSSO">
  Log in with Google
</button>
```

::::
:::::
