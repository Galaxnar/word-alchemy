function displayText() {
  var textInput = document.getElementById("textInput").value;
  var displayArea = document.getElementById("displayArea");

  // Clear previous content
  //displayArea.innerHTML = "";

  // Split the text into individual lines
  var lines = textInput.split("\n");

  // Display each line in order
  lines.forEach(function (line) {
    var p = document.createElement("p");
    p.textContent = line;
    displayArea.appendChild(p);
  });
}

function checkFileExistence() {
  var textInput = document.getElementById("textInput").value;
  textInput = ((textInput.toLowerCase()).trimStart()).trimEnd();
  //var filePath = 'https://raw.githubusercontent.com/Galaxnar/word-alchemy/main/synonymes/Afrique';
  var filePath = 'https://raw.githubusercontent.com/Galaxnar/word-alchemy/main/synonymes/' + textInput;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', filePath, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        console.log('File exists.');
        //console.log('File content:', xhr.responseText);
        //var words = xhr.responseText.split('\n'); // Assuming each word is on a new line
        //document.getElementById("tentative").textContent = checkIfSynonyme(getLastWord(document.getElementById("tentative").textContent), xhr);
        if (checkIfSynonyme(getLastWord(document.getElementById("tentative").textContent), xhr) == true) {
          var displayText = document.getElementById("tentative").textContent + ' -> ' + textInput; // Concatenate current textInput with existing content
          document.getElementById("tentative").textContent = displayText;

          var data = JSON.parse(xhr.responseText);
          var synonyms = data.entries[0].synonyms;

          var synonymsList = document.getElementById('synonymsList');
          synonymsList.innerHTML = ''; // Clear previous results
          synonyms.forEach(synonym => {
            var listItem = document.createElement('li');
            listItem.textContent = synonym;
            synonymsList.appendChild(listItem);
          });

          niveauSelectionne = parseInt((document.getElementById("contenu").textContent).replace(/\D/g, ''));
          if (textInput == getMotFinal(niveauSelectionne).toLowerCase()) { //si la bonne reponse
            //var centerContainer = document.createElement("div");
            //centerContainer.classList.add("center-container");

            const winningMessage = document.getElementById('winning-message');
            winningMessage.style.display = 'block';
          }
        }

      } else {
        console.log('File does not exist or cannot be accessed.');
      }
    }
  };
  xhr.send();
}


function getLastWord(text) {
  var wordsArray = text.split(' -> ');
  return wordsArray[wordsArray.length - 1];
}

function checkIfSynonyme(motPrecedent, nouveauMot_xhr) {

  var nouveauMot_data = JSON.parse(nouveauMot_xhr.responseText);
  var synonyms = nouveauMot_data.entries[0].synonyms;
  var motEstSynonyme = isTextInSynonyms(motPrecedent, synonyms);
  return motEstSynonyme;
}

function isTextInSynonyms(text, synonyms) {

  for (var i = 0; i < synonyms.length; i++) {
    if (synonyms[i] === text.toLowerCase()) {
      return true;
    }
  }
  return false;
}


