---
title: Install a pre-made login form with React
---

<toolkit-breadcrumb />

# Ready-to-use login form with React

::::: row
:::: left

In this section, we add an automatic login form that can do the following:

- [Log in a user](#log-in-a-user) with email or username
- [Redirect](#redirection) to a URL of your choice upon login
- [Single Sign-on](#single-sign-on) (SSO) with Google & others
- [Send a login link](#login-link)
- [Send a password reset email](#password-reset-link)

::::
:::: right

<iframe-demo display-title="Login form"></iframe-demo>

::::
:::::

## Example: React login form

#### Install the Userfront React library

::::: row
::::left

To add the form to your React project, first install `@userfront/react` with npm (or yarn).

::::
:::: right

```sh
npm install @userfront/react --save
```

::::
:::::

#### Render the login form in React

::::: row
:::: left

First, initialize the Userfront React library with your [account ID](/guide/glossary.html#account-id) using `Userfront.init()`.

Build the `LoginForm` component with `Userfront.build()` using the tool ID corresponding to your login form. This can be found in the **Toolkit** section of the Userfront dashboard.

Render the `<LoginForm />` component in your React app.

::::
:::: right

See a [demo on CodeSandbox](https://codesandbox.io/s/userfront-react-example-d6t0d)

<install-react display-title="Login form"/>

::::
:::::

### Test mode

::::: row
:::: left

By default, your form in [test mode](/guide/test-mode). This allows you to experiment and develop locally without affecting your live data.

Test mode is used automatically for any domains that are not secured with `https://` or that are not added to your list of live domains.

::::
:::::

### Log in a user

::::: row
:::: left

Add your login form to any page where you want a user to be able to login.

The user is able to log in with either their email address or their username, if applicable.

In order for the login form to work properly, it should be located at the same domain as your "logged in" pages.

::::
:::::

### Redirection

::::: row
:::: left

When a user logs in, they are redirected to the path of your choice.

The default is `/dashboard`, but you can change it in your account:

**Settings > After-login path**

Upon logging in, the user will be redirected to whatever domain the form is on, plus the After-login path.

For example, if the login form is at `https://example.com/login`, then the user will be redirected to `https://example.com/dashboard` upon login.
::::
:::::

## Single Sign-on

::::: row
:::: left

To configure Single sign-on (SSO) with Google or other providers, visit the **SSO** tab in the Userfront dashboard.

From there, you can add the credentials for the providers you want to use.

Once you have done this, the corresponding button(s) will show up on your form automatically.

::::
:::: right
![Single sign-on login with Google](https://res.cloudinary.com/component/image/upload/v1624461855/guide/login-form-google.png)
::::
:::::

## Login link

::::: row
:::: left

The automatic form can send login links (sometimes called "magic links") to a user.

When the user submits their email address, Userfront sends them an email with a link to log in. This link allows the user to log in without entering their password.

Login links are valid for 1 hour and can only be used once.

::::
:::: right
![Login link form](https://res.cloudinary.com/component/image/upload/v1624467965/guide/login-link.png)
::::
:::::

## Password reset link

::::: row
:::: left

The automatic form can send password reset links to a user.

When the user submits their email address, Userfront sends them an email with a link to reset their password. This link directs the user to your [Password reset path](/guide/glossary.html#password-reset-path), which is where you should add your [password reset form](/guide/toolkit/automatic-password-reset-form-html.html).

Password reset links are valid for 1 hour and can only be used once.

::::
:::: right
![Password reset link form](https://res.cloudinary.com/component/image/upload/v1624467966/guide/login-reset-password.png)
::::
:::::
