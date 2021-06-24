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

Whenever an input changes value, this function will the corresponding state variable.

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

```css
button,
input {
  display: block;
  margin-bottom: 10px;
}

#alert {
  color: red;
  margin-bottom: 10px;
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
  ...
  emailOrUsername: "member@example.com"
});

// Is the same as

Userfront.login({
  ...
  email: "member@example.com"
});

// Or you can use "username"

Userfront.login({
  ...
  username: "member1234"
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
