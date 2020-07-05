const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
const { response } = require('express');

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

app.set('view engine','pug')
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  
const myQuestions = [
    {
      question: "How old is Adi?",
      answers: {
        a: "11",
        b: "16",
        c: "22"
      },
      correctAnswer: "b"
    },
    {
      question: "How Stupid is Adi?",
      answers: {
        a: "Not Stupid",
        b: "Little Stupid",
        c: "Extremely Stupid"
      },
      correctAnswer: "c"
    },
    {
      question: "How smart is Adi's dad?",
      answers: {
        a: "smart",
        b: "very smart",
        c: "extremely smart",
      },
      correctAnswer: "c"
    }
  ];
  

  function buildQuiz(){
    // variable to store the HTML output
    const output = [];
  
    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
  
        // variable to store the list of possible answers
        const answers = [];
  
        // and for each available answer...
        for(letter in currentQuestion.answers){
  
          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
  
        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );
  
    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }


  myQuestions.forEach( (currentQuestion, questionNumber) => {
    // the code we want to run for each question goes here
  });


  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');
  
    // keep track of user's answers
    let numCorrect = 0;
  
    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {
  
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;
  
        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });
  
    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  
  // Variables
//const quizContainer = document.getElementById('quiz');
//const resultsContainer = document.getElementById('results');
//const submitButton = document.getElementById('submit');

// Kick things off
buildQuiz();

// Event listeners
submitButton.addEventListener('click', showResults);
  