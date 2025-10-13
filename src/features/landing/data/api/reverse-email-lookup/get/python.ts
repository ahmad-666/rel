const request = `import requests
import json

url = "https://api.reverseemaillookup.net/v1/public/services/email_lookup"
params = {
    "email": "robert.marcus@rockstargames.com"
}
headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers, params=params)
print(response.text)

`;

export default request;
