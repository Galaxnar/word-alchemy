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