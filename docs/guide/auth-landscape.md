# Auth landscape

Direct authentication strategies

- HTTP Basic - user ID and password
- Bearer token
- JWT

- LDAP directory
  - Validates username/password against a directory server
- TOTP (Time-based One-Time Password)

Delegated authorization: ability for one service to grant access to a resource for another service (e.g. Google can get access to a list on Yelp)

- Oauth 2.0
  - Access granting protocol

Federated identity / authentication: ability to log into a site using another service as proof of identitiy

- SAML 2.0

  - Came first, but no longer as relevant for API calls
  - Relies on exchange of messages for authentication in XML SAML format
  - Older, more adoption in enterprise

- OpenID Connect (OIDC 1.0)
  - Built on top of Oauth 2.0
  - Typically uses JWT format for id-token
  - Newer, more adoption in web & mobile applications
