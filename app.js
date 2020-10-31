let request = new XMLHttpRequest();
request.open("GET", "./Apprentice_TandemFor400_Data.json", false);
request.send(null)
let triviaQuestions = JSON.parse(request.responseText);

let randomIndex = Math.floor(Math.random() * triviaQuestions.length)
let counter = 0

// console.log(triviaQuestions[randomIndex]);

// for every question in the Array, display it on the page one by one randomly
// every question will have the correct answer and the incorrect answers
// radio buttons for each of the questions
// if the value of the input field (radio button) is correct, then counter += 1
// In the end, display message about score and percentage
// Try again button to refresh page

let alreadyAnswered = {}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

let shuffledQuestions = shuffle(triviaQuestions)

let questionSelector = () =>  {
    for (let i = 0; i < shuffledQuestions.length; i++){
        let $div = (`<div>${shuffledQuestions[i].question}</div>`)
        if (alreadyAnswered[`${shuffledQuestions[i].question}`]) {
            continue
        } else {
            $(".question-container").append($div)
            alreadyAnswered[`${shuffledQuestions[i].question}`] = 1
            break;
        }
    }
}

$(".begin").on('click', questionSelector);
$(".begin").on('click', () => {
    $(".next").addClass('show')
    $(".begin").addClass('hidden')
});
$(".next").on('click', questionSelector);