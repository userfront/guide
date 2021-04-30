# Password Reset

## Purpose

The purpose of the Password Reset Form is to allow existing users to reset their password.

<iframe
  :src="`https://test-${ $store.state.activeTenant.tenantId }.userfront.dev/reset`"
  frameborder="0"
  style="width:100%;min-height:360px;border:1px solid #eee;"
></iframe>

When a user wants to reset their password, they enter their email and recieve a link to the URL of your choice (default is `/reset`). This page should have your Password Reset Form on it.

When the user visits the link, your Password Reset Form will change to allow for resetting the password.

This is the same tool as above, and it should be installed at the Redirection URL listed below.

## Usage

:::warning
For your live sites, always use `https://` (also called SSL).<br>
If your URL begins with `http://`, it is not secure.
:::

Add your Password Reset Form to a page where you want your users to be able to reset their password.

In order for the Password Reset Form to work properly, it should be on a page with the same domain as your "logged in" pages.

## Redirection

When a user submits the Password Reset Form, they are redirected to the URL of your choice. The default is `/reset`, but you can change it in your account's settings:

![Password Reset URL](https://res.cloudinary.com/component/image/upload/v1583361091/guide/reset_url.png)

When defined as a relative path like `/reset`, the user will be redirected whatever domain the form is on, plus that path.

For example, placing the Password Reset Form at `https://example.com/random`, and defining the redirection path to be `/reset` will send the user a link to `https://example.com/reset`, and the Password Reset Form would need to be on this page as well.

:::tip
Adding the Password Reset Form to a single page like `/reset` is often easiest.
:::

## Core JS library

You can also reset a user's password with the Userfront Core JavaScript library, which has the `sendResetLink()` and `resetPassword()` methods.

[Userfront.sendResetLink() method](/docs/js.html#sendresetlink-email)

[Userfront.resetPassword() method](/docs/js.html#resetpassword-options)

```js
// Send the user a password reset link
Userfront.sendResetLink("admin@example.com");

// Once the user visits the link, you can call resetPassword(),
// which reads the reset token & uuid from the URL that was sent.
Userfront.resetPassword({
  password: "myshinynewpassword",
});
```
