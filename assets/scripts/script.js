//Creating a new variable name from the element ID on the HTML
const startBtn = document.getElementById("start-btn");
const startPage = document.getElementById("start-screen");
const questionPage = document.getElementById("questions");
const questionBtns = document.getElementsByClassName("question-button");
const endPage = document.getElementById("end-screen");
const highscorelink = document.getElementById("highscore-btn");
const timerDiv = document.getElementById("timer");
const timerbtn = document.getElementById("timer1");
const correctAnswer = document.getElementById("correct");
const incorrectAnswer = document.getElementById("incorrect");

//Added questions using an objects array
const questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        title: "The condition in an if/else statement is enclosed within ______.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
    {
        title: "Arrays in JavaScript can be used to store _______.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above",
    },
    {
        title: "String values must be enclosed within _______ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes",
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log",
    },
];

const answers = [];
let userFinal = [{ initials: "", score: 0 }];
const userHighscores = [];
for (let i = 0; i < questions.length; i++) {
    answers.push(questions[i].answer)
}
let seconds = 75;
let questionIndex = 0;
let score = 0;

function startQuiz() {
    startPage.setAttribute("class", "hide");
    questionPage.removeAttribute("class");
    questionPage.setAttribute("class", "index");
    timerDiv.removeAttribute("style");

    setInterval(function timer() {
        timerbtn.innerHTML = "Time: " + seconds;
        seconds--;
        if (seconds === 0 || seconds < 0) {
            endQuiz();
        }
    }, 1000);

    renderQuestion(questionIndex)
}

function renderQuestion(num) {
    const question = questions[num];
    if (question) {
      const questionTitle = document.getElementById("question-title");
      const questionBtn0 = document.getElementById("question0");
      const questionBtn1 = document.getElementById("question1");
      const questionBtn2 = document.getElementById("question2");
      const questionBtn3 = document.getElementById("question3");
  
      questionTitle.innerHTML = question.title;
      questionBtn0.innerHTML = question.choices[0];
      questionBtn1.innerHTML = question.choices[1];
      questionBtn2.innerHTML = question.choices[2];
      questionBtn3.innerHTML = question.choices[3];
    }
  }

for (let i = 0; i < questionBtns.length; i++) {
    const button = questionBtns[i];
    button.addEventListener("click", () => {
        correctAnswer.setAttribute("class", "hide");
        incorrectAnswer.setAttribute("class", "hide");
        let answer = button.innerHTML;
        if (answers.includes(answer) === true) {
            correctAnswer.removeAttribute("class");
            hideFeedBack();

            if (questionIndex < questions.length) {
                questionIndex++
                renderQuestion(questionIndex);
            }
            else if (questionIndex === questions.length) {
                score += seconds;
                endQuiz();
            }
        }   else {
            incorrectAnswer.removeAttribute("class");
            hideFeedBack();

            if (questionIndex < questions.length) {
                questionIndex++
                seconds -= 10;
                renderQuestion(questionIndex);
            }
            else if (questionIndex === questions.length) {
                seconds -= 10;
                score += seconds;
                endQuiz();
            }
        }
    });
}

function hideFeedBack(){
    setTimeout(() => {
       correctAnswer.setAttribute("class","hide");
       incorrectAnswer.setAttribute("class","hide");
    }, 800);
}
 
function endQuiz() {
    let finalScore = document.getElementById("score");
    finalScore.innerHTML = score;

    questionPage.setAttribute("class", "hide");
    endPage.removeAttribute("class");
    endPage.setAttribute("class", "index");
    timerbtn.setAttribute("class", "hide");
    highscorelink.setAttribute("class", "hide");
}

const submitBtn = document.getElementById("submit-form");
submitBtn.addEventListener("click", function () {
  let initials = document.getElementById("initials").value;
  let pastScores = JSON.parse(localStorage.getItem("highscores")) || [];
  let highScore = { initials: initials, score: score };
  pastScores.push(highScore);
  localStorage.setItem("highscores", JSON.stringify(pastScores));
  displayHighscores();
});

function submitClear() {
    alert("All highscores have been cleared!");
    localStorage.clear();
    window.location.reload();
}

const goBackBtn = document.getElementById("go-back-btn");
goBackBtn.addEventListener("click", () => {
  window.location.href = "index.html";
});

function displayHighscores() {
    let pastScores = JSON.parse(localStorage.getItem("highscores")) || [];
    let highscoreList = document.getElementById("highscore-list");
    highscoreList.innerHTML = "";
    for (let i = 0; i < pastScores.length; i++) {
      let highscore = pastScores[i];
      let li = document.createElement("li");
      li.textContent = highscore.initials + " - " + highscore.score;
      highscoreList.appendChild(li);
    }
}

highscorelink.addEventListener("click", function () {
  startPage.setAttribute("class", "hide");
  questionPage.setAttribute("class", "hide");
  endPage.removeAttribute("class");
  highscorelink.setAttribute("class", "hide");
  timerbtn.setAttribute("class", "hide")
  displayHighscores();
});
