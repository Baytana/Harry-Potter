
const test=async ()=>{
    try{
        const response= await fetch('../data/test.json')
        const DATA=await response.json()

        let localResults = {};
        let correctAnswersCount=0
        let startTime;
        let timerInterval

        const quiz = document.getElementById('quiz');
        const questions = document.getElementById('questions');
        const indicator = document.getElementById('indicator');
        const results = document.getElementById('results');
        const btnNext = document.getElementById('btn-next');
        const btnRestart = document.getElementById('btn-restart');
        const btnStart=document.getElementById('btn-start')
        const timer = document.getElementById('timer');



        const renderQuestions = (index) => {
            renderIndicator(index + 1);
            questions.dataset.currentStep = index;
            const renderAnswers = () => DATA[index].answers
                .map((answer) => `
                    <li>
                       <label>
                           <input class="answer-input" type="radio" name="${index}" value="${answer.id}">
                           ${answer.value}
                       </label>
                    </li>
                `)
                .join('');

            questions.innerHTML = `
                <div class="quiz-questions-item">
                    <div class="quiz-questions-item__question">${DATA[index].question}</div>
                    <ul class="quiz-questions-item__answers">${renderAnswers()}</ul>
                </div>
            `;
        };

        const renderResults = () => {
            let content = '';

            const getClassname = (answer, questionIndex) => {
                let classname = '';
                if (!answer.correct && answer.id === localResults[questionIndex]) {
                    classname = 'answer--invalid';
                } else if (answer.correct) {
                    classname = 'answer--valid';
                }
                return classname;
            };
            const getAnswer = (questionIndex) => DATA[questionIndex].answers
                .map((answer) => `<li class="${getClassname(answer, questionIndex)}">${answer.value}</li>`)
                .join('');

            DATA.forEach((question, index) => {
                content += `
                    <div class="quiz-results-item">
                        <div class="quiz-results-item__question">${question.question}</div>
                        <ul class="quiz-results-item__answers">${getAnswer(index)}</ul>
                    </div>
                `;
            });
            results.innerHTML = content;
        };

        const renderIndicator = (currentStep) => {
            indicator.innerHTML = `${currentStep}/${DATA.length}`;
        };

        const startQuiz = () => {
            btnStart.classList.add('btn-start--hidden');
            renderQuestions(0);

            // Записываем время начала теста
            startTime = new Date();

            // Запускаем таймер
            startTimer();
        };

        const startTimer = () => {
            let elapsedSeconds = 0;
            const updateTimer = () => {
                elapsedSeconds = Math.floor((new Date() - startTime) / 1000);
                const minutes = Math.floor(elapsedSeconds / 60);
                const seconds = elapsedSeconds % 60;
                timer.innerText = `Время: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            };

            updateTimer(); // Обновляем таймер сразу, чтобы не было задержки

            timerInterval = setInterval(updateTimer, 1000);
        };
        const stopTimer = () => {
            clearInterval(timerInterval);
        };
        btnStart.addEventListener('click', startQuiz);


        quiz.addEventListener('change', (event) => {
            if (event.target.classList.contains('answer-input')) {
                localResults[event.target.name] = event.target.value;
                btnNext.disabled = false;
            }
        });

        quiz.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-next')) {
                const nextQuestionIndex = Number(questions.dataset.currentStep) + 1;

                if (DATA.length === nextQuestionIndex) {
                    stopTimer();

                    questions.classList.add('questions--hidden');
                    indicator.classList.add('indicator--hidden');
                    results.classList.add('results--visible');
                    btnNext.classList.add('btn-next--hidden');
                    btnRestart.classList.add('btn-restart--visible');
                    timer.classList.add('timer--hidden');

                    renderResults();

                    correctAnswersCount = Object.values(localResults).filter(value => value !== undefined)
                        .reduce((acc, val, idx) => acc + (DATA[idx].answers.find(ans => ans.id === val)?.correct ? 1 : 0), 0);

                    // Проверка времени завершения теста
                    const endTime = new Date();
                    const elapsedTime = Math.floor((endTime - startTime) / 1000); // в секундах

                    alert(`Тест завершен! Затрачено времени: ${elapsedTime} секунд.
                Правильных ответов: ${correctAnswersCount} из ${DATA.length}`);
                } else {
                    renderQuestions(nextQuestionIndex);
                }
                btnNext.disabled = true;
            }
            if (event.target.classList.contains('btn-restart')) {
                localResults = {};
                correctAnswersCount = 0;
                results.innerHTML = '';
                questions.classList.remove('questions--hidden');
                indicator.classList.remove('indicator--hidden');
                results.classList.remove('results--visible');
                btnNext.classList.remove('btn-next--hidden');
                btnRestart.classList.remove('btn-restart--visible');
                timer.classList.add('timer--hidden');
                renderQuestions(0);
                // Записываем время начала теста
                startTime = new Date();

                // Запускаем таймер
                startTimer();
            }
        });
    }catch (e){
        console.error(e)
    }
}
test()
// renderQuestions(0)

//STOPWATCH
//
// let interval
// let time=0
//
// const seconds=document.querySelector('#seconds')
// const startButton = document.querySelector('#start');
// const stopButton = document.querySelector('#stop');
// const resetButton = document.querySelector('#reset');
// const stopwatch=()=>{
//     // time++
//     clearInterval(interval)
//     interval=setInterval(()=>{
//
//         const minute=Math.floor(time/60)
//         const second=time%60
//         time++
//         seconds.innerHTML=`${padZero(minute)}:${padZero(second)}`
//     },1000)
// }
// startButton.onclick=()=>stopwatch()
// stopButton.onclick=()=>clearInterval(interval)
// resetButton.onclick=()=>{
//     clearInterval(interval)
//     time=0
//     seconds.innerHTML='00:00'
// }
// const padZero=(number)=>{
//     return number<10 ? `0${number}` : `${number}`
// }

//GMAIL

const emailInput=document.getElementById('gmail_input')
const result = document.getElementById('gmail_result');
const gmailButton=document.getElementById('gmail_button')
const email=emailInput.value.trim()

const gmailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/
gmailButton.onclick= ()=> {
    if (gmailRegex.test(email)){
        result.textContent = 'Valid'
        result.style.color='green'
        emailInput.style.borderColor='green'
        emailInput.style.color='green'

    }else{
        result.textContent = 'Invalid'
        result.style.color='red'
        emailInput.style.borderColor='red'
        emailInput.style.color='red'
    }
}

//PHONE----------------------------------------------------------------
const phoneInput= document.querySelector('#phone_input')
const phoneButton= document.querySelector('#phone_button')
const phoneResult= document.querySelector('#phone_result')

const regExp=/^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}/
phoneButton.onclick= () => {
    if(regExp.test(phoneInput.value)){
        phoneResult.innerHTML= 'Valid'
        phoneResult.style.color='green'
        phoneInput.style.borderColor='green'
        phoneInput.style.color= 'green'
    }else{
        phoneResult.innerHTML= 'Invalid'
        phoneResult.style.color='red'
        phoneInput.style.borderColor='red'
        phoneInput.style.color= 'red'
    }
}