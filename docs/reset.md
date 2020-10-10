# Password Reset Form

## Purpose

The purpose of the Password Reset Form is to allow existing users to reset their password.

![Password Reset Form](https://res.cloudinary.com/component/image/upload/w_300/v1597168270/permanent/reset-mod.png)

When a user wants to reset their password, they enter their email and recieve a link to the URL of your choice (default is `/reset`). This page should have your Password Reset Form on it.

When the user visits the link, your Password Reset Form will change to allow for resetting the password:

![Password inputs](https://res.cloudinary.com/component/image/upload/w_300/v1583444599/guide/reset_inputs.png)

This is the same tool as above, and it should be installed at the Redirection URL listed below.

## Usage

:::warning
For your live sites, always use `https://` (also called SSL).<br>
If your URL begins with `http://`, it is not secure.
:::

Add your Password Reset Form to a page where you want your users to be able to reset their password.

In order for the Password Reset Form to work properly, it should be on a page with the same domain as your "logged in" pages.

## Redirection

When a user submits the Password Reset Form, they are redirected to the URL of your choice. The default is `/reset`, but you can change it in your project's settings:

![Password Reset URL](https://res.cloudinary.com/component/image/upload/v1583361091/guide/reset_url.png)

When defined as a relative path like `/reset`, the user will be redirected whatever domain the form is on, plus that path.

For example, placing the Password Reset Form at `https://example.com/random`, and defining the redirection path to be `/reset` will send the user a link to `https://example.com/reset`, and the Password Reset Form would need to be on this page as well.

:::tip
Adding the Password Reset Form to a single page like `/reset` is often easiest.
:::

## API interaction (optional)

If you want to generate a password reset link from somewhere else on your site, you can do so by using the same endpoints as the Password Reset Form in your Toolkit:

### Generate a password reset link

```
POST https://api.userfront.com/v0/auth/reset/link
```

#### Request

```json
{
  "project": "g48xypb9",
  "email": "jane@doe.co"
}
```

#### Response

```json
{
  "To": "jane@doe.co",
  "Message": "OK"
}
```

This will generate the password reset email, which will then direct your user to your password reset URL (default is `/reset). You should add the Password Reset Form at this URL so that users can reset their password.
