from flask import Flask, jsonify, request
from flask_cors import CORS
from emailpromptn import *
import json


app = Flask(__name__)
CORS(app)

@app.route('/api/call_python_function', methods=['POST'])
def call_python_function():
    data = request.get_json()
    result = my_python_function(data)
    result = flask.jsonify(result)
    result.headers.add('Access-Control-Allow-Origin', '*')
    return result

@app.route('/gen2', methods=['POST'])
def gen2():
    json_data = request.get_json(force=True)
    print(json_data)
    print("\n")
    text_Val = json_data.get('key', None)
    print(text_Val)
    type_Val = json_data.get('type', None)
    print(type_Val)
    gen2_msg = generate_reply(text_Val, type_Val)
    data = {'message': gen2_msg}
    print(data)
    return jsonify(data)


@app.route('/gen1', methods=['POST'])
def gen1():
    json_data = request.get_json(force=True)
    print(json_data)
    print("\n")
    extracted_value = json_data.get('key', None)
    #print(extracted_value)
    gen1_msg = generate_response(extracted_value)
    data = {'message': gen1_msg}
    print(data)
    return jsonify(data)

'''
@app.route('/gen1', methods=['POST'])
def gen1():
    json_data = request.get_json(force=True)
    print(json_data)
    print("\n")
    extracted_value = json_data.get('key', None)
    print(extracted_value)
    gen1_msg = generate_response(extracted_value)
    #json_string = json.dumps(gen1_msg)
    #parsed_string = json.loads(json_string)
    print (gen1_msg)
    data = {
        'message': gen1_msg.replace('\n', '\\n')  # Replace newlines with escape sequences
    }
    return jsonify(data)
'''

@app.route('/test_json', methods=['GET'])
def test_json():
    data = {'message': 'Hello, this is a JSON string from Flask!'}
    return jsonify(data)

@app.route('/gen', methods=['GET'])
def gen():
    gen_msg = generate_response("attached quatoation for extermination services")
    data = {'message': gen_msg}
    return jsonify(data)

@app.route('/test')
def test():
    return "Hello"

def my_python_function(data):
    # Your Python logic here
    return {'message': 'Python function called successfully', 'data': data}

if __name__ == '__main__':
    app.run(debug=True)
