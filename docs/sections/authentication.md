## Authentication

::::: row
:::: left

The Userfront API uses API keys to authenticate requests. You can view and manage your API keys in the Userfront Dashboard.

Test mode secret keys have the prefix `uf_test_` and live mode secret keys have the prefix `uf_live_`.

Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.

Authentication to the API is performed via HTTP [Bearer Auth](https://tools.ietf.org/html/rfc6750). Provide your API key in the header of each request as:
`Authorization: Bearer your_api_key`.

All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.

::::
:::: right

::: card

#### Your API Key

A sample test API key is included in all the examples here, so you can test any example right away.

To test requests using your account, replace the sample API key with your actual API key or sign in.

:::

::::
:::::
