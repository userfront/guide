# Quickstart

This quickstart will get you up and running with auth in about 10 minutes.

## 1. Add your signup form

::::: row
:::: left

1. Paste the `<script>` inside the `<head>` of your HTML
2. Paste the `<div>` inside the `<body>` of your HTML (or follow the [React](/guide/toolkit/automatic-signup-form-react.html) or [Vue.js](/guide/toolkit/automatic-signup-form-vue.html) instructions)

View a working example:

[https://codepen.io/userfront/pen/MWyjXXq](https://codepen.io/userfront/pen/MWyjXXq)

::::
:::: right

<install-html display-title="Signup form"/>

::::
:::::

## 2. Use your signup form

::::: row
:::: left

Give it a try: fill out your signup form and submit it.

Your form is in [test mode](/guide/test-mode.html), which means it goes through the signup flow without creating a new user each time.

Upon successful signup, the form does 2 things:

- Redirects you to `/dashboard`. We'll edit this next.
- Adds a secure access token named <access-token-name use-account-id="true"/> to your browser's cookies. This token is a JWT with the user's information, which you can send to your own backend.

::::
:::: right

<iframe-demo display-title="Signup form"></iframe-demo>

::::
:::::

## 3. Set your redirect & domain

::::: row
:::: left

Visit the `Settings` section of the Userfront dashboard.

In the **Auth redirects** section, you can tell Userfront where to redirect the user after they log in, log out, sign up, or need to reset their password.

Try updating the "Signup path" to `/home`, then re-submit your signup form. You should be redirected to `/home` this time.

You can also activate your account and add your website to the list of **Live domains**. Whenever your signup form loads at this domain, it will automatically be in production mode.

::::
:::::

## 4. Add login and others

::::: row
:::: left

Follow the same process for your other tools:

- [Add a login form](/guide/toolkit/automatic-login-form-html.html) to your `/login` page
- [Add a password reset form](/guide/toolkit/automatic-password-reset-form-html.html) to your `/reset` page
- [Add a logout button](/guide/toolkit/automatic-logout-button-html.html) anywhere you need it

Your tools will all work in test mode.

When you deploy your tools to any of your live domains, they will work in live mode automatically.

::::
:::::

### Finished

Congratulations, you've added auth to your site.

Learn more about the JWT access token:

- [Tokens & Access](/guide/auth/)
- [What is a JWT](/guide/auth/jwt-json-web-token.html)
