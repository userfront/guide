---
title: Build a signup form with React
---

<toolkit-breadcrumb />

# Build a signup form with React

::::: row
:::: left

In this section, we create a custom signup form with email and password that includes:

- [A custom field](#custom-fields)
- [Error messages](#error-handling)
- [Password verification](#password-verification)
- [Single sign-on](#single-sign-on) (SSO) with Google

::::
:::::

## Example: custom signup form with React

::::: row
::::left

You can clone the example signup form on [CodePen](https://codepen.io/userfront/pen/RwpXopp) and make edits, or follow along below.

::: tip NOTE
The example form has the Userfront Core JS library added to the document, as described in the next section.
:::

::::
:::: right

<br/>
<codepen title="Build a signup form with React" slug="RwpXopp"/>

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

### Signup form React code

#### constructor()

Here we set up our state variables with `email`, `accountName`, `password`, and `passwordVerify`.

We also bind our functions so that `this.setState` will update the state variables.

#### handleInputChange()

Whenever an input changes value, this function will set the corresponding state variable.

#### handleSubmit()

When the form is submitted, this function will call `Userfront.signup()` with the current `email` and `password`.

For custom fields like `accountName`, we use the `data` object. We can add any custom fields we like to this object, and they will be saved upon signup.

#### render()

Adds the signup form with 4 inputs and a button, and connects them to the `handleInputChange()` and `handleSubmit()` functions.

::::
::::right

```jsx
// Initialize Userfront Core JS
Userfront.init("demo1234");

// Define the Signup form component
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      accountName: "",
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

  // Handle the form submission by calling Userfront.signup()
  handleSubmit(event) {
    event.preventDefault();
    // Call Userfront.signup()
    Userfront.signup({
      method: "password",
      email: this.state.email,
      password: this.state.password,
      data: {
        accountName: this.state.accountName,
      },
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email address
            <input
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Account name (custom field)
            <input
              name="accountName"
              type="text"
              value={this.state.accountName}
              onChange={this.handleInputChange}
            />
          </label>
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
            Verify password
            <input
              name="passwordVerify"
              type="password"
              value={this.state.passwordVerify}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Sign up</button>
        </form>
      </div>
    );
  }
}
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

```js {5-7}
Userfront.signup({
  method: "password",
  email: this.state.email,
  password: this.state.password,
  data: {
    accountName: this.state.accountName,
  },
});
```

::::
:::::

### Error handling

::::: row
:::: left

Whenever the `Userfront.signup()` method fails, we can `catch` its error in the promise chain.

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

Our signup form can use this component by including an `alertMessage` variable in the state, and then setting it whenever we want to update the message.

Now the `handleSubmit()` method clears the alert message whenever the button is clicked. Then if there is an error with `Userfront.signup()`, it catches the error and displays the error message.

The alert component is rendered above the form as:

`<Alert message={this.state.alertMessage} />`

::::
:::: right

```jsx {6,10,17-18,28,32-34,39}
class SignupForm extends React.Component {
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
    // Call Userfront.signup()
    Userfront.signup({
      method: "password",
      email: this.state.email,
      password: this.state.password,
      data: {
        accountName: this.state.accountName,
      },
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

```js {5-8}
handleSubmit(event) {
  event.preventDefault();
  // Reset the alert to empty
  this.setAlertMessage();
  // Verify that the passwords match
  if (this.state.password !== this.state.passwordVerify) {
    return this.setAlertMessage('Passwords must match');
  }
  // Call Userfront.signup()
  Userfront.signup({
    // ...
  }).catch((error) => {
    this.setAlertMessage(error.message);
  });
}
```

::::
:::::

## Single sign-on

::::: row
:::: left

To configure Single sign-on (SSO), first add the provider you want to use in the Userfront dashboard in the **SSO** tab.

In this example, we add an `<SSOButton />` component to allow signup with Google.

Ultimately, we need to call `Userfront.signup({ method: "google" })` whenever the button is clicked. You can style the button however you like.

You can find more provider options like GitHub, LinkedIn, and Facebook in the docs for [signup()](/docs/js.html#signup-options).

::::
:::: right

```jsx
Userfront.init("demo1234");

class SSOButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    Userfront.signup({ method: this.props.provider });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Sign up with {this.props.provider}
      </button>
    );
  }
}
```

::::
:::::

::::: row
:::: left

To render the `<SSOButton />` component into the signup form, we can add it below the `<form>` element.

::::
:::: right

```jsx {11}
class SignupForm extends React.Component {
  // ...
  render() {
    return (
      <div>
        {/* <Alert /> component */}
        {/* <form> component */}

        <p>or</p>

        <SSOButton provider="google" />
      </div>
    );
  }
}
```

::::
:::::
