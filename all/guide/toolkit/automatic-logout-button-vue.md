---
title: Install a pre-made logout button with Vue.js
---

<toolkit-breadcrumb />

# Ready-to-use logout button with Vue

::::: row
:::: left

In this section, we add an automatic logout button that will:

- [Show a disabled state](#disabled-state) when not logged in
- [Clear the user's tokens](#clearing-tokens)
- [Redirect after logout](#redirect-after-logout) to your After-logout path

::::
:::: right

<iframe-demo display-title="Logout button" height="140"></iframe-demo>

::::
:::::

## Example: Vue.js logout button

::::: row
:::: left

::: tip
It's often easier to [build your own logout button](/guide/toolkit/build-logout-button-vue.html) than to use this automatic one.
:::

::::
:::::

#### Install the Userfront Vue library

::::: row
::::left

To add the form to your Vue project, first install `@userfront/vue` with npm (or yarn).

::::
:::: right

```sh
npm install @userfront/vue --save
```

::::
:::::

#### Render the logout button in Vue

::::: row
:::: left

First, initialize the Userfront Vue library with your [account ID](/guide/glossary.html#account-id) using `Userfront.init()`.

You can do this in the main file (as shown here) or in a component file. If you do this in the main file, you only need to do it once.

::::
:::: right
See a [demo on CodeSandbox](https://codesandbox.io/s/userfront-vue-example-5xf85?file=/src/App.vue)

<install-vue display-title="Logout button" file="main.js"/>

::::
:::::

::::: row
:::: left

Import the `LogoutButton` component from `@userfront/vue` and register it as a component.

Then you can use the `<logout-button />` component in your `<template>` tag. You can find your `tool-id` in the **Toolkit** section of the Userfront dashboard.

::::
:::: right

<install-vue display-title="Logout button" file="App.vue"/>

::::
:::::

### Disabled state

::::: row
:::: left

If the user is not logged in, the logout button will show in a disabled state.

You are not required to show the button when the user is not logged in; usually the logout button is only shown on pages where the user must be logged in.

Whenever the user is logged in, the logout button will be clickable.

::::
:::::

### Clearing tokens

::::: row
:::: left

Whenever the logout button is clicked, it makes an API call to Userfront to invalidate the user's current session and clear any refresh tokens (if applicable).

The button then removes the access token and ID token cookies from the browser.

::::
:::::

### Redirect after logout

::::: row
:::: left

Once the user's session has been invalidated and their tokens have been cleared from the browser, the browser is redirected to your [After-logout path](/guide/glossary.html#after-logout-path).

If the user is not logged in and the button is clicked, the browser will not be redirected.

::::
:::::
