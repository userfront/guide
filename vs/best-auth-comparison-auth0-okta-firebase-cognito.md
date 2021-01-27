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

> “Secure access for everyone. But not just anyone.”

Auth0 is the 2nd largest provider on our list. Initially focused on smaller firms, they have begun to focus on larger and more complex contracts. This is reflected in their emphasis on legacy support and custom solutions, as well as in their increased pricing and reduction of their free tier.

From their site, Auth0 is designed to “solve the most complex and large-scale identity use cases for global enterprises with our extensible and easy-to-integrate platform, securing billions of logins every year.”

“Auth0 enables users to single sign-on for applications running on various platforms with various identity providers; add few lines of JavaScript to power their applications; customize various stages of the authentication and authorization pipeline, and connect their applications and APIs to their database of users and passwords. Its platform also allows users to authenticate to active directory, LDAP, SAML, Integrated Windows Authentication, Google Apps, Salesforce, and other IdPs without having to configure firewall; add and remove users, modify profiles and authorization attributes, and identify root cause user login issues; see a stream of recent logins and their locations; and enable various SaaS and SAML-enabled applications.”

Verdict: a great solution for more complex use cases or legacy tech stacks, where willingness to pay is relatively high.

## Firebase

![Firebase logo](https://res.cloudinary.com/component/image/upload/w_100/v1611772837/permanent/firebase.png)

> “Google's mobile platform that helps you quickly develop high-quality apps and grow your business.”

Firebase's offerings include a hosted database, analytics, authentication, authorization, crash reporting, push notifications, and more.

#### Firebase offerings

Firebase began as a hosted database platform and was acquired by Google in 2014. It is now focused on delivering a tightly integrated solution for mobile applications.

Unlike the other offerings here, Firebase is often referred to as Backend-as-a-Service (BaaS), meaning that it aims to take on the entire application backend. This benefits you if you want to take a hands-off approach and have a fairly standard set of procedures or integrations you might want your backend to have. It's a drawback, however, if you have custom use cases or need an integration that Firebase doesn't support.

#### Firebase authentication

Focusing on the authentication portion of Firebase, the platform "aims to make building secure authentication systems easy, while improving the sign-in and onboarding experience for end users. It provides an end-to-end identity solution, supporting email and password accounts, phone auth, and Google, Twitter, Facebook, and GitHub login, and more."

Firebase has a customizable user interface called FirebaseUI that has built-in components for mobile and web, with a focus on mobile. The look of the UI is _Googley_ as you might expect, since this is a service by Google.

Because Firebase is built by Google, you can also expect strong security. Firebase claims that the same team built Firebase auth as worked on many of Google's other large-scale projects.

Implementing Firebase authentication is straightforward if you have a standard use case, and Firebase claims you can "Set up the entire authentication system of your app in under 10 lines of code". This was not our experience, but there are likely some basic use cases where this would be true.

## Okta

![Okta logo](https://res.cloudinary.com/component/image/upload/w_90/v1611772964/permanent/okta.png)

## AWS Cognito

![Cognito logo](https://res.cloudinary.com/component/image/upload/w_70,e_trim/v1611773032/permanent/cognito.jpg)

## Userfront

![Userfront logo](https://res.cloudinary.com/component/image/upload/w_150/v1586541167/permanent/cover_400.png)
