// Define a variable to store the highest score.
let highestScore = localStorage.getItem("highestScore") || 0;
let highestScoreInitials = localStorage.getItem("highestScoreInitials") || "N/A";



const startButton = document.getElementById("start-button");
const quizContainers = document.querySelectorAll(".quiz-container");
const questionElements = document.querySelectorAll(".question");
const answerButtons = document.querySelectorAll(".answer-button");
const gameOverContainer = document.querySelector(".game-over");
const finalScoreElement = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const saveScoreButton = document.getElementById("save-score");
const correctScoreElement = document.getElementById("correct");
const wrongScoreElement = document.getElementById("wrong");
const timerElement = document.getElementById("timer");
const timeLeftElement = document.getElementById("time-left");
const highestScoreElement = document.getElementById("highest-score");
const highestScoreInitialsElement = document.getElementById("highest-score-initials");

let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let timeLeft = 75; // Set your desired initial time limit (in seconds)

startButton.addEventListener("click", startQuiz);
saveScoreButton.addEventListener("click", saveHighScore);

function startQuiz() {
    startButton.classList.add("hide");
    timerElement.classList.remove("hide");
    quizContainers[0].classList.remove("hide");
    setNextQuestion();
    startTimer();
}

function startTimer() {
    const timerInterval = setInterval(function () {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElements[0].innerText = question.question;
    question.answers.forEach((answer, index) => {
        answerButtons[index].innerText = answer;
    });
}

function resetState() {
    answerButtons.forEach(button => {
        button.classList.remove("correct");
        button.classList.remove("wrong");
    });
}

answerButtons.forEach(button => {
    button.addEventListener("click", selectAnswer);
}
);

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function resetState() {
    // Clear the classes and enable all answer buttons
    answerButtons.forEach(button => {
        button.classList.remove("correct", "wrong");
        button.disabled = false;
    });
}

answerButtons.forEach(button => {
    button.addEventListener("click", selectAnswer);
});

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = questions[currentQuestionIndex].correctIndex;

    // Check if the selected answer is correct
    if (selectedButton.innerText === questions[currentQuestionIndex].answers[correct]) {
        selectedButton.classList.add("correct");
        score += 10;
        correctAnswers++;
    } else {
        selectedButton.classList.add("wrong");
        timeLeft -= 10;
        wrongAnswers++;
    }

    // Disable all answer buttons to prevent further clicks
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    // Proceed to the next question or end the game
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            setNextQuestion();
        } else {
            endGame();
        }
    }, 1000);
     // Display the highest score
     highestScoreElement.textContent = highestScore;
}

function endGame() {
    quizContainers.forEach(container => container.classList.add("hide"));
    gameOverContainer.classList.remove("hide");
    finalScoreElement.innerText = score;
    correctScoreElement.innerText = correctAnswers;
    wrongScoreElement.innerText = wrongAnswers;
}

function saveHighScore() {
    const initials = initialsInput.value.trim();
    if (initials !== "") {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        const newScore = {
            score: score,
            initials: initials
        };
        highScores.push(newScore);

        // Save high scores to local storage
        localStorage.setItem("highScores", JSON.stringify(highScores));
        
        // Redirect to the high scores page
        window.location.href = "highscores.html";
    } else {
        alert("Please enter your initials.");
    }
}





const questions = [
    {
        question: "What is JavaScript?",
        answers: ["1. A type of coffee", "2. A programming language", "3. A type of bread", "4. A city in Japan"],
        correctIndex: 1
    },
    {
        question: "What is the correct way to write an array?",
        answers: ["1. var array = [1, 2, 3]", "2. var array = 1, 2, 3", "3. var array = (1, 2, 3)", "4. var array = 1 2 3"],
        correctIndex: 0
    },
    {
        question: "What is the correct way to write a function?",
        answers: ["1. function = myFunction()","2. function myFunction()", "3. function:myFunction()", "4. function.myFunction()"],
        correctIndex: 1
    },
    {
        question: "What is the correct way to write an object?",
        answers: ["1. var object = {name: 'John', age: 30}", "2. var object = [name: 'John', age: 30]", "3. var object = 'John', 30", "4. var object = 'John', '30'"],
        correctIndex: 0
    },
    {
        question: "What is the correct way to write a for loop?",
        answers: ["1. for (i = 0; i < 5; i++)", "2. for (i = 0; i < 5)", "3. for (i < 5; i++)", "4. for (i < 5)"],
        correctIndex: 0
    }
];







