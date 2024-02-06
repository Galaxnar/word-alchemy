from flask import Flask, render_template, request
import os

app = Flask(__name__)

@app.route('/')

def index():
    return render_template("index.html")

@app.route('/test', methods=['POST'])
def test():
    print("BIG BRAIN tesT")
    mot = request.form['textInput']
    print(mot)

    #recherche dans le dictionnaire
    files = os.listdir('synonymes')
    motTrouve = False
    for file in files:
        if mot in file:
            print("Le mot est bon")
            motTrouve=True
            break
    if motTrouve==False:
        print("le mot est BAD")
        

    return render_template("index.html")





if __name__ == '__main__':
    app.run(debug=True)
