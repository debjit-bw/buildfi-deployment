import hashlib, json
import functions_framework
import requests
from requests import Timeout
from flask_cors import cross_origin
from firebase_admin import firestore, initialize_app
import google.cloud.firestore

initialize_app()
db: google.cloud.firestore.Client = firestore.client()

@functions_framework.http
@cross_origin()
def vote_through_witness(request):
    # address, vote (True/False)
	address = None
	vote = False
	project_id = None
	milestone_id = None
	if request.content_type == 'application/x-www-form-urlencoded':
		address = request.form.get('address')
		vote = request.form.get('vote')
		project_id = request.form.get('project_id')
		milestone_id = request.form.get('milestone_id')
	elif request.content_type == 'application/json':
		address = request.get_json().get('address')
		vote = request.get_json().get('vote')
		project_id = request.get_json().get('project_id')
		milestone_id = request.get_json().get('milestone_id')
	print(address, type(address))
	print(vote, type(vote))
	print(project_id, type(project_id))
	print(milestone_id, type(milestone_id))

	# create basic doc (f"{project_id}#{milestone_id}") if it doesn't exist
	vote_doc = db.collection("buildfi").document(f"{project_id}#{milestone_id}")
	if not vote_doc.get().exists:
		vote_doc.set({
			"yes": 0,
			"no": 0
		})
	
    # check if address already in database
	doc_ref = db.collection("buildfi").document(f"{project_id}#{milestone_id}").collection("votes").document(address)
	doc = doc_ref.get()
	doc_dict = doc.to_dict()
	if doc.exists:
		return {
            "vote": doc_dict["vote"],
			"vote_n": doc_dict["vote_n"],
			"leafIndex": doc_dict["leafIndex"],
			"hash": doc_dict["hash"],
			"message": "Already voted",
			"error": True,
        }
	else:
		witness_votes_doc = db.collection("buildfi").document(f"{project_id}#{milestone_id}")
		witness_votes = witness_votes_doc.get().to_dict()
		if vote:
			witness_votes["yes"] += 1
		else:
			witness_votes["no"] += 1
		vote_n = witness_votes["yes"] + witness_votes["no"]

		hash = '0x' + hashlib.sha256(f"{address}{vote}{vote_n}".encode()).hexdigest()
		resp = requests.post("https://api.witness.co/postLeafHash", data=json.dumps({
			"leafHash": hash
		}), headers={
			"Authorization": "Bearer",
			"Content-Type": "application/json",
			"accept": "application/json"
		})
		try:
			res = resp.json()
			doc_ref.set({
				"address": address,
				"vote": vote,
				"vote_n": vote_n,
				"leafIndex": res["leafIndex"],
				"hash": hash
			})
			witness_votes_doc.set(witness_votes)
			return {
				"error": False,
				"message": "Vote casted",
				"votes_for": witness_votes["yes"],
				"votes_against": witness_votes["no"],
			}
		except Exception as e:
			return {
				"error": True,
				"message": str(e)
			}
