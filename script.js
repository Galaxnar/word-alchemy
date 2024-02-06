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
