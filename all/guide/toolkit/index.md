# Toolkit

:::::row
::::left

Userfront has ready-to-use forms for signup, login, password reset, and more.

These do not require any backend setup to work.

| Tool                                             |                                       |
| ------------------------------------------------ | ------------------------------------- |
| [Signup form](/guide/toolkit/signup.html)        | Lets your users sign up.              |
| [Login form](/guide/toolkit/login.html)          | Lets your users log in.               |
| [Password reset form](/guide/toolkit/reset.html) | Lets your users reset their password. |
| [Logout button](/guide/toolkit/logout.html)      | Logs a user out of your site.         |

::::
:::::

## Location

:::::row
::::left

You can view all of your project's tools in the Toolkit section of the dashboard.

<if-logged-in v-slot="{ tenantId }"><a :href="`/projects/${ tenantId }/toolkit`">Toolkit</a></if-logged-in>

Each section has an example of the tool, along with information on where you should put it, how it behaves, and how to install it.

::::
::::right

:::card

#### Toolkit in sidebar

![Userfront Toolkit](https://res.cloudinary.com/component/image/upload/v1602535900/permanent/toolkit-sidebar.png)
:::

::::
:::::

## Installation

Follow the installation instructions for each tool, which have IDs that are specific to your project.

![Toolkit installation](https://res.cloudinary.com/component/image/upload/v1602536076/permanent/toolkit-installation.png)

:::tip
If you want to add more than one tool to a page, you only need to include the `<script>` one time.
:::
