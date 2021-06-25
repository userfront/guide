<toolkit-breadcrumb />

# Build a signup form with HTML

::::: row
:::: left

In this section, we create a custom signup form with email and password that includes:

- [A custom field](#custom-fields)
- [Password verification](#password-verification)
- [Error messages](#error-handling)
- [Single sign-on](#single-sign-on) (SSO) with Google

::::
:::::

## Example: custom signup form

::::: row
::::left

You can clone the example signup form on [CodePen](https://codepen.io/userfront/pen/ZEePYqb) and make edits, or follow along below.

::: tip NOTE
The example form has the Userfront Core JS library added to the document, as described in the next section.
:::

::::
:::: right

<br/>
<codepen title="Build a signup form with HTML" slug="ZEePYqb"/>

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

Create your signup form with whatever HTML elements you want.

In this case, we've added:

- `email` - required for signup
- `account name` - example of a custom field
- `password` - required for signup with password (obviously)
- `password verify` - optional, for checking the password before registering the user

::::
::::right

```html
<form id="signup-form">
  <div id="alert"></div>

  <label for="email">Email address</label>
  <input type="email" id="email" />

  <label for="account-name">Account name (custom field)</label>
  <input type="text" id="account-name" />

  <label for="password">Password</label>
  <input type="password" id="password" />

  <label for="password-verify">Verify password</label>
  <input type="password" id="password-verify" />

  <button type="submit">Sign up</button>
</form>
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

## Pass form data to Userfront.signup()

::::: row
:::: left

The [signup()](/docs/js.html#signup-options) method allows you to pass in data to sign up a user.

Our JavaScript needs to pass our form data into this method.

Userfront will then do the following:

1. Create a user record
2. Add the user's access token as a cookie named `access.demo1234`
3. Redirect the page to the [After-signup path](/guide/glossary.html#after-signup-path)

::::
:::: right

```js
// Sample: how to use Userfront.signup()
Userfront.init("demo1234");
Userfront.signup({
  method: "password",
  email: "jane@example.com",
  password: "testmodepassword",
  data: {
    customData: "Some custom information",
  },
});
```

::::
:::::

### Example JavaScript

::::: row
:::: left

In the example code here, we do the following:

1. Reference all the elements on the page
2. Define a custom `formSignup()` method that calls `Userfront.signup()` with the form values
3. Add an event listener to call `formSignup()` when the form is submitted

::::
:::: right

```js
// Initialize Userfront
Userfront.init("demo1234");

// 1. Reference the elements on the page
var signupFormEl = document.getElementById("signup-form");
var alertEl = document.getElementById("alert");
var emailEl = document.getElementById("email");
var accountNameEl = document.getElementById("account-name");
var passwordEl = document.getElementById("password");
var passwordVerifyEl = document.getElementById("password-verify");
var googleButtonEl = document.getElementById("signup-google");

// 2. Signup with a username/email and password
function formSignup(e) {
  // Prevent the form's default behavior
  e.preventDefault();
  // Reset the alert to empty
  setAlert();
  // Verify that the passwords match
  var password = passwordEl.value;
  var passwordVerify = passwordVerifyEl.value;
  if (password !== passwordVerify) {
    return setAlert("Password verification must match.");
  }
  // Call Userfront.signup()
  Userfront.signup({
    method: "password",
    email: emailEl.value,
    password: password,
    data: {
      accountName: accountNameEl.value,
    },
  }).catch(function(error) {
    setAlert(error.message);
  });
}

// Set the alert element to show the message
function setAlert(message) {
  alertEl.innerText = message;
  alertEl.style.display = message ? "block" : "none";
}

// 3. Add an event listener for the signup for submit
signupFormEl.addEventListener("submit", formSignup);
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

```js
Userfront.signup({
  // ...
  data: {
    accountName: accountNameEl.value,
  },
});
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

```js
var password = passwordEl.value;
var passwordVerify = passwordVerifyEl.value;
if (password !== passwordVerify) {
  return setAlert("Password verification must match.");
}
```

::::
:::::

### Error handling

::::: row
:::: left

Whenever the `Userfront.signup()` method fails, we can `catch` its error in the promise chain.

This error will contain a `message` property with what went wrong.

In this example, we use the `setAlert()` method to display the error message inside of our alert element.

::::
:::: right

```js
// Catch the error
Userfront.signup(...)
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

In this example, we add an event listener to call `Userfront.signup()` with `"google"` as the signup method whenever the Google button is clicked. You can style the button however you like, or initate the signon programmatically.

You can find more provider options like GitHub, LinkedIn, and Facebook in the docs for [signup()](/docs/js.html#signup-options).

::::
:::: right

```js
Userfront.init("demo1234");
var googleButtonEl = document.getElementById("signup-google");

// 4. Add an event listener for the google button click
googleButtonEl.addEventListener("click", function() {
  Userfront.signup({ method: "google" });
});
```

::::
:::::
