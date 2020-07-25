# Quickstart

This quickstart will get you up and running with auth in about 10 minutes.

## 1. Add your signup form

Visit the `Toolkit` section of the Userfront dashboard. ([Create an account](https://userfront.com/signup?ref=quickstart) if you haven't already)

![Userfront Toolkit](https://res.cloudinary.com/component/image/upload/v1583359227/guide/menu.png)

Find your signup form and click "Install". This gives you a code you can copy and paste into your HTML to get your form.

Paste the Userfront script once in the `<head>` section of the HTML for your signup page:

<!-- prettier-ignore-start -->
```html
<!-- Userfront -->
<script id="Userfront-script">
  (function(m,o,d,u,l,a,r,i,z,e) {
    u[m]={rq:[],ready:function(j){u[m].rq.push(j);},m:m,o:o,d:d,r:r};function j(s){return encodeURIComponent(btoa(s));}z=l.getElementById(m+"-"+a);r=u.location;
    e=[d+"/page/"+o+"/"+j(r.pathname)+"/"+j(r.host)+"?t="+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});u.amvartem=m;
  })("Userfront","demo1234","https://mod.userfront.com/v2",window,document,"script");
  // Replace demo1234 ^ with your project ID
</script>
<!--/Userfront -->
```
:::tip
Your project ID is in the URL for your project:
![Project ID](https://res.cloudinary.com/component/image/upload/v1583347563/guide/project_id_ilsrsa.png)
:::

Now paste the `<div>` wherever you want the signup form to show.
<!-- prettier-ignore-start -->
```html
<!-- Signup form -->
<div id="userfront-bannba"></div>
<!-- Replace bannba ^ with your form id -->
```
<!-- prettier-ignore-end -->

The form shows wherever you paste the `<div>`:

![Userfront signup form](https://res.cloudinary.com/component/image/upload/v1593130567/permanent/signup-form-dev.png)

## 2. Use your signup form

Give it a try: fill out your signup form and submit it.

Your form is in [dev mode](/dev-mode.html), which means it goes through the signup flow without creating a new user each time.

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

Your tools will all work in dev mode until you deploy them to your live domain; then they will work in live mode automatically.

### Finished

Congratulations, you've added auth to your site.

Learn more about your auth tools:

- [Signup form](/signup.html)
- [Login form](/login.html)
- [Password reset form](/reset.html)
- [Logout button](/logout.html)

Learn more about the JWT access token:

- [JWT structure](/jwt-structure.html)
- [What is a JWT](/jwt-json-web-token.html)
