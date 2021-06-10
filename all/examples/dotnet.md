```
-----BEGIN RSA PUBLIC KEY-----
(your base64-encoded RSA public key)
-----END RSA PUBLIC KEY-----
```

```
var headers = req.Headers;
if (!headers.TryGetValue("Authorization", out var tokenHeader))
    return new StatusCodeResult(StatusCodes.Status403Forbidden);

var token = tokenHeader[0].Replace("Bearer ", "");

var publicKeyPem = Environment.GetEnvironmentVariable("Userfront_PublicKey");
var publicKey = RSA.Create();
publicKey.ImportFromPem(publicKeyPem);

try
{
    var json = JwtBuilder.Create()
                         .WithAlgorithm(new RS256Algorithm(publicKey))
                         .MustVerifySignature()
                         .Decode(token);
}
catch (TokenExpiredException)
...
catch (SignatureVerificationException)
...
```
