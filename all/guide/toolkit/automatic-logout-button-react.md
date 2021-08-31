---
title: Install a pre-made logout button with React
---

<toolkit-breadcrumb />

# Ready-to-use logout button with React

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

## Example: React logout button

::::: row
:::: left

::: tip
It's often easier to [build your own logout button](/guide/toolkit/build-logout-button-react.html) than to use this automatic one.
:::

::::
:::::

#### Install the Userfront React library

::::: row
::::left

To add the form to your React project, first install `@userfront/react` with npm (or yarn).

::::
:::: right

```sh
npm install @userfront/react --save
```

::::
:::::

#### Render the logout button in React

::::: row
:::: left

First, initialize the Userfront React library with your [account ID](/guide/glossary.html#account-id) using `Userfront.init()`.

Build the `LogoutButton` component with `Userfront.build()` using the tool ID corresponding to your logout button. This can be found in the **Toolkit** section of the Userfront dashboard.

Render the `<LogoutButton />` component in your React app.

::::
:::: right

See a [demo on CodeSandbox](https://codesandbox.io/s/userfront-react-example-d6t0d)

<install-react display-title="Logout button"/>

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

Whenever the logout button is clicked, it makes an API call to Userfront to invalidate the user's current session and clear any refresh tokens.

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
