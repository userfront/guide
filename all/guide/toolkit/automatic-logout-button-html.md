<toolkit-breadcrumb />

# Ready-to-use logout button

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

## Example: HTML logout button

::::: row
::::left

::: tip
It's often easier to [build your own logout button](/guide/toolkit/build-logout-button-html.html) than to use this automatic one.
:::

The toolkit logout button has 2 parts:

**1. Script snippet**

The `<script>` snippet should be added to the `<head>` of any page that has a Userfront toolkit component.

The script snippet only needs to be added once per page.

**2. Logout button tag**

Add the logout button tag wherever you want your logout button to show.

::::
:::: right

<install-html display-title="Logout button"/>

See a [demo on CodePen](https://codepen.io/userfront/pen/MWyjXXq)

::::
:::::

### Disabled state

::::: row
:::: left

If the user is not logged in, the logout button will show in a disabled state.

You are not required to show a disabled button when the user is not logged in; usually the logout button is only shown on pages where the user must be logged in.

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
