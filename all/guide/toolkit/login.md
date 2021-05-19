# Login

## Purpose

The purpose of the Login Form is to allow existing users to log into your service.

<iframe
  :src="`https://test-${ $store.state.activeTenant.tenantId }.userfront.dev/login`"
  frameborder="0"
  style="width:100%;min-height:500px;border:1px solid #eee;"
></iframe>

When a user logs in, they are redirected to the URL of your choice (default is `/dashboard`). They can also choose to generate a login link or reset their password if they have forgotten it.

## Usage

Add your Login Form to any page where you want a user to be able to log in. For example, you may want your Login Form on a page at `/login` and also in the footer of your landing page.

In order for the Login Form to work properly, it should be on a page with the same domain as your "logged in" pages.

:::tip
For your live website, always use `https://` (also called SSL).
:::

## Redirect

When a user logs in, they are redirected to the URL of your choice. The default is `/dashboard`, but you can change it in your account's Settings > **After-login path**.

Upon logging in, the user will be redirected whatever domain the form is on, plus the After-login path.

For example, if the Login Form is at `https://example.com/login`, then the user will be redirected to `https://example.com/dashboard` upon login.

### Client-side redirect

You can also set a redirect with the URL, which will override the After-login path. To do so, set the `redirect` query parameter.

For example, the following URL would redirect to `example.com/path` upon login:

```
https://example.com/login?redirect=/path
```

## Core JS library

You can also log in a user with the Userfront Core JavaScript library, which has the `login()` method.

[Userfront.login() method](/docs/js.html#login-options)

```js
// Example with email
Userfront.login({
  method: "password",
  email: "admin@example.com",
  password: "testmodepassword",
});
```
