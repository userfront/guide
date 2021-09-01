# JWT public and private keys

::::: row
:::: left
Userfront uses the `RS256` algorithm for JWT access tokens.

The `RS256` algorithm has two keys: a public key and a private key.

The public key is used to verify access token authenticity, and the private key is used to create access tokens.
::::

:::::

## JWT public key

::::: row
:::: left

You can use your JWT public key to verify the JWT access tokens granted to your users when they log into your application.

Once you verify an access token, you can trust that it was created by Userfront and that it has not been altered by a third party.

Your JWT public key is available in the **Settings** tab of your Userfront dashboard.

::::
:::: right
::: tip
The JWT public key is truly public: it can be shared anywhere without reducing security.
:::

Learn how to verify an access token [here](/guide/auth/#verify-the-jwt-access-token).
::::
:::::

#### Plain text

::::: row
:::: left

The JWT public key is denoted with the text

`-----BEGIN RSA PUBLIC KEY-----`

`-----END RSA PUBLIC KEY-----`

These lines are part of the public key and should be included whenever you use the public key.

The public key must be used exactly as displayed without changes: line breaks are important, so you cannot shorten the key to one line. You also need to ensure that there are no spaces before or after the public key in your system.

::::
:::: right

```
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAodD/IEagav7wlBX+k30YOSFpYT0u7AtV3ljwC52ShCFFGVvw86T5
VTbg5Q/L/dgQT0+OZi+Fe/aAIL6j+3d8+Md5nGg7zqTv33GE7tN4ZoSkYnPMAm1I
PjkOevpia98u8n1jWE/OnDnQqgozcy2zssGcJ1+QwJWuZWVObbFiA6ppFlyb9Hm8
2wEgvBqjuTqCvLdJO5CtY5ya5OpGLpnqlsXTRgJEEFk0VTdH56ztcLFMDMxm4OVW
aWy+i4YieTRRKnbyT7fzDPiZupkcg2jwVF49CtyB9UWtE/+/BAKtJtBLfdZ5X1dK
RqesE10ysVdGxeyeRpyFltEfF5QWAzn99wIDAQAB
-----END RSA PUBLIC KEY-----
```

::::
:::::

#### Base64

::::: row
:::: left

If you want to add the JWT public key as an environment variable for your system, it is often easier to use a Base64 encoded version.

Userfront provides this version alongside the plain text version as a convenience.

The Base64 encoded version is the same public key, and you can Base64 decode this version to get the plain text version.

::::
:::: right

```
LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJDZ0tDQVFFQW9kRC9JRWFnYXY3d2xCWCtrMzBZT1NGcFlUMHU3QXRWM2xqd0M1MlNoQ0ZGR1Z2dzg2VDUKVlRiZzVRL0wvZGdRVDArT1ppK0ZlL2FBSUw2aiszZDgrTWQ1bkdnN3pxVHYzM0dFN3RONFpvU2tZblBNQW0xSQpQamtPZXZwaWE5OHU4bjFqV0UvT25EblFxZ296Y3kyenNzR2NKMStRd0pXdVpXVk9iYkZpQTZwcEZseWI5SG04CjJ3RWd2QnFqdVRxQ3ZMZEpPNUN0WTV5YTVPcEdMcG5xbHNYVFJnSkVFRmswVlRkSDU2enRjTEZNRE14bTRPVlcKYVd5K2k0WWllVFJSS25ieVQ3ZnpEUGladXBrY2cyandWRjQ5Q3R5QjlVV3RFLysvQkFLdEp0QkxmZFo1WDFkSwpScWVzRTEweXNWZEd4ZXllUnB5Rmx0RWZGNVFXQXpuOTl3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0=
```

::::
:::::

## JWT private key

::::: row
:::: left

Userfront creates JWT access tokens and signs them with the `RS256` algorithm using a private key specific to your account.

This private key is not available in your dashboard: Userfront encrypts and stores each private key such that it is only accessible during automated token creation.

::::
:::::

## RSA algorithm

::::: row
:::: left
The `RS256` algorithm uses SHA-256 hashing along with large-modulus RSA encryption as recommended by the NSA for protecting sensitive information.

::::
:::: right
::: card
[Read NSA guidance](https://apps.nsa.gov/iaarchive/programs/iad-initiatives/cnsa-suite.cfm)
:::
::::
:::::
