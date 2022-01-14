---
title: Create a Vue.js logout button
---

<toolkit-breadcrumb />

# Build a logout button with Vue

::::: row
:::: left

In this section, we create a custom logout button that will:

- [Show a disabled state](#disabled-state) when not logged in
- [Clear the user's tokens](#clearing-tokens)
- [Redirect after logout](#redirect-after-logout) to your After-logout path

::::
:::::

## Example: custom logout button with Vue.js

::::: row
::::left

You can clone the example logout button on [CodePen](https://codepen.io/userfront/pen/abWZJpX) and make edits, or follow along below.

::: tip NOTE
The example form has the Userfront Core JS library added to the document, as described in the next section.
:::

::::
:::: right

<br/>
<codepen title="Build a logout button with React" slug="abWZJpX"/>

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

## Set up the button

::::: row
::::left

Create your logout button with the elements you want to use.

In this case, we're using a custom-styled `<button>` element that is red when active and gray if the user is not logged in.

### Logout button Vue code

#### Logout &lt;button> element

We set the logout `<button>` element to call `handleLogout()` when it is clicked.

Additionally, we set the `disabled` property for the button based on the `isLoggedOut` variable so that the button will be gray if the user is not logged in.

#### handleLogout()

When the logout button is clicked, this function calls `Userfront.logout()`.

#### isLoggedOut

This computed property checks `Userfront.tokens.accessToken`, which is only present when the user is logged in. Thus if it is absent, the user is logged out.

::::
:::: right

```html
<template>
  <button
    id="logout-button"
    @click.prevent="handleLogout"
    :disabled="isLoggedOut"
  >
    Log out
  </button>
</template>

<script>
  // Initialize Userfront
  Userfront.init("demo1234");

  export default {
    methods: {
      // Log out with Userfront.logout()
      handleLogout() {
        Userfront.logout();
      },
    },
    computed: {
      // User is logged out if they don't have an access token
      isLoggedOut() {
        return !Userfront.tokens.accessToken;
      },
    },
  };
</script>

<style scoped>
  #logout-button {
    background-color: red;
    color: white;
    border: none;
    padding: 5px 10px;
  }

  #logout-button[disabled] {
    background-color: lightgray;
    color: gray;
  }
</style>
```

::::
:::::

### Userfront.logout()

::::: row
:::: left

The [logout()](/docs/js.html#logout-options) method allows you to log out a user.

Userfront then does the following:

1. Invalidates the user's current session
2. Clears any Userfront-issued tokens from the browser
3. Redirects the page to the [After-logout path](/guide/glossary.html#after-logout-path)

::: tip NOTE
If the user is not logged in, calling `Userfront.logout()` will not do anything.
:::

::::
:::: right

```js
// Sample: how to use Userfront.logout()
Userfront.init("demo1234");
Userfront.logout();
```

::::
:::::

### Disabled state

::::: row
:::: left

We can show a disabled state by adding the `disabled` property to the button.

If the user is logged out, `Userfront.tokens.accessToken` will not return a value, so we can use this to set the `isLoggedOut` property.

Note that you are not required to show the button when the user is not logged in; usually the logout button is only shown on pages where the user must be logged in.

::::
:::: right

```html
<button
  id="logout-button"
  @click.prevent="handleLogout"
  :disabled="isLoggedOut"
>
  Log out
</button>
```

```js
computed: {
  // User is logged out if they don't have an access token
  isLoggedOut() {
    return !Userfront.tokens.accessToken;
  },
},
```

::::
:::::

### Clearing tokens

::::: row
:::: left

Whenever `Userfront.logout()` is called, the method makes an API call to Userfront to invalidate the user's current session and clear any refresh tokens.

The method then removes the access token and ID token cookies from the browser.

::::
:::::

### Redirect after logout

::::: row
:::: left

Once the user's session has been invalidated and their tokens have been cleared from the browser, the browser is redirected to your account's [After-logout path](/guide/glossary.html#after-logout-path).

If the user is not logged in and `Userfront.logout()` is called, the browser will not be redirected.

::::
:::::
