---
title: Create a React logout button
---

<toolkit-breadcrumb />

# Build a logout button with React

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

You can clone the example logout button on [CodePen](https://codepen.io/userfront/pen/yLbBBeq) and make edits, or follow along below.

::: tip NOTE
The example form has the Userfront Core JS library added to the document, as described in the next section.
:::

::::
:::: right

<br/>
<codepen title="Build a logout button with React" slug="yLbBBeq"/>

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

Create your logout button with the elements you want to use.

In this case, we're using a custom-styled `<button>` element that is red when active and gray if the user is not logged in.

### Logout button React code

#### constructor()

Here we set up our state variable `disabled` to determine whether to disable the button.

We also bind our `handleClick` function so that `this.setState` will update the state variables.

#### handleClick()

When the button is clicked, this function will call `Userfront.logout()`.

#### render()

Adds the logout button and connects it to the `handleClick()` function.

::::
:::: right

```jsx
// Initialize Userfront Core JS
Userfront.init("demo1234");

// Define the logout button component
class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: !Userfront.accessToken(),
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    Userfront.logout();
  }

  render() {
    return (
      <button
        id="logout-button"
        onClick={this.handleClick}
        disabled={this.state.disabled}
      >
        Log out
      </button>
    );
  }
}
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

### Userfront.logout()

::::: row
:::: left

The [logout()](/docs/js.html#logout) method allows you to log out a user.

Userfront then does the following:

1. Invalidates the user's current session
2. Clears any access, ID, and refresh tokens from the browser
3. Redirects the page to the [After-logout path](/guide/glossary.html#after-logout-path)

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

### Disabled state

::::: row
:::: left

You are not required to show the button when the user is not logged in; usually the logout button is only shown on pages where the user must be logged in.

You can show a disabled state by adding the `disabled` property to the button.

If the user is logged in, `Userfront.accessToken()` will return a value, so we can test against this and enable the button by setting `state.disabled = !Userfront.accessToken()`.

We can then map the `disabled` state to the `<button>` element.

::::
:::: right

```jsx {5,15}
class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: !Userfront.accessToken(),
    };
    // ...
  }
  // ...
  render() {
    return (
      <button
        id="logout-button"
        onClick={this.handleClick}
        disabled={this.state.disabled}
      >
        Log out
      </button>
    );
  }
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
