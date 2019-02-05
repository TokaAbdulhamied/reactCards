import axios from 'axios';

var baseUrl = ""

var client_host = window.location.hostname;

// var server_host = client_host;
if(client_host === "localhost") {
	var server_host = "localhost:8000"
	var protocol = window.location.protocol
	baseUrl = protocol + "//" + server_host
}

var config = {
	baseURL: baseUrl + "/api",
	
}



function refreshAuthHeaders() {
	var token = localStorage.getItem('auth_token')
	if(token)
		Client.defaults.headers.common['Authorization'] = "jwt " + token;
	else 
		delete Client.defaults.headers.common['Authorization'];

}

var Client = axios.create(config)
refreshAuthHeaders()

export default Client;

export {refreshAuthHeaders};
