# API reference

::::: row
:::: left

The Userfront API is organized around [REST](http://en.wikipedia.org/wiki/Representational_State_Transfer). Our API has predictable resource-oriented URLs, accepts [JSON-encoded](http://www.json.org/) request bodies, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.

You can use the Userfront API in test mode, which does not affect your live data. The API key you use to [authenticate](#authentication) the request determines whether the request is live mode or test mode.

<!-- Log in to see docs customized to your version of the API, with your test key and data. -->

::::
:::: right

#### Just getting started?

Check out our development [quickstart guide](https://userfront.com/guide/quickstart).

::: card

#### Base URL

<code style="background-color:inherit;font-size:14px;padding:0;">https://api.userfront.com</code>
:::

::::
:::::

!!! include(docs/sections/authentication.md) !!!

!!! include(docs/sections/errors.md) !!!

!!! include(docs/sections/users.md) !!!

### Create a user

::::: row
:::: left

`POST /v0/tenants/:tenantId/users`

Creates a new user in an existing tenant.

#### Parameters

::::
:::: right

!!! include(docs/sections/users.get.md) !!!

::::
:::::