function searchWord() {
  var searchInput = document.getElementById("textInput").value;
  var apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`;
  var p = document.createElement("p");
  p.textContent = apiUrl;
  displayArea.appendChild(p);
  //var apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/cat`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      var meanings = data[0].meanings;
      var synonymsList = document.getElementById('synonymsList');
      synonymsList.innerHTML = ''; // Clear previous results

      meanings.forEach(meaning => {
        meaning.definitions.forEach(definition => {
          definition.synonyms.forEach(synonym => {
            var listItem = document.createElement('li');
            listItem.textContent = synonym;
            synonymsList.appendChild(listItem);
          });
        });
      });
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

function changeColorConfetti() {
  const confettiElements = document.querySelectorAll(".confetti");
  confettiElements.forEach(function (confetti) {
    confetti.style.backgroundColor = getRandomColor();
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

document.addEventListener('DOMContentLoaded', function () {
  const niveauxContainer = document.getElementById('niveaux-container');
  const listeDeNiveaux = ['1', '2', '3', '4'];
  // Générer les boîtes de niveaux en fonction de la liste de niveaux
  listeDeNiveaux.forEach(niveau => {
    const divNiveau = document.createElement('div');
    divNiveau.classList.add('niveau');
    divNiveau.textContent = niveau;
    divNiveau.dataset.niveau = niveau;
    divNiveau.addEventListener('click', function () {
      const niveauSelectionne = this.dataset.niveau;
      chargerDonnees(niveauSelectionne);
    });
    niveauxContainer.appendChild(divNiveau);
  });

  var heading = document.createElement("h1");
  heading.textContent = "Vous avez gagné!";

  var confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti-container");

  for (var i = 0; i < 8; i++) {
    var confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confettiContainer.appendChild(confetti);
  }

  centerContainer = document.getElementById("winning-message");
  centerContainer.appendChild(heading);
  centerContainer.appendChild(confettiContainer);

  //document.body.appendChild(centerContainer);

  changeColorConfetti();
});

function chargerDonnees(niveau) {
  console.log('Niveau :', niveau);
  document.getElementById('contenu').innerHTML = 'Niveau : ' + niveau;

  const motDeDepart = document.getElementById('motDeDepart');
  motDeDepart.textContent = "Mot de départ: " + getMotInitial(niveau);

  const motFinal = document.getElementById('motFinal');
  motFinal.textContent = "Mot final: " + getMotFinal(niveau);

  const parcours = document.getElementById('parcours');
  parcours.textContent = "Parcours:";

  const tentative = document.getElementById('tentative');
  tentative.textContent = getMotInitial(niveau);

  const synonymesInfo = document.getElementById('SynonymesInfo');
  synonymesInfo.textContent = "Synonyme(s) du dernier mot:";

  const elementsPourJouer = document.getElementById('elementsPourJouer');
  elementsPourJouer.style.display = 'block';

  const winningMessage = document.getElementById('winning-message');
  winningMessage.style.display = 'none';

  const textInput = document.getElementById('textInput');
  textInput.value = "";


  const synonymsList = document.getElementById('synonymsList');
  //synonymsList.textContent = "";

  var motAChercher = ((getMotInitial(niveau).toLowerCase()).trimStart()).trimEnd();
  //var filePath = 'https://raw.githubusercontent.com/Galaxnar/word-alchemy/main/synonymes/Afrique';
  var filePath = 'https://raw.githubusercontent.com/Galaxnar/word-alchemy/main/synonymes/' + motAChercher;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', filePath, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status == 200) {
        console.log('File exists.');
          var data = JSON.parse(xhr.responseText);
          var synonyms = data.entries[0].synonyms;

          synonymsList.innerHTML = ''; // Clear previous results
          synonyms.forEach(synonym => {
            var listItem = document.createElement('li');
            listItem.textContent = synonym;
            synonymsList.appendChild(listItem);
          });
        

      } else {
        console.log('File does not exist or cannot be accessed.');
      }
    }
  };
  xhr.send();
}

  function getMotInitial(niveau) {
    motInitial = ['Chat', 'Rire','Bateau','Rue'];
    return motInitial[niveau - 1];
  }

  function getMotFinal(niveau) {
    motFinal = ['Carnassier', 'Soumettre','Artère','Gorge'];
    return motFinal[niveau - 1];
  }

  function getNbrEtapes(niveau) {
    nbrEtapes = [4, 4, 4, 3];
    return nbrEtapes[niveau - 1];
  }

  function getSolution(niveau) {
    solution = [
      ['Chat', "Félin", 'Lion', 'Carnassier'],
      ['Rire', 'Tordre', 'Plier', 'Soumettre'],
      ['Bateau', 'Navire', 'Vaisseau', 'Artère'],
      ['Rue', 'Passage', 'Gorge']
    ];
    return solution[niveau - 1];
  }