let question = document.getElementById('question');
let choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch('http://jservice.io/api/clues')
    .then(response => {
       return response.json() 
    }).then (data => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].category.id === 4) {
                questions.push(data[0,1,2,3,4]);
        }
    }
   
    startGame();
});
 



const CORRECT_Score = 100;
const MAX_QUESTIONS =  15;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return ('questions are finished')
    }
    
    questionCounter++;
    let questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        choice.innerText = currentQuestion['answer'];
    })

    availableQuestions.splice(questionIndex, 1);
};


choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        let selectedChoice = e.target;
        let selectedAnswer = selectedChoice.currentQuestion['answer'];

        getNewQuestion();
    });


});
