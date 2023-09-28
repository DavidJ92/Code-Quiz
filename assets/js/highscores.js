// highscores.js

// Retrieve high scores from local storage
const highScoresList = document.getElementById("high-scores-list");
const goBackButton = document.getElementById("go-back");

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// Sort high scores by score in descending order
highScores.sort((a, b) => b.score - a.score);

// Display only the top 5 high scores
const top5HighScores = highScores.slice(0, 1);

// Display high scores in the list
top5HighScores.forEach((scoreObj, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `Initials: ${scoreObj.initials} - Score: ${scoreObj.score}`;
    highScoresList.appendChild(listItem);
});

// Go back to the quiz when the "Go Back" button is clicked
goBackButton.addEventListener("click", () => {
    window.location.href = "index.html"; // Change this to the actual name of your quiz HTML file
});
