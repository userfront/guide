<toolkit-breadcrumb />

# Ready-to-use password reset form

::::: row
:::: left

In this section, we add an automatic password reset form that allows a user to:

- [Request a password reset link](#password-reset-link)
- [Reset a password](#reset-password)

::::
:::: right

<iframe-demo display-title="Password reset form"></iframe-demo>

::::
:::::

## Example: HTML password reset form

::::: row
::::left

The toolkit password reset form has 2 parts:

**1. Script snippet**

The `<script>` snippet should be added to the `<head>` of any page that has a Userfront toolkit form.

The script snippet only needs to be added once per page.

**2. Password reset form tag**

Add the password reset form tag wherever you want your password reset form to show.

::: warning NOTE
You must place the password reset form at your [Password reset path](/guide/glossary.html#password-reset-path).
:::

You can also add it to other pages if you want users to be able to request password reset links from those pages.

::::
:::: right

<install-html display-title="Password reset form"/>

See a [demo on CodePen](https://codepen.io/userfront/pen/MWyjXXq)

::::
:::::

### Test mode

::::: row
:::: left

By default, your form in [test mode](/guide/test-mode). This allows you to experiment and develop locally without affecting your live data.

Test mode is used automatically for any domains that are not secured with `https://` or that are not added to your list of live domains.

When in test mode, Userfront does not send a password reset email to the user. Instead, a link is displayed directly in the form. This allows you to use dummy email addresses while in test mode if desired.

::::
:::: right
![Test mode password reset](https://res.cloudinary.com/component/image/upload/v1624471802/guide/password-reset-test-mode.png)
::::
:::::

### Password reset link

::::: row
:::: left

The automatic form can send password reset links to a user.

When the user submits their email address, Userfront sends them an email with a link to reset their password. This link directs the user to your [Password reset path](/guide/glossary.html#password-reset-path), which is where you should add your password reset form.

Password reset links are valid for 1 hour and can only be used once.

::::
:::::

### Reset a password

::::: row
:::: left

When the user clicks on a password reset link, they are directed to your [Password reset path](/guide/glossary.html#password-reset-path). You must add your password reset form to this page.

The password reset form allows the user to enter and confirm their new password.

Upon successful password reset, the user is redirected to your [After-login path](/guide/glossary.html#after-login-path).

::::
:::: right
![Password reset form](https://res.cloudinary.com/component/image/upload/v1624470536/guide/password-reset.png)
::::
:::::
