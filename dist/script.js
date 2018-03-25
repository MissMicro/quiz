'use strict';

var questionContainer = document.querySelector('.question');
var answersContainer = document.querySelector('.answers');
var container;
var nextBtn = document.querySelector('#next');
var checkBtn = document.querySelector('#check-answer');

var questionsUrl = 'pytania.json';
var requestQuestions = new XMLHttpRequest();

var questionsArray = [];
var answersArray = [];
var toShow = [1];

function showContent(jsonObj, type) {

    container = document.getElementById(type);
    var allQuestions = jsonObj['general'];

    for (var i = 0; i < allQuestions.length; i++) {
        if (type === 'questions') {
            var element = document.createElement('h3');
            element.setAttribute("id", "q" + i);
            questionsArray.push("q" + i); //length of array is number of all questions
            element.textContent = jsonObj['general'][i].question;
        } else if (type === 'answers') {
            var element = document.createElement('p');
            element.setAttribute("id", "a" + i);
            answersArray.push("a" + i);
            element.textContent = jsonObj['general'][i].options;
        } else {
            console.log('wrong type of content!');
        }
        element.setAttribute("class", type + "-list");
        if (i >= 1) {
            element.setAttribute("class", "hide");
        }
        container.appendChild(element);
    }

    if (type === 'questions') {
        for (var j = 0; j < questionsArray.length - 1; j++) {
            toShow.push(0);
        }
    } else if (type === 'answers') {
        var temp = document.querySelector('.answers-list');
        console.log(temp);
    }
}

function getNextQuestion() {

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
        var dataQuiz = requestQuestions.response;
        showContent(dataQuiz, 'questions');
        showContent(dataQuiz, 'answers');
    };

    window.onload = function () {};
});
//# sourceMappingURL=script.js.map