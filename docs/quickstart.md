# Quickstart

Once you've signed up for Userfront, the fastest way to get started is by using your signup form to create a new user.

## Find your project ID

You can find your project ID in the URL when you're logged in:

![Project ID](https://res.cloudinary.com/component/image/upload/v1583347563/guide/project_id_ilsrsa.png)

:::tip
If you haven't signed up yet, you can use `g48xypb9`, but you won't be able to see the activity in your dashboard.
:::

## Visit your demo app

Visit [https://userfront.dev](https://userfront.dev) and enter your project ID from above.

Your demo app uses your live tools, so anything you do there will be reflected in your dashboard.

## Sign up a new user

In your demo app, click on the signup form and use it to enter details for a new user. This user will be added to your project.

For the full experience of receiving welcome, verification, and password reset emails, use an email address you have access to.

![Signup form](https://res.cloudinary.com/component/image/upload/w_300/v1582158400/signup_rntzec.png)

## View your new user

Your new user automatically shows in your dashboard, along with their recent activity. You can edit your user by clicking on their name or image.

![User record](https://res.cloudinary.com/component/image/upload/v1583358861/guide/user_record.png)

## Add signup to your page

When you're ready to add the signup form to your own page, visit the `Toolkit` section of your dashboard.

![Userfront Toolkit](https://res.cloudinary.com/component/image/upload/v1583359227/guide/menu.png)

Find your signup form there, and click "Install". This gives you a code you can copy and paste into your HTML to get your form.

Place the Userfront script once in the `<head>` section of your HTML, and then paste the Signup Form's `<div>` wherever you want the form to show.

<!-- prettier-ignore-start -->
```html
<head>

  <!-- Userfront -->
  <script id="Userfront-script">
    (function(m,o,d,u,l,a,r,i,z,e) {
      u[m]={rq:[],ready:function(j){u[m].rq.push(j);},m:m,o:o,d:d,r:r};function j(s){return encodeURIComponent(btoa(s));}z=l.getElementById(m+"-"+a);r=u.location;
      e=[d+"/page/"+o+"/"+j(r.pathname)+"/"+j(r.host)+"?t="+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});u.amvartem=m;
    })("Userfront","g48xypb9","https://mod.userfront.com/v2",window,document,"script");
  </script>
  <!--/Userfront -->

</head>

<body>
  <!-- Signup form -->
  <div id="userfront-mloaon"></div>
</body>
```
<!-- prettier-ignore-end -->

## Finished

Congrats! You now have a signup form for new users. You can follow the same steps to add your Login Form, Password Reset Form, Logout Button, and more.

More information about each tool:

- [Signup Form](/signup.html)
- [Login Form](/login.html)
- [Password Reset Form](/reset.html)
- [Logout Button](/logout.html)
- [User Profile](/profile.html)
