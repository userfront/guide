# Signup

The purpose of the signup form is to allow new users to register for your service.

<iframe
  :src="`https://test-${ $store.state.activeTenant.tenantId }.userfront.dev/signup`"
  frameborder="0"
  style="width:100%;min-height:500px;border:1px solid #eee;"
></iframe>

When a new user signs up, they are redirected to the URL of your choice (default is `/dashboard`).

When a user signs up on your live site, they also receive a welcome email with a link to confirm their email address.

## Usage

Add your signup form to any page where you want a user to sign up. For example, you may want your signup form directly on your home page and also on a page at `/signup`. You can also add it to your marketing pages if desired.

In order for the signup form to work properly, it should be located at the same domain as your "logged in" pages.

:::tip
For your live sites, always use `https://` (also called SSL).
:::

## Redirection

When a user signs up, they are redirected to the URL of your choice. The default is `/dashboard`, but you can change it in your project's settings.

When defined as a relative path like `/dashboard`, the user will be redirected whatever domain the form is on, plus that path.

For example, if the signup form is at `https://example.com/features`, then the user will be redirected to `https://example.com/dashboard` upon sign up.

## Signup webhook (optional)

If you want to be notified when a new user is created, you can add a URL to the
User Created Webhook in your project settings.

![Signup webhook](https://res.cloudinary.com/component/image/upload/v1582764381/webhook_url_qcmvkl.png)

Userfront will send a JSON `POST` request to your Webhook URL whenever a user is created.

This request will have your project's Webhook Token in the header, which you can use to verify the request in your app.

![Webhook token](https://res.cloudinary.com/component/image/upload/v1583364091/guide/webhook_token.png)

For more information about webhooks, see the [Webhook reference](/docs/webhooks/).