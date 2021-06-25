<toolkit-breadcrumb />

# Build a logout button with HTML

::::: row
:::: left

In this section, we create a custom logout button that will:

- [Show a disabled state](#disabled-state) when not logged in
- [Clear the user's tokens](#clearing-tokens)
- [Redirect after logout](#redirect-after-logout) to your After-logout path

::::
:::::

## Example: custom logout button

::::: row
::::left

You can clone the example logout button on [CodePen](https://codepen.io/userfront/pen/poemNpo) and make edits, or follow along below.

::: tip NOTE
The example form has the Userfront Core JS library added to the document, as described in the next section.
:::

::::
:::: right

<br/>
<codepen title="Build a logout button with HTML" slug="poemNpo"/>

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

Create your logout button with whatever HTML elements you want.

In this case, we're using a custom-styled `<button>` element that is red when active and gray if the user is not logged in.

::::
:::: right

```html
<button id="logout-button" disabled>
  Logout
</button>
```

```css
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
```

::::
:::::

## Call Userfront.logout() when clicked

::::: row
:::: left

The [logout()](/docs/js.html#logout) method allows you to log out a user.

Userfront will then do the following:

1. Invalidate the user's current session
2. Clear any access, ID, and refresh tokens from the browser
3. Redirect the page to the [After-logout path](/guide/glossary.html#after-logout-path)

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

### Example JavaScript

::::: row
:::: left

In the example code here, we do the following:

1. Reference all the button with a variable
2. Enable the button if the user is logged in by calling `Userfront.accessToken()`. If the user is logged in, this will return a value and the `if` statement will evaluate to `true`.
3. Add a `buttonLogout()` function we can call to handle the button click
4. Add an event listener to call `buttonLogout()` when the form is submitted

::::
:::: right

```js
// Initialize Userfront
Userfront.init("demo1234");

// 1. Reference the button
var buttonEl = document.getElementById("logout-button");

// 2. Enable the button if the user is logged in
if (Userfront.accessToken()) {
  buttonEl.disabled = false;
}

// 3. Log out the user
function logout(e) {
  // Prevent the form's default behavior
  e.preventDefault();
  // Call Userfront.logout()
  Userfront.logout();
}

// 4. Add an event listener for the button click
buttonEl.addEventListener("click", logout);
```

::::
:::::

### Disabled state

::::: row
:::: left

You are not required to show a disabled button when the user is not logged in; usually the logout button is only shown on pages where the user must be logged in.

You can show a disabled state by adding the `disabled` property to the button's HTML.

If the user is logged in, `Userfront.accessToken()` will return a value, so we can test against this and enable the button by setting `buttonEl.disabled = false`. This removes the `disabled` property from the button.

::::
:::: right

```html
<button class="logout-button" disabled>
  Logout
</button>
```

```js
var buttonEl = document.getElementById("logout-button");

if (Userfront.accessToken()) {
  buttonEl.disabled = false;
}
```

::::
:::::

### Clearing tokens

::::: row
:::: left

Whenever `Userfront.logout()` is called, the method makes an API call to Userfront to invalidate the user's current session and clear any refresh tokens (if applicable).

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
