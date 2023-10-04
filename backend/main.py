from flask import Flask, request, abort
import redis
from flask_cors import CORS

app = Flask(__name__)

r = redis.Redis(host='localhost', port=6379, decode_responses=True)

CORS(app, origins='http://localhost:8080', allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Credentials"],
supports_credentials=True)

@app.route('/url', methods=['POST'])
def create_url():
    url_original = request.json['url_original']
    url_acortada = request.json['url_acortada']

    for k in r.scan_iter(match='*'):
        item = r.get(k)
        if k == url_original:
            return abort(422)
        elif item == url_acortada:
            return abort(423)

    r.set(url_original, url_acortada)
    new_url = {url_original: url_acortada}
    
    return new_url

@app.route('/urls', methods=['GET'])
def get_urls():
    all_urls = []
    for k in r.scan_iter(match='*'):
        item = r.get(k)
        all_urls.append({k: item})
    return all_urls

@app.route('/url/<url_acortada>', methods=['GET'])
def get_url(url_acortada):
    for k in r.scan_iter(match='*'):
        item = r.get(k)
        if item == url_acortada:
            url = {k: url_acortada}
            return url

@app.route('/url/<url_acortada>', methods=['PUT'])
def update_url(url_acortada):
    url_original = request.json['url_original']
    url_acortada = request.json['url_acortada']
    for k in r.scan_iter(match='*'):
        item = r.get(k)
        if item == url_acortada:
            r.delete(k)
            r.set(url_original, url_acortada)
    return {url_original: url_acortada}

@app.route('/url/<url_acortada>', methods=['DELETE'])
def delete_url(url_acortada):
    for k in r.scan_iter(match='*'):
        item = r.get(k)
        if item == url_acortada:
            r.delete(k)
    return 'Success'

if __name__ == "__main__":
    app.run(debug=True)