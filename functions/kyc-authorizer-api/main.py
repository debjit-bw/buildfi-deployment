import functions_framework
import requests
from requests import Timeout
from flask_cors import cross_origin

@functions_framework.http
@cross_origin()
def hello_http(request):
	code = None
	if request.content_type == 'application/x-www-form-urlencoded':
		code = request.form.get('code')
	elif request.content_type == 'application/json':
		code = request.get_json().get('code')
	print(code)

	id_token = None

	if code:
		resp = requests.post('https://oauth2.googleapis.com/token', data={
			"code": code,
			"client_id": "876401151866-mhtpl911k9vg6loahfsl5djl7r6kpip0.apps.googleusercontent.com",
			"client_secret": "",
			"redirect_uri": "https://debjit.dev/redirections",
			"grant_type": "authorization_code"
		})
		if 'id_token' in resp.json():
			id_token = resp.json()["id_token"]
			error = True
			try:
				resp = requests.get('http://3.75.202.50:8080/auth', headers={
					"X-Auth-Token": id_token
				}, timeout=1).json()
			except Timeout:
				error = False
				print("Data sent for verification")
			return {
				"id_token": id_token,
				"error": error,
				"message": "Data sent for verification"
			}
		else:
			return {
				"id_token": None,
				"error": True
			}
	else:
		return {
			"id_token": "None",
			"error": "True",
			"message": "No code found"
		}
