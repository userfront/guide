<toolkit-breadcrumb />

# Build a login form with React

::::: row
:::: left

In this section, we create a custom login form with email/username and password that includes:

- [Email or username](#email-or-username-field) field
- [Error messages](#error-handling)
- [Single sign-on](#single-sign-on) (SSO) with Google

::::
:::::

## Example: custom login form with React

::::: row
::::left

You can clone the example login form on [CodePen](https://codepen.io/userfront/pen/abJgQJy) and make edits, or follow along below.

::: tip NOTE
The example form has the Userfront Core JS library added to the document, as described in the next section.
:::

::::
:::: right

<br/>
<codepen title="Build a login form with React" slug="abJgQJy"/>

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

### Login form React code

#### constructor()

Here we set up our state variables with `emailOrUsername` and `password`.

We also bind our functions so that `this.setState` will update the state variables.

#### handleInputChange()

Whenever an input changes value, this function will set the corresponding state variable.

#### handleSubmit()

When the form is submitted, this function will call `Userfront.login()` with the current `emailOrUsername` and `password`.

#### render()

Adds the login form with 2 inputs and a button, and connects them to the `handleInputChange()` and `handleSubmit()` functions.

::::
:::: right

```jsx
// Initialize Userfront Core JS
Userfront.init("demo1234");

// Define the Login form component
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailOrUsername: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
    event.preventDefault();
  }

  handleSubmit(event) {
    Userfront.login({
      method: "password",
      emailOrUsername: this.state.emailOrUsername,
      password: this.state.password,
    });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email or username
            <input
              name="emailOrUsername"
              type="text"
              value={this.state.emailOrUsername}
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
          <button type="submit">Log in</button>
        </form>
      </div>
    );
  }
}
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

Our login form can use this component by including an `alertMessage` variable in the state, and then setting it whenever we want to update the message.

Now the `handleSubmit()` method clears the alert message whenever the button is clicked. Then if there is an error with `Userfront.login()`, it catches the error and displays the error message.

The alert component is rendered above the form as:

`<Alert message={this.state.alertMessage} />`

::::
:::: right

```jsx {6,10,16-17,24,29-31,36}
class LoginForm extends React.Component {
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
    // Reset the alert to empty
    this.setAlertMessage();
    // Call Userfront.login()
    Userfront.login({
      method: "password",
      emailOrUsername: this.state.emailOrUsername,
      password: this.state.password,
    }).catch((error) => {
      this.setAlertMessage(error.message);
    });
    event.preventDefault();
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

## Single sign-on

::::: row
:::: left

To configure Single sign-on (SSO), first add the provider you want to use in the Userfront dashboard in the **SSO** tab.

In this example, we add an `<SSOButton />` component to allow login with Google.

Ultimately, we need to call `Userfront.login({ method: "google" })` whenever the button is clicked. You can style the button however you like.

You can find more provider options like GitHub, LinkedIn, and Facebook in the docs for [login()](/docs/js.html#login-options).

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
    Userfront.login({ method: this.props.provider });
    event.preventDefault();
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Log in with {this.props.provider}
      </button>
    );
  }
}
```

::::
:::::

::::: row
:::: left

To render the `<SSOButton />` component into the login form, we can add it below the `<form>` element.

::::
:::: right

```jsx {11}
class LoginForm extends React.Component {
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
