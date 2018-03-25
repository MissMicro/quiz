'use strict';

var questionContainer = document.querySelector('.question');
var answersContainer = document.querySelector('.answers');
var nextBtn = document.querySelector('#next');
var checkBtn = document.querySelector('#check-answer');

var questionsUrl = 'pytania.json';
var requestQuestions = new XMLHttpRequest();

var questionsArray = [];
var answersArray = [];
var toShow = [1];

function showQuestions(jsonObj) {

    var allQuestions = jsonObj['general'];
    var a = 0;
    for (var i = 0; i < allQuestions.length; i++) {
        var qest = document.createElement('h3');

        qest.setAttribute("class", "question-list");
        qest.setAttribute("id", "q" + i);
        if (i >= 1) {
            qest.setAttribute("class", "hide");
        }
        questionsArray.push("q" + i); //length of array is number all of questions
        qest.textContent = jsonObj['general'][i].question;
        questionContainer.appendChild(qest);
    }

    for (var j = 0; j < questionsArray.length - 1; j++) {
        toShow.push(0);
    }
}

function showAnswers(jsonObj) {

    var allQuestions = jsonObj['general'];

    for (var i = 0; i < allQuestions.length; i++) {
        var answ = document.createElement('p');

        answ.setAttribute("class", "answers-list");
        answ.setAttribute("id", "a" + i);
        if (i >= 1) {
            answ.setAttribute("class", "hide");
        }
        answersArray.push("a" + i);
        answ.textContent = jsonObj['general'][i].options;
        answersContainer.appendChild(answ);
    }
}

function nextQuestion() {

    var qElements = [];
    var aElements = [];
    for (var i = 0; i < questionsArray.length; i++) {
        qElements.push(document.getElementById(questionsArray[i]));
        aElements.push(document.getElementById(answersArray[i]));
    }
    for (var _i = 0; _i < questionsArray.length; _i++) {

        if (toShow[_i] == 1) {
            qElements[_i].style.display = aElements[_i].style.display = 'none';
            toShow[_i] = 0;

            if (_i == toShow.length - 1) {
                qElements[0].style.display = aElements[0].style.display = 'block';
                toShow[0] = 1;
            } else {
                qElements[_i + 1].style.display = aElements[_i + 1].style.display = 'block';
                toShow[_i + 1] = 1;
            }
            break;
        }
    }
}

$(document).ready(function () {

    requestQuestions.open('GET', questionsUrl);

    requestQuestions.responseType = 'json';
    requestQuestions.send();

    requestQuestions.onload = function () {
        var questions = requestQuestions.response;
        showQuestions(questions);
        showAnswers(questions);
    };

    window.onload = function () {};
});
//# sourceMappingURL=script.js.map