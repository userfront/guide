# Quickstart

This quickstart will get you up and running with auth in about 10 minutes.

## 1. Add your signup form

Select your signup form below, then do the following:

1. Paste the `<script>` inside the `<head>` of your HTML
2. Paste the `<div>` inside the `<body>` of your HTML (or follow the React / Vue / Angular instructions)

<!-- Quickstart mod -->
<div id="userfront-baboon"></div>

<style>
[baboon] pre {
  padding: inherit;
  background-color: #f8f8f8;
}
</style>

## 2. Use your signup form

Give it a try: fill out your signup form and submit it.

Your form is in [test mode](/test-mode.html), which means it goes through the signup flow without creating a new user each time.

Upon successful signup, the form does 2 things:

- Redirects you to `/dashboard`. We'll edit this next.
- Adds a secure access token named `access.PROJECT_ID` to your browser's cookies (with your project ID). This token is a JWT with the user's identity and authorization information, which you can send to your own backend.

## 3. Set your redirect & domain

Visit the `Settings` section of the Userfront dashboard.

![Userfront settings](https://res.cloudinary.com/component/image/upload/v1593131793/permanent/settings-nav.png)

Add your website to the list of **Live domains**. Whenever your signup form loads at this domain, it will automatically be in production mode.

Similarly, in the **Auth redirects** section, you can tell Userfront where to redirect the user after they log in, log out, sign up, or need to reset their password.

Try updating the "Signup path" to `/home`, then re-submit your signup form. You should be redirected to `/home` this time.

## 4. Add login and others

Follow the same process for your other tools:

- Add a login form to your `/login` page
- Add a password reset form to your `/reset` page
- Add a logout button anywhere you need it

Your tools will all work in test mode until you deploy them to your live domain; then they will work in live mode automatically.

### Finished

Congratulations, you've added auth to your site.

Learn more about your auth tools:

- [Signup form](/signup.html)
- [Login form](/login.html)
- [Password reset form](/reset.html)
- [Logout button](/logout.html)

Learn more about the JWT access token:

- [Tokens](/tokens.html)
- [What is a JWT](/jwt-json-web-token.html)
