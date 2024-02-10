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

          synonyms.forEach(synonym => {
            var listItem = document.createElement('li');
            listItem.textContent = synonym;
            synonymsList.appendChild(listItem);
          });


          if (textInput == "fauve") { //si la bonne reponse
            //var centerContainer = document.createElement("div");
            //centerContainer.classList.add("center-container");

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

document.addEventListener("DOMContentLoaded", function () {

});

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