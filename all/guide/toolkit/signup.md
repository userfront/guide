# Signup

The purpose of the signup form is to allow new users to register for your service.

<iframe-demo display-title="Signup form"></iframe-demo>

When a new user signs up, they are redirected to the URL of your choice (default is `/dashboard`).

When a user signs up on your live site, they also receive a welcome email with a link to confirm their email address.

## Usage

Add your signup form to any page where you want a user to sign up. For example, you may want your signup form directly on your home page and also on a page at `/signup`. You can also add it to your marketing pages if desired.

In order for the signup form to work properly, it should be located at the same domain as your "logged in" pages.

:::tip
For your live website, always use `https://` (also called SSL).
:::

## Redirect

When a user signs up, they are redirected to the URL of your choice. The default is `/dashboard`, but you can change it in your account's Settings > **After-signup path**.

Upon signing up, the user will be redirected whatever domain the form is on, plus the After-signup path.

For example, if the signup form is at `https://example.com/features`, then the user will be redirected to `https://example.com/dashboard` upon sign up.

## Core JS library

You can also register a user with the Userfront Core JavaScript library, which has the `signup()` method.

[Userfront.signup() method](/docs/js.html#signup-options)

```js
// Example with email
Userfront.signup({
  method: "password",
  email: "admin@example.com",
  password: "testmodepassword",
});

// Example with Google
Userfront.signup({ method: "google" });
```

## Signup webhook (optional)

If you want to be notified when a new user is created, you can add a URL to the
User Created Webhook in your account settings.

![Signup webhook](https://res.cloudinary.com/component/image/upload/v1582764381/webhook_url_qcmvkl.png)

Userfront will send a JSON `POST` request to your Webhook URL whenever a user is created. This request will have your account's Webhook Token in the header, which you can use to verify the request in your app.

For more information about webhooks, see the [Webhook reference](/docs/webhooks/).
