---
title: Create an HTML login form
---

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
The example form has the Userfront Core JS library added to the document, as described in the next section.
:::

::::
:::: right

<br/>
<codepen title="Build a login form with HTML" slug="zYZbbNJ"/>

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

Create your login form with whatever HTML elements you want.

In this case, we've added:

- `email or username` - the user's email address or username
- `password` - required for login with password (obviously)

::::
:::: right

```html
<form id="login-form">
  <div id="alert"></div>

  <label for="email-or-username">Email address or Username</label>
  <input type="text" id="email-or-username" />

  <label for="password">Password</label>
  <input type="password" id="password" />

  <button type="submit">Log in</button>
</form>

<p>or</p>

<button id="login-google">Login with Google</button>
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

## Pass form data to Userfront.login()

::::: row
:::: left

The [login()](/docs/js.html#login-options) method allows you to pass in data to log in a user.

Our JavaScript needs to pass our form data into this method.

Userfront will then do the following:

1. Verify the user's credentials
2. Add the user's access token as a cookie named `access.demo1234`
3. Redirect the page to the [After-login path](/guide/glossary.html#after-login-path)

::::
:::: right

```js
// Sample: how to use Userfront.login()
Userfront.init("demo1234");
Userfront.login({
  method: "password",
  emailOrUsername: "member@example.com",
  password: "testmodepassword",
});
```

::::
:::::

### Example JavaScript

::::: row
:::: left

In the example code here, we do the following:

1. Reference all the elements on the page
2. Define a custom `formLogin()` method that calls `Userfront.login()` with the form values
3. Add an event listener to call `formLogin()` when the form is submitted

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

Whenever the `Userfront.login()` method fails, we can `catch` its error in the promise chain.

This error will contain a `message` property with what went wrong.

In this example, we use the `setAlert()` method to display the error message inside of our alert element.

::::
:::: right

```js
// Catch the error
Userfront.login(...)
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

## Single sign-on

::::: row
:::: left

To configure Single sign-on (SSO), first add the provider you want to use in the Userfront dashboard in the **SSO** tab.

In this example, we add an event listener to call `Userfront.login()` with `"google"` as the login method whenever the Google button is clicked. You can style the button however you like, or initate the login programmatically.

You can find more provider options like GitHub, LinkedIn, and Facebook in the docs for [login()](/docs/js.html#login-options).

::::
:::: right

```js
Userfront.init("demo1234");
var googleButtonEl = document.getElementById("login-google");

// 4. Add an event listener for the google button click
googleButtonEl.addEventListener("click", function() {
  Userfront.login({ method: "google" });
});
```

::::
:::::
