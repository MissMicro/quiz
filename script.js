var container;
var nextBtn = document.querySelector('#next');
var checkBtn = document.querySelector('#check-answer');

var questionsUrl = 'pytania.json';
var requestQuestions = new XMLHttpRequest();

var toShow = [1];
var contentArray = [];

function createArray(jsonObj) {

    var allQuestions = jsonObj['general'];

    for (let r = 0; r < allQuestions.length; r++) {

        var questionJSON = allQuestions[r].question;
        var optionsJSON = allQuestions[r].options;
        var answerJSON = allQuestions[r].answer;
        var tempAr = [];
        var tempAr2 = [];
        for (let o = 0; o < optionsJSON.length; o++) {
            tempAr.push(optionsJSON[o]);
        }
        for (let a = 0; a < answerJSON.length; a++) {
            tempAr2.push(answerJSON[a]);
        }

        contentArray.push({question: questionJSON, answers: tempAr, correct: tempAr2});
    }
    console.log(contentArray);
}

function showContent(type) {

    container = document.getElementById(type);

    for (let i = 0; i < contentArray.length; i++) {
        if (type === 'questions') {
            var element = document.createElement('h3');
            element.setAttribute("id", "q" + i);
            element.textContent = contentArray[i].question;

        } else if (type === 'answers') {
            var element = document.createElement('div');
            element.setAttribute("id", "a" + i);

            for (let j = 0; j < contentArray[i].answers.length; j++) {
                var element2 = document.createElement('p');
                element2.textContent = contentArray[i].answers[j];
                element.appendChild(element2);
            }
            container.appendChild(element);

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
        for (let j = 0; j < contentArray.length - 1; j++) {
            toShow.push(0);
        }
    }
}

function getNextQuestion() {

    var qElements = [];
    var aElements = [];

    for (let i = 0; i < contentArray.length; i++) {
        qElements.push(document.getElementById("q" + i));
        aElements.push(document.getElementById("a" + i));
    }
    for (let i = 0; i < contentArray.length; i++) {

        if (toShow[i] == 1) {
            qElements[i].style.display =
                aElements[i].style.display = 'none';
            toShow[i] = 0;

            if (i == toShow.length - 1) {
                qElements[0].style.display =
                    aElements[0].style.display = 'block';
                toShow[0] = 1;
            } else {
                qElements[i + 1].style.display =
                    aElements[i + 1].style.display = 'block';
                toShow[i + 1] = 1;
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
        createArray(dataQuiz);
        showContent('questions');
        showContent('answers');

    };

    window.onload = function () {
    };


});

