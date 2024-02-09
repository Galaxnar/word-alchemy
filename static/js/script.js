function displayText() {
    var textInput = document.getElementById("textInput").value;
    var displayArea = document.getElementById("displayArea");

    // Clear previous content
    //displayArea.innerHTML = "";

    // Split the text into individual lines
    var lines = textInput.split("\n");

    // Display each line in order
    lines.forEach(function(line) {
        var p = document.createElement("p");
        p.textContent = line;
        displayArea.appendChild(p);
    });
}

function checkFileExistence() {
    var textInput = document.getElementById("textInput").value;
    var filePath = 'https://raw.githubusercontent.com/Galaxnar/word-alchemy/main/synonymes/Afrique';

    var xhr = new XMLHttpRequest();
    xhr.open('GET', filePath, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
          console.log('File exists.');
          console.log('File content:', xhr.responseText);
          var p = document.createElement("p");
          p.textContent = 'YES';
          displayArea.appendChild(p);
        } else {
          console.log('File does not exist or cannot be accessed.');
        }
      }
    };
    xhr.send();
    
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