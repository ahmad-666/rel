const request = `var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

fetch("https://api.reverseemaillookup.net/v1/public/services/email_lookup?email=robert.marcus@rockstargames.com", requestOptions)
.then(response => response.json())
.then(result => console.log(result))
.catch(error => console.log('error', error));

`;

export default request;
