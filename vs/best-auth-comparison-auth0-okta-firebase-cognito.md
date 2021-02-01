# Auth0 vs Cognito vs Okta vs Firebase vs Userfront Comparison

Welcome to a comparison of general-purpose auth solutions

Focused on authentication and authorization

Usable in any framework

|           | Pros                                                | Cons                                                                               |
| --------- | --------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Auth0     | Lots of integrations                                | Expensive; Lots of integrations makes it harder to use; documentation is confusing |
| Firebase  | Opinionated; Lots of integrations; Great for mobile | Focus on mobile makes it harder to use on web; locked into DB; Privacy concerns    |
| Okta      | Lots of integrations                                | A little bit dated; focus on enterprise                                            |
| Cognito   | Great integration with AWS services                 | Poor integration for non-AWS                                                       |
| Userfront | Very easy to use; less complex                      | Lack of legacy support                                                             |

## Auth0

![Auth0 logo](https://res.cloudinary.com/component/image/upload/w_100/v1611772729/permanent/auth0.png)

:::tip
Auth0 is a great solution for legacy tech stacks or complex use cases, where willingness to pay is relatively high.
:::

> “Secure access for everyone. But not just anyone.”

Auth0 is the 2nd largest provider on our list. Initially focused on smaller firms, they have begun to focus on larger and more complex contracts. This is reflected in their emphasis on legacy support and custom solutions, as well as in their increased pricing and reduction of their free tier.

From their site, Auth0 is designed to “solve the most complex and large-scale identity use cases for global enterprises with our extensible and easy-to-integrate platform, securing billions of logins every year.”

“Auth0 enables users to single sign-on for applications running on various platforms with various identity providers; add few lines of JavaScript to power their applications; customize various stages of the authentication and authorization pipeline, and connect their applications and APIs to their database of users and passwords. Its platform also allows users to authenticate to active directory, LDAP, SAML, Integrated Windows Authentication, Google Apps, Salesforce, and other IdPs without having to configure firewall; add and remove users, modify profiles and authorization attributes, and identify root cause user login issues; see a stream of recent logins and their locations; and enable various SaaS and SAML-enabled applications.”

#### Auth0 authentication

![Auth0 login screen](https://res.cloudinary.com/component/image/upload/w_420/v1611942512/permanent/auth0-login.png)

## Firebase

![Firebase logo](https://res.cloudinary.com/component/image/upload/w_100/v1611772837/permanent/firebase.png)

:::tip
Firebase is a full backend for mobile app development, and it excels in this area. Auth is included as part of that larger offering.
:::

> “Google's mobile platform that helps you quickly develop high-quality apps and grow your business.”

Firebase's offerings include a hosted database, analytics, authentication, authorization, crash reporting, push notifications, and more.

Firebase began as a hosted database platform and was acquired by Google in 2014. It is now focused on delivering a tightly integrated solution for mobile applications.

Unlike the other offerings here, Firebase is often referred to as Backend-as-a-Service (BaaS), meaning that it aims to take on the entire application backend. This benefits you if you want to take a hands-off approach and have a fairly standard set of procedures or integrations you might want your backend to have. It's a drawback, however, if you have custom use cases or need an integration that Firebase doesn't support.

#### Firebase authentication

Focusing on the authentication portion of Firebase, the platform "aims to make building secure authentication systems easy, while improving the sign-in and onboarding experience for end users. It provides an end-to-end identity solution, supporting email and password accounts, phone auth, and Google, Twitter, Facebook, and GitHub login, and more."

Firebase has a customizable user interface called FirebaseUI that has built-in components for mobile and web, with a focus on mobile. The look of the UI is _Googley_ as you might expect, since this is a service by Google.

![Firebase login form](https://res.cloudinary.com/component/image/upload/w_280/v1611942270/permanent/firebase-login.png)

That said, you can customize the look and feel of the login screen with additional effort, so if you don't like the look, you can change it.

Because Firebase is built by Google, you can also expect strong security. Firebase claims that the same team built Firebase auth as worked on many of Google's other large-scale projects.

Implementing Firebase authentication is straightforward if you have a standard use case, and Firebase claims you can "Set up the entire authentication system of your app in under 10 lines of code". This was not our experience, but there are likely some basic use cases where this would be true.

## Okta

![Okta logo](https://res.cloudinary.com/component/image/upload/w_90/v1611772964/permanent/okta.png)

:::tip
Okta is focused on identitity management for large enterprises, with thousands of integrations and a team of sales engineers. It is also priced accordingly.
:::

> "Build secure, seamless experiences for your customers and workforce."

Okta is the largest provider on our list and is primarily focused on enterprise contracts for identity management, which means allowing employees to sign into _any_ website, including company websites. They focus on complex integrations, legacy applications, and providing SLA and other contractual support.

Because Okta is the largest and oldest provider here, they support virtually every scenario that could be required for authentication and authorization, from LDAP to SSO, MFA, and over 6,500 integrations across many different industries.

The major downside of Okta, aside from the price, is that it can be confusing to administer. There are many, many different options and features available, to the point where knowing which one to use can take effort in itself.

#### Okta authentication

Authentication is a small part of Okta's offering, and they approach it as a basic necessity for their other services. This means you can set up a hosted login screen at `yoursite.okta.com`

![Okta login screen](https://res.cloudinary.com/component/image/upload/w_420/v1611941722/permanent/okta-login.png)

## AWS Cognito

![Cognito logo](https://res.cloudinary.com/component/image/upload/w_70,e_trim/v1611773032/permanent/cognito.jpg)

:::tip
Cognito works great for authenticating to AWS's own services, but often falls short as a general auth solution.
:::

> "Simple and Secure User Sign-Up, Sign-In, and Access Control"

"Amazon Cognito lets you add user sign-up, sign-in, and access control to your web and mobile apps quickly and easily. Amazon Cognito scales to millions of users and supports sign-in with social identity providers, such as Apple, Facebook, Google, and Amazon, and enterprise identity providers via SAML 2.0 and OpenID Connect. "

## Userfront

![Userfront logo](https://res.cloudinary.com/component/image/upload/w_150/v1586541167/permanent/cover_400.png)
