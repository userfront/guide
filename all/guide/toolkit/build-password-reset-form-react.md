---
title: Build a password reset form with React
---

<toolkit-breadcrumb />

# Build a password reset form with React

::::: row
:::: left

In this section, we create a custom password reset form that allows a user to reset their password and includes:

- [Error messages](#error-handling)
- [Password verification](#password-verification)

::::
:::::

## Example: custom password reset form

::::: row
::::left

You can clone the example password reset form on [CodePen](https://codepen.io/userfront/pen/dyvxxGQ) and make edits, or follow along below.

::: tip NOTE
The example form has the Userfront Core JS library added to the document, as described in the section below.
:::

The password reset flow is as follows:

1. **A user requests a password reset email.** Userfront sends the user an email. This email contains a link to reset the user's password.
2. **The user clicks the link.** The link has a special `token` and `uuid` in the URL.
3. **The user submits their new password.** The user submits their new password with the password reset form on the page. The form updates the user's password and then logs in the user.

::::
:::: right

<br/>
<codepen title="Build a password reset form React" slug="dyvxxGQ"/>

::: warning NOTE
The `token` and `uuid` from the password reset email must be present in the URL. Thus, this example form does not reset an actual password.
:::

::::
:::::

## Add the Userfront Core JS library

::::: row
:::: left

Start by adding the Userfront Core JS library via CDN or using npm.

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

## Requesting a password reset email

::::: row
::::left

In order to request a password reset email, call the [sendResetLink()](/docs/js.html#sendresetlink-email) method with the user's email address.

Userfront will email the user with a link to your account's [Password reset path](/guide/glossary.html#password-reset-path).

The link will look something like:

`https://www.example.com/reset?token=...&uuid=...`

::::
:::: right

```js
Userfront.init("demo1234");

Userfront.sendResetLink("viewer@example.com");
```

::::
:::::

## Set up the form

::::: row
::::left

Create your password reset form with whatever HTML elements you want.

In this case, we've added:

- `password` - required to update the password (obviously)
- `password verify` - optional, for checking the password before updating it

### Password reset form React code

#### constructor()

Here we set up our state variables with `password` and `passwordVerify`.

We also bind our functions so that `this.setState` will update the state variables.

#### handleInputChange()

Whenever an input changes value, this function will set the corresponding state variable.

#### handleSubmit()

When the form is submitted, this function will call `Userfront.resetPassword()` with the current `password`.

#### render()

Adds the password reset form with 2 inputs and a button, and connects them to the `handleInputChange()` and `handleSubmit()` functions.

::::
:::: right

```jsx
// Initialize Userfront Core JS
Userfront.init("demo1234");

// Define the Password reset form component
class PasswordResetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordVerify: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Whenever an input changes value, change the corresponding state variable
  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // Verify that the passwords match
    if (this.state.password !== this.state.passwordVerify) {
      return;
    }
    // Call Userfront.resetPassword()
    Userfront.resetPassword({
      password: this.state.password,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Re-type password
            <input
              name="passwordVerify"
              type="password"
              value={this.state.passwordVerify}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Reset password</button>
        </form>
      </div>
    );
  }
}
```

::::
:::::

### Userfront.resetPassword()

::::: row
:::: left

The [resetPassword()](/docs/js.html#resetpassword-options) method allows the user to submit a new password.

Userfront will then do the following:

1. Verify the user's credentials
2. Update the user's password
3. Add the user's access token as a cookie named `access.demo1234`
4. Redirect the page to the [After-login path](/guide/glossary.html#after-login-path)

::::
:::: right

```js
// Sample: how to use Userfront.resetPassword()
Userfront.init("demo1234");
Userfront.resetPassword({
  password: "myshinynewpassword",
});
```

::::
:::::

### Error handling

::::: row
:::: left

Whenever the `Userfront.resetPassword()` method fails, we can `catch` its error in the promise chain.

This error will contain a `message` property with what went wrong.

In this example, we use an `<Alert />` component to display the error message inside.

::::
:::: right

```jsx
class Alert extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.message) return "";
    return <div id="alert">{this.props.message}</div>;
  }
}
```

::::
:::::

::::: row
:::: left

Our password reset form can use this component by including an `alertMessage` variable in the state, and then setting it whenever we want to update the message.

Now the `handleSubmit()` method clears the alert message whenever the button is clicked. Then if there is an error with `Userfront.resetPassword()`, it catches the error and displays the error message.

The alert component is rendered above the form as:

`<Alert message={this.state.alertMessage} />`

::::
:::: right

```jsx {6,9,17-18,22,29,33-35,40}
class PasswordResetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // ...
      alertMessage: "",
    };
    // ...
    this.setAlertMessage = this.setAlertMessage.bind(this);
  }

  // ...

  handleSubmit(event) {
    event.preventDefault();

    // Reset the alert to empty
    this.setAlertMessage();

    // Verify that the passwords match
    if (this.state.password !== this.state.passwordVerify) {
      return this.setAlertMessage("Passwords must match");
    }

    // Call Userfront.resetPassword()
    Userfront.resetPassword({
      password: this.state.password,
    }).catch((error) => {
      this.setAlertMessage(error.message);
    });
  }

  setAlertMessage(message) {
    this.setState({ alertMessage: message });
  }

  render() {
    return (
      <div>
        <Alert message={this.state.alertMessage} />
        {/* <form> element */}
      </div>
    );
  }
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

```jsx {3-6}
handleSubmit(event) {
  event.preventDefault();
  // Verify that the passwords match
  if (this.state.password !== this.state.passwordVerify) {
    return this.setAlertMessage("Passwords must match");
  }
  // Call Userfront.resetPassword()
  Userfront.resetPassword({
    password: this.state.password,
  });
}
```

::::
:::::
