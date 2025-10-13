const request = `$client = new Client();
$headers = [
    'Accept' => 'application/json',
    'Content-Type' => 'application/json'
];

$url = 'https://api.reverseemaillookup.net/v1/public/services/email_lookup?email=robert.marcus@rockstargames.com';
$request = new Request('GET', $url, $headers);
$res = $client->sendAsync($request)->wait();
echo $res->getBody();

`;

export default request;
