# Single Sign-On (SSO)

::::: row
:::: left

Single Sign-On lets users log into your service by verifying their identity with a 3rd party provider instead of providing an email and password.

SSO can reduce friction in the signup & login process by allowing users to click a button instead of typing in credentials.

SSO is often a good option if your application is strongly associated with an SSO provider, or if you are reasonably sure that many of your users already have an account with one or more providers.

::::
:::: right

![Single Sign-On](https://res.cloudinary.com/component/image/upload/v1619211588/guide/sso-signup.png)

::::
:::::

## Setting up Single Sign-On

::::: row
:::: left

The process for setting up SSO is similar across most providers:

1. [Create an "App" or "Client" for the provider](#configure-the-sso-provider)
2. [Set your authorized domains](#set-your-authorized-domains)
3. [Record your credentials](#find-your-sso-credentials)
4. [Enter your credentials into Userfront](#enter-your-credentials)

### Configure the SSO provider

First, you will need to visit the provider's site, create an account, and configure SSO options there. Some providers refer to your setup as an SSO "Client", while others refer to it as an SSO "App".

Depending on the provider, they may request information to verify that your application does what you claim it does.

::::
:::::

### Set your authorized domains

::::: row
:::: left

SSO providers will typically limit their operation to only the domains that you provide.

::::
:::: right
::: card

#### Example: Google authorized URIs

![](https://res.cloudinary.com/component/image/upload/v1626112411/guide/sso-authorized-domains.png)
:::
::::
:::::

::::: row
:::: left

### Find your SSO credentials

### Enter your credentials

::::
:::::

## Drawbacks

- Don't want to have too many options, users can't remember
- Offer email/password for users who don't have an account or don't want to associate it
- Provider can revoke your application
