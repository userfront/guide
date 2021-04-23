# Auth0 vs Cognito vs Okta vs Firebase vs Userfront Comparison

This article is a comparison of auth service providers, with a focus on authentication and authorization for web applications.

Auth providers allow you to add signup and login functionality to your application, backed by a hosted user database, with the ability to specify which users can access certain resources in your application.

Each provider reviewed here is usable in any web framework.

These are the providers we will review:

| Provider                | Pros                                      | Cons                                                                              |
| ----------------------- | ----------------------------------------- | --------------------------------------------------------------------------------- |
| [Auth0](#auth0)         | Lots of integrations; Legacy support      | Expensive; Larger number of integrations makes it more confusing                  |
| [Firebase](#firebase)   | Great for mobile; Lots of integrations    | Focus on mobile makes it harder to use on web; Database lock-in; Privacy concerns |
| [Okta](#okta)           | Lots of integrations; Legacy support      | Expensive; A little dated; Focused on enterprise                                  |
| [Cognito](#cognito)     | Great for granting access to AWS services | Poor integration for non-AWS applications; Limited access controls                |
| [Userfront](#userfront) | Very easy to use; Less complex            | Focus on modern tech means limited support for legacy protocols                   |

And if you want to skip the reviews and just get to the results, see the [final verdict](#verdict) at the end.

## Auth0

![Auth0 logo](https://res.cloudinary.com/component/image/upload/w_100/v1611772729/permanent/auth0.png)

:::tip
Auth0 is a great solution for legacy tech stacks or complex use cases, where willingness to pay is relatively high.
:::

> “Secure access for everyone. But not just anyone.”

Auth0 is the 2nd largest provider on our list. Initially focused on smaller firms, they have begun to focus on larger and more complex contracts. This is reflected in their emphasis on legacy support and custom solutions, as well as in their increased pricing and reduction of their free tier.

From their site, Auth0 is designed to “solve the most complex and large-scale identity use cases for global enterprises with our extensible and easy-to-integrate platform, securing billions of logins every year.”

Further: “Auth0 enables users to single sign-on for applications running on various platforms with various identity providers; add few lines of JavaScript to power their applications; customize various stages of the authentication and authorization pipeline, and connect their applications and APIs to their database of users and passwords. Its platform also allows users to authenticate to active directory, LDAP, SAML, Integrated Windows Authentication, Google Apps, Salesforce, and other IdPs without having to configure firewall; add and remove users, modify profiles and authorization attributes, and identify root cause user login issues; see a stream of recent logins and their locations; and enable various SaaS and SAML-enabled applications.”

This is a fairly long-winded way to say that Auth0 supports lots of different use cases. If you have a custom flow in mind, or already have specific and well-defined protocols you need to use for your application, Auth0 is likely to have them. If you are not sure which setup would be best for your use case, Auth0 may require additional research to learn how each tool works and when you would want to use it. For auth novices or in general use cases, this can be unnecessary overhead.

#### Auth0 authentication

By default, Auth0 uses a hosted sign on experience, meaning your signup and login forms are hosting on their infrastructure. This makes it easy to get up and running quickly, but the drawback is less flexibility in customizing the sign on experience.

Auth0 comes with all the major authentication integrations you might expect, including Google, GitHub, Microsoft products, and the ability to add your own SSO provider.

The default sign on experience for Auth0 is customizable in its look and feel, but we feel it is a little busy and a dated. It functions well, though it's not always clear where your eye should go, or what should be your focus.

![Auth0 login screen](https://res.cloudinary.com/component/image/upload/w_420/v1611942512/permanent/auth0-login.png)

Auth0 also offers the ability to embed their "Lock" sign on widget on your own pages, or to build a totally custom authentication flow using their aptly named "Custom UI".

## Firebase

![Firebase logo](https://res.cloudinary.com/component/image/upload/w_100/v1611772837/permanent/firebase.png)

:::tip
Firebase is an all-in-one hosted backend for mobile app development, and it excels in this area. Auth is included as a small part of that larger offering.
:::

> “Google's mobile platform that helps you quickly develop high-quality apps and grow your business.”

Firebase is an opinionated way to build mobile apps. Their overall offering includes a hosted database, analytics, authentication, authorization, crash reporting, push notifications, and more. Authentication and authorization are tightly integrated with the rest of the offering, meaning they are great in that context, but can be difficult to use on their own.

Firebase began as a hosted database platform and was acquired by Google in 2014. It is now focused on delivering a tightly integrated solution for mobile applications.

Unlike the other offerings here, Firebase is often referred to as Backend-as-a-Service (BaaS), meaning that it aims to take on the entire application backend. This benefits you if you want to take a hands-off approach and have a fairly standard set of procedures or integrations you might want your backend to have. It's a drawback, however, if you want to use your own database or tech stack for non-user operations, or if you have custom use cases or need an integration that Firebase doesn't support.

In other words, the other providers on this list will host your user records, while Firebase wants to host everything else too.

#### Firebase authentication

Focusing on the authentication portion of Firebase, the platform "aims to make building secure authentication systems easy, while improving the sign-in and onboarding experience for end users. It provides an end-to-end identity solution, supporting email and password accounts, phone auth, and Google, Twitter, Facebook, and GitHub login, and more."

Firebase has a customizable user interface called FirebaseUI that has built-in components for mobile and web, with a focus on mobile. The look of the UI is _Googley_ as you might expect, since this is a service by Google. That said, the default look is still somehow a little bit dated, with a minimalist and utilitarian vibe.

![Firebase login form](https://res.cloudinary.com/component/image/upload/w_280/v1611942270/permanent/firebase-login.png)

You can customize the look and feel of the login screen with additional effort, so if you don't like the look, you can change it. Expect to spend some time familiarizing yourself with the docs, as this means you will be customizing a small part of just one of Firebase's offerings.

It's worth noting that you can expect strong backend security with Firebase because it is built by Google. Realistically, all of the providers on this list offer high security, but Firebase is the only one that can claim the same team as worked on many of Google's other large-scale projects.

## Okta

![Okta logo](https://res.cloudinary.com/component/image/upload/w_90/v1611772964/permanent/okta.png)

:::tip
Okta is focused on identitity management for large enterprises, with thousands of integrations and a team of sales engineers. It is also priced accordingly.
:::

> "Build secure, seamless experiences for your customers and workforce."

Okta is the largest provider on our list and is primarily focused on enterprise contracts for identity management, which means allowing employees to sign into _any_ website, especially internal company websites. They focus on complex integrations, legacy applications, and providing SLA and other contractual support.

Because Okta is the largest and oldest provider here, they support virtually every scenario that could be required for authentication and authorization, from LDAP to SSO, MFA, and over 6,500 integrations across many different industries.

The major downside of Okta is the price, which is geared toward the types of complex integrations and high-touch support that it is known for. Another downside is that Okta can be confusing to administer. There are many, many different options and features available, to the point where knowing which feature you need and how to use it can take quite a bit of effort in itself. However, Okta does typically offer great support and the platform is very stable.

#### Okta authentication

Authentication is a small part of Okta's offering, and they approach it as a necessity for their other services. For web applications, Okta offers a hosted sign on experience by default (e.g. `yoursite.okta.com`), and you can build your own forms to interface with Okta's backend if you need a more custom experience.

Okta offers integration with virtually every SSO provider, and it does so mostly without issue. However, there have been complaints about the integration with Office365 and other Microsoft products. Some users have said these integrations will occasionally stop working or have strange bugs that are difficult to diagnose.

The default design of the Okta sign on experience is a little bit nicer and more modern than Auth0, Cognito, or Firebase, taking an understated and clean approach:

![Okta login screen](https://res.cloudinary.com/component/image/upload/w_420/v1611941722/permanent/okta-login.png)

## Cognito

![Cognito logo](https://res.cloudinary.com/component/image/upload/w_70,e_trim/v1611773032/permanent/cognito.jpg)

:::tip
Cognito works great for authenticating to AWS's own services, but often falls short as a general auth solution.
:::

> "Simple and Secure User Sign-Up, Sign-In, and Access Control"

Cognito is Amazon Web Service's offering for authentication and authorization. It is focused on interfacing with AWS services first and foremost, but also enables you to add auth to your own application.

From their marketing materials: "Amazon Cognito lets you add user sign-up, sign-in, and access control to your web and mobile apps quickly and easily. Amazon Cognito scales to millions of users and supports sign-in with social identity providers, such as Apple, Facebook, Google, and Amazon, and enterprise identity providers via SAML 2.0 and OpenID Connect."

Cognito is still a fairly new entrant and is part of the significantly larger AWS offering, so there are still many places where it lacks features or is not well documented.

#### Cognito authentication

Cognito has the concept of "user pools", which are groups of users that you can set up your application to access. The sign on pages are hosted on AWS by default, meaning you get a login screen like `https://mysite.auth.us-east-1.amazoncognito.com/login`. You can lightly customize the look and feel of this page, as well as point your own domain at it.

The default look of the Cognito page leaves something to be desired, as it resembles a plain Bootstrap form. Functionality is also basic: it is a flow and experience that most users will be familiar with. Like most of AWS, Cognito is not trying to win any competitions on UX or UI design, but you do get a functional, predictable experience.

![Cognito login form](https://res.cloudinary.com/component/image/upload/w_380/v1612204950/permanent/cognito-login.png)

If the plain, hosted option does not fit your project needs, Cognito also has the option to build your own custom forms and self-host them, using their UI library called Amplify. The upside to this is that there is a library dedicated to AWS interfaces; the downside is that if Amplify does not suit your needs, writing your own forms and tailoring the experience will be quite a bit harder than using the hosted sign on or Amplify.

## Userfront

![Userfront logo](https://res.cloudinary.com/component/image/upload/w_150/v1586541167/permanent/cover_400.png)

:::tip
Userfront is excellent for modern web applications that want access control, SSO, or multi-tenancy.
:::

> "Auth without complexity."

Userfront is the newest entrant on our list, and it is focused on ease of use for authentication and access control. That means it is easy to install, and it stays up to date automatically. Unlike the other providers on this list, Userfront's sign on forms automatically update with new protocols and security features, even if you are self-hosting the forms.

Rather than getting involved with how different auth flows work, Userfront handles all the handshakes and protocols for you, and it adds a token (JWT) to the user's browser that you can then send to your application.

As the newest entrant, Userfront has the basics for integrations like SSO via the major providers (Google, Facebook, Azure, etc.), but it does not have the less common integrations or custom protocols that something like Okta would provide. It is also focused on modern protocols, so does not offer support for legacy technologies like LDAP or SAML.

#### Userfront authentication

Authentication is a first-class citizen at Userfront, meaning they have put a good deal of thought into the UX and design of the various authentication flows, and everything "just works" once installed.

Unlike other providers on this list, the default installation for Userfront is to add the forms directly to your own page, rather than having a hosted portal. Each project gets a "Toolkit" with JavaScript widgets for signup, login, password reset, and other typical auth functions. They are easy to install, with ready-to-use snippets for HTML, React, Vue, and Angular.

The default sign on forms are attractive and modern without being overbearing. They have modern touches like working with password managers' autofill, the ability to show/hide passwords, and helpful error messages if the user enters incorrect information.

![Userfront signup form](https://res.cloudinary.com/component/image/upload/v1619211711/guide/signup-form-google.png)

Overall, Userfront is the most pure-play web auth solution on our list, and probably executes it the best for projects where simplicity and modern protocols are a focus.

## Verdict

So, which auth solution is the best? That depends entirely on your needs.

For legacy, enterprise, and projects with lots of complex integrations, Auth0 and Okta are the winners. For standard needs and "keep it simple" projects, Userfront is the best option. For mobile apps, or for projects where you want to use a hosted database for everything in your application, Firebase is the best option. For letting users access your AWS resources like S3 or EC2, Cognito wins.

Here is a summary of the various use cases:

| Use case          | Best option        |
| :---------------- | :----------------- |
| Enterprise        | Okta or Auth0      |
| Startup           | Userfront          |
| Legacy            | Auth0              |
| SaaS              | Userfront          |
| Mobile app        | Firebase           |
| Multi-tenancy     | Userfront or Auth0 |
| Complex use cases | Auth0 or Okta      |
| Accessing AWS     | Cognito            |

As always, your mileage may vary, so if you have some overlap in the above use cases, you may want to trial more than one option before making your final decision.
