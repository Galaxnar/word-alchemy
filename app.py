from flask import Flask, render_template, request
import os
import json

app = Flask(__name__)

@app.route('/')

def index():
    return render_template("index.html")

@app.route('/test', methods=['POST'])
def test():
    print("BIG BRAIN tesT")
    mot = request.form['textInput']
    mot2 = request.form['textInput2']
    print(mot)
    print(mot2)

    #recherche dans le dictionnaire
    files = os.listdir('synonymes')
    motTrouve = False
    synonymeBon = False
    reponse2="Le synonyme est BAD"
    for file in files:
        if mot.rstrip() == file:

            reponse = "Le mot est bon"
            motTrouve=True
            
            # Construct full file path
            file_path = os.path.join('synonymes', file)

            # Read the JSON file
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)

            # Extract synonyms
            synonyms = []
            for entry in data['entries']:
                synonyms.extend(entry['synonyms'])
                print(entry['synonyms'])


            for each in synonyms:
                if each == mot2:
                    synonymeBon=True
                    reponse2="Le synonyme est bon ! Bravo"
            break

    if motTrouve==False:
        reponse= "le mot est BAD"
        

    return render_template("index.html", mot=reponse, mot2=mot2, texte=mot, synonyme=reponse2)





if __name__ == '__main__':
    app.run(debug=True)
