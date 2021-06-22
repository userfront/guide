<toolkit-breadcrumb />

# Ready-to-use signup form

::::: row
:::: left

In this section, we add an automatic signup form that does the following:

- [Registers a user](#register-a-user)
- [Redirects](#redirection) to a URL of your choice
- [Sends a welcome email](#welcome-email)
- [Sends a webhook](#signup-webhook) with user information
- [Has Single Sign-on](#single-sign-on) (SSO) with Google

::::
:::: right

<iframe
  :src="`https://test-${ $store.state.activeTenant.tenantId }.userfront.dev/signup`"
  frameborder="0"
  style="width:100%;min-height:500px;border:1px solid #eee; margin-top:10px;"
></iframe>

::::
:::::

## Example: HTML signup form

::::: row
::::left

The toolkit signup form has 2 parts:

**1. Script snippet**

The `<script>` snippet should be added to the `<head>` of any page that has a Userfront toolkit form.

The script snippet only needs to be added once per page.

**2. Signup form tag**

Add the signup form tag wherever you want your signup form to show.

You can add it more than once per page if you want to have the signup form in multiple places.

::::
:::: right

<!-- prettier-ignore -->
```html
<html>
<head>

  <!-- 1. Script snippet -->
  <script id="Userfront-script">
    (function(m,o,d,u,l,a,r,i,z,e) {
      u[m]={rq:[],ready:function(j){u[m].rq.push(j);},m:m,o:o,d:d,r:r};function j(s){return encodeURIComponent(btoa(s));}z=l.getElementById(m+"-"+a);r=u.location;
      e=[d+"/page/"+o+"/"+j(r.pathname)+"/"+j(r.host)+"?t="+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});u.amvartem=m;
    })("Userfront", "demo1234", "https://cdn.userfront.com/toolkit",window,document,"script");
  </script>

</head>
<body>

  <!-- 2. Signup form tag -->
  <div id="userfront-nkmbbm"></div>

</body>
```

<!-- /prettier-ignore -->

::::
:::::

### Test mode

::::: row
:::: left

By default, your form in [test mode](/guide/test-mode). This allows you to experiment and develop locally without affecting your live data.

Test mode is used automatically for any domains that are not secured with `https://` or that are not added to your list of live domains.

::::
:::::

### Register a user

::::: row
:::: left

Add your signup form to any page where you want a user to sign up.

For example, you may want your signup form directly on your home page and also on a page at `/signup`. You can also add it to your marketing pages if desired.

In order for the signup form to work properly, it should be located at the same domain as your "logged in" pages.

::::
:::::

### Redirection

::::: row
:::: left

When a user signs up, they are redirected to the URL of your choice.

The default is `/dashboard`, but you can change it in your account:

**Settings > After-signup path**

Upon signing up, the user will be redirected to whatever domain the form is on, plus the After-signup path.

For example, if the signup form is at `https://example.com/features`, then the user will be redirected to `https://example.com/dashboard` upon sign up.
::::
:::::

### Welcome email

::::: row
:::: left

When a user signs up with their email and password, Userfront sends them a welcome email.

This email confirms that they have signed up for your project and asks the user to verify their email address by clicking on a link.

When the user clicks on the link, their email address is verified, and they are redirected to your After-login path.

::::
:::::

## Signup webhook

::::: row
:::: left

If you want to be notified when a new user is created, you can add a URL to the User Created Webhook in your account settings.

Userfront will send a JSON `POST` request to your Webhook URL whenever a user is created. This request will have your account's Webhook Token in the header, which you can use to verify the request in your application.

For more information about webhooks, see the [Webhook reference](/docs/webhooks/).

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
![Single sign-on with Google](https://res.cloudinary.com/component/image/upload/v1619211711/guide/signup-form-google.png)
::::
:::::
