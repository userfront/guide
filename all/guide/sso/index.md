# Single Sign-On (SSO)

::::: row
:::: left

Single Sign-On lets users log into your service by verifying their identity with a 3rd party provider instead of providing an email and password.

SSO can reduce friction in the signup & login process by allowing users to click a button instead of typing in credentials.

SSO is often a good option if your application is strongly associated with an SSO provider, or if you are reasonably sure that many of your users already have an account with one or more providers.

- [Set up SSO](#set-up-single-sign-on)
- [Create SSO buttons](#using-sso-buttons)
- [SSO best practices](#sso-best-practices)

::::
:::: right

![Single Sign-On](https://res.cloudinary.com/component/image/upload/v1619211588/guide/sso-signup.png)

::::
:::::

## Set up Single Sign-On

::::: row
:::: left

The process for setting up SSO is similar for most providers:

1. [Create an "App" or "Client" for the provider](#configure-the-sso-provider)
2. [Set your authorized domains](#set-your-authorized-domains)
3. [Record your credentials](#find-your-sso-credentials)
4. [Enter your credentials into Userfront](#enter-your-credentials)

### Configure the SSO provider

First, you will need to visit the provider's site, create an account, and configure SSO options there. Some providers refer to your setup as an SSO "Client", while others refer to it as an SSO "App".

Depending on the provider, they may request information to verify that your application does what you claim it does. Provide the details needed to set up your SSO provider.

::::
:::::

### Set your authorized domains

::::: row
:::: left

SSO providers will typically limit their operation to only the domains that you provide. In this step, you need to add Userfront to your list of allowed domains.

By default, Userfront will redirect the SSO flow to

<code>https://api.userfront.com/v0/auth/**{providerName}**/login</code>

so you should authorize your application to allow this URL.

#### Verified domains

Some SSO providers may ask you to verify each of your domains with a DNS record. In this case, you can configure your own subdomain to use instead of the default `api.userfront.com`, so that you can add the DNS record required by your provider.

To set up a custom subdomain like <code>**{tenantId}**.yourdomain.com</code>, visit the Userfront dashboard Settings > **Domains** and select "Add certificate" for the domain you want to use.

Once you do this, your custom redirect will look like:

<code>https://**{tenantId}**.yourdomain.com/v0/auth/**{providerName}**/login</code>

Then you can verify your custom subdomain with your provider by adding DNS records for <code>**{tenantId}**.yourdomain.com</code>.

::::
:::: right
::: card

#### Example: Google authorized URIs

![](https://res.cloudinary.com/component/image/upload/v1626112411/guide/sso-authorized-domains.png)
:::
::::
:::::

### Find your SSO credentials

::::: row
:::: left

Your SSO provider will have 2 pieces of information you need:

1. **Client ID** (sometimes called App ID)
2. **Client secret** (sometimes called App Secret)

Locate these 2 pieces of information so that you can add them to Userfront.

::::
:::: right

::: card

#### Example: Google SSO credentials

![Locate SSO Credentials](https://res.cloudinary.com/component/image/upload/v1626361099/guide/google-fake-sso.png)
:::
::::
:::::

### Enter your credentials

::::: row
:::: left

Visit the Userfront dashboard **Single Sign-On** tab and select the provider you want to use.

Enter your credentials in the fields provided.

When you toggle the SSO provider "On", the provider button will show in your toolkit forms automatically.

When you toggle the SSO provider "Off", the provider button will not show in your toolkit forms, but you can still edit the credentials.

:::tip
You can use different SSO credentials for live mode and test mode. Be sure to add the credentials while in the mode you want to use.
:::

::::
:::: right
![Enter SSO credentials](https://res.cloudinary.com/component/image/upload/v1626362461/guide/sso-fake-credentials.gif)
::::
:::::

## Using SSO buttons

::::: row
:::: left

Once you've finished setting up your SSO provider and have added your credentials, your SSO button should show on your toolkit signup and login forms.

Try clicking the button for your SSO provider and following the flow. You are prompted to approve the provider application you set up, and then you proceed with sign on as usual.

### Build your own buttons

Userfront has additional resources to help with building custom buttons:

- [Plain JavaScript](/guide/toolkit/build-signup-form-html.html#single-sign-on)
- [React](/guide/toolkit/build-signup-form-react.html#single-sign-on)
- [Vue.js](/guide/toolkit/build-signup-form-vue.html#single-sign-on)

In all cases, you need to call either [Userfront.signup()](/docs/js.html#signup-options) or [Userfront.login()](/docs/js.html#login-options) (they are equivalent for SSO) with the provider name:

```js
Userfront.signup({ method: "google" });
```

::::
:::::

## SSO best practices

### Don't add too many providers

::::: row
:::: left

Adding more than 1 or 2 providers can make it difficult for users to remember which option they used.

This can cause them to accidentally create more than one account for your service, especially if they have used different email addresses with different providers.

### Offer an email option

Consider including a "standard" option like email/password or email magic links, so that users can use an email address if they want.

Many users may not have an account with the providers you choose, or may not want to associate their provider account with your service.

### Be clear with your SSO provider

Remember that an SSO provider can revoke your application status at their own discretion. If this happens, you retain all of your user information on Userfront, but your users will be unable to sign on using the SSO provider.

To avoid this, clearly describe your service to both the provider and to your users, including what your service does and how the information you collect is used. Also take care not to violate the SSO provider's terms and conditions.

::::
:::::
