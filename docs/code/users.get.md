<code-group>

<code-block title="cURL">
```bash
curl --request GET \
  --url https://api.userfront.com/v0/tenants/tenantId/users/userId \
  --header 'Accept: */*'
```
</code-block>

<code-block title="Node">

```js
const options = {
  method: "GET",
  headers: { Accept: "*/*" },
};

fetch("https://api.userfront.com/v0/tenants/tenantId/users/userId", options)
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
```

</code-block>
<code-block title="Ruby">

```ruby
require 'uri'
require 'net/http'
require 'openssl'

url = URI("https://api.userfront.com/v0/tenants/tenantId/users/userId")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true
http.verify_mode = OpenSSL::SSL::VERIFY_NONE

request = Net::HTTP::Get.new(url)
request["Accept"] = '*/*'

response = http.request(request)
puts response.read_body
```

</code-block>

<code-block title="Python">

```python
import requests

url = "https://api.userfront.com/v0/tenants/tenantId/users"

headers = {
    "Accept": "*/*",
    "Content-Type": "application/json"
}

response = requests.request("POST", url, headers=headers)

print(response.text)
```

</code-block>

<code-block title="JavaScript">

```js
const options = {
  method: "POST",
  headers: { Accept: "*/*", "Content-Type": "application/json" },
  body: "false",
};

fetch("https://api.userfront.com/v0/tenants/tenantId/users", options)
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
```

</code-block>
</code-group>
