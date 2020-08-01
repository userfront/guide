# Overview

Userfront has ready-to-use forms for signup, login, password reset, and more. These are copy/pasted into your website's HTML and don't require any backend to work.

- [Signup Form](/signup.html) lets you start growing your user base right away.
- [Login Form](/login.html) lets your users log in.
- [Password Reset Form](/reset.html) lets your users reset their password.
- [Logout Button](/logout.html) logs a user out of your site.

## Your Toolkit

You can view all of your project's tools in the Toolkit section of the dashboard.

![Userfront Toolkit](https://res.cloudinary.com/component/image/upload/v1583359227/guide/menu.png)

## Installation

To add a tool to your page, visit your project Toolkit and then click a tool's "Install" button.

![Toolkit card](https://res.cloudinary.com/component/image/upload/v1583511331/guide/toolkit_card.png)

This gives you a code you can copy and paste into your HTML.

Place the Userfront `<script>` once in the `<head>` section of your HTML, and then paste the tool's `<div>` in the `<body>` section wherever you want the tool to show.

If you want to add more than one tool to a page, you only need to include the `<script>` one time.

<!-- prettier-ignore-start -->
```html
<head>

  <!-- Userfront -->
  <script id="Userfront-script">
    (function(m,o,d,u,l,a,r,i,z,e) {
      u[m]={rq:[],ready:function(j){u[m].rq.push(j);},m:m,o:o,d:d,r:r};function j(s){return encodeURIComponent(btoa(s));}z=l.getElementById(m+"-"+a);r=u.location;
      e=[d+"/page/"+o+"/"+j(r.pathname)+"/"+j(r.host)+"?t="+Date.now(),d];e.map(function(w){i=l.createElement(a);i.defer=1;i.src=w;z.parentNode.insertBefore(i,z);});u.amvartem=m;
    })("Userfront","n8bjqqx7","https://mod.userfront.com/v2",window,document,"script");
  </script>
  <!--/Userfront -->

</head>

<body>
  <!-- Signup form -->
  <div id="userfront-mloaon"></div>
</body>
```
<!-- prettier-ignore-end -->

:::tip
Be sure to replace `n8bjqqx7` above with your project's ID, and to use your tool's code instead of `userfront-mloaon`.
:::