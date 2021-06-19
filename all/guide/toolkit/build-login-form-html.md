<toolkit-breadcrumb />

# Build a login form with HTML

::::: row
:::: left

In this section, we create a custom login form with email/username and password that includes:

- [Email or username](#email-or-username-field) field
- [Error messages](#error-handling)
- [Single sign-on](#single-sign-on) (SSO) with Google

::::
:::::

## Example: custom login form

::::: row
::::left

You can clone the example login form on [CodePen](https://codepen.io/userfront/pen/zYZbbNJ) and make edits, or follow along below.

::: tip NOTE
The example form has the Userfront Core JS script added to the document, as described in the next section.
:::

::::
:::: right

<br/>
<codepen title="Build login form HTML" slug="zYZbbNJ"/>

::::
:::::

## Add the Userfront Core JS library

::::: row
:::: left

You can add the Userfront Core JS script by CDN or using npm.

You only need to do one of these.

::::
:::: right

### CDN

Add the script to your project with the following snippet:

```html
<script src="https://cdn.userfront.com/core.js"></script>
```

<br>

### NPM

Install the library with `npm` (or `yarn`)

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

Create your login form with whatever HTML elements you want.

In this case, we've added:

- `email or username` - the user's email address or username
- `password` - required for login with password (obviously)

::::
:::: right

```js
// Initialize Userfront
Userfront.init("demo1234");

// 1. Reference the elements on the page
var loginFormEl = document.getElementById("login-form");
var alertEl = document.getElementById("alert");
var emailOrUsernameEl = document.getElementById("email-or-username");
var passwordEl = document.getElementById("password");
var googleButtonEl = document.getElementById("login-google");

// 2. Login with an email/username and password
function formLogin(e) {
  // Prevent the form's default behavior
  e.preventDefault();
  // Reset the alert to empty
  setAlert();
  // Call Userfront.login()
  Userfront.login({
    method: "password",
    emailOrUsername: emailOrUsernameEl.value,
    password: passwordEl.value,
  }).catch(function(error) {
    setAlert(error.message);
  });
}

// Set the alert element to show the message
function setAlert(message) {
  alertEl.innerText = message;
  alertEl.style.display = message ? "block" : "none";
}

// 3. Add an event listener for the login for submit
loginFormEl.addEventListener("submit", formLogin);
```

::::
:::::
