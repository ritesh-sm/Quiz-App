const startButton = document.getElementById('start-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const nextButton = document.getElementById('next-btn')

const answerButtonsElement = document.getElementById('answer-buttons')
let shuffledQuestion, currentQuestionIndex

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    questionContainerElement.classList.remove('hide')
    shuffledQuestion = questions.sort(()=> Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion()
}

function setNextQuestion() {

    resetState()
    showQuestion(shuffledQuestion[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    });

}

function selectAnswer(e){
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => setStatusClass(button, button.dataset.correct))

    if(shuffledQuestion.length > currentQuestionIndex +1){
        nextButton.classList.remove('hide')
    }
    else{
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}



function setStatusClass(element, correct){
    clearStatusClass(element)
    if(correct){
        element.classList.add('correct')
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element, correct){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 2+2?',
        answers: [
            { text:'4', correct: true},
            { text:'22', correct: false}
        ]
    },
    {
        question: 'Is Covid-19 Pandemic driving us to drink more?',
        answers: [
            { text:'Yes', correct: true},
            { text:'No', correct: false}
        ]
    }
]

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}