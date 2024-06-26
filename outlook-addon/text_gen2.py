from flask import Flask, render_template, redirect, url_for,request
from flask import make_response
app = Flask(__name__)

@app.route("/")
def home():
    return "hi"
@app.route("/index")

@app.route('/login', methods=['GET', 'POST'])
def login():
   message = None
   if request.method == 'POST':
        datafromjs = request.form['mydata']
        print('datafromjs:' + datafromjs)
        resp = datafromjs+'py data'
        return resp

if __name__ == "__main__":
    app.run(debug = True, port=3000)