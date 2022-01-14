
const question = document.getElementById('question')
const choices = document.getElementsByClassName("choice-text");
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let currentQuestion = {};

let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Web Axios, get questions from the links

axios.get ("https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple")
    .then(res => {
        return res.data;
    }).then(loadedQuestions => {
        questions = loadedQuestions.results.map(loadedQuestion =>{
            const formattedQuestion = {
                question : loadedQuestion.question
            };
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random()* 3) + 1;
            answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer)

            answerChoices.forEach((choice,index) =>{
                formattedQuestion["choice" + (index +1)] = choice;
            })

            return formattedQuestion;
        })
        // questions = loadedQuestions;
        startGame();
    })
    .catch(err => {
        // console.error(err);
    });
        

const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
        if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS ){
            localStorage.setItem('mostRecentScore', score);
            return window.location.assign('./end.html');
        }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question;

        Array.from(choices).forEach (choice => {
            const number = choice.dataset["number"];
            choice.innerText = currentQuestion["choice" + number];

        });

        availableQuestions.splice(questionIndex, 1);
        
        acceptingAnswers = true;
};

Array.from(choices).forEach (choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        console.log(classToApply)

        if(classToApply == 'correct') {
            addScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
        

    });
});

addScore = num => {
    score += num;
    scoreText.innerText = score;
}

