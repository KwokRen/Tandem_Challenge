let request = new XMLHttpRequest();
request.open("GET", "./Apprentice_TandemFor400_Data.json", false);
request.send(null)
let triviaQuestions = JSON.parse(request.responseText);

let randomIndex = Math.floor(Math.random() * triviaQuestions.length)

// console.log(triviaQuestions[randomIndex]);

// every question will have the correct answer and the incorrect answers
// radio buttons for each of the questions
// if the value of the input field (radio button) is correct, then counter += 1
// In the end, display message about score and percentage

let alreadyAnswered = {}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

let shuffledQuestions = shuffle(triviaQuestions)
console.log(shuffledQuestions);

let questionSelector = () =>  {
    let counter = 0
    for (let i = 0; i < 10; i++){
        if (i !== 9) {
            let index = i
            let $questionDiv = $("<div>").addClass('question-div')
            $questionDiv.addClass(`${i}`).text(`${shuffledQuestions[i].question}`)
            if (alreadyAnswered[`${shuffledQuestions[i].question}`]) {
                continue
            } else {
                let choices = shuffledQuestions[i].incorrect
                choices.push(shuffledQuestions[i].correct)
                let shuffledChoices = shuffle(choices);
                console.log(shuffledChoices.length);
                for (let i = 0; i < shuffledChoices.length; i++){
                    console.log(i)
                    $(".question-choices-container")
                    $(".question-choices-container")
                    .append($(".question-choices")
                    .append(`<input type="radio" name="${shuffledQuestions[index].question}" id="${shuffledChoices[i]}" value="${shuffledChoices[i]}">`)
                    .append(`<label for="${shuffledChoices[i]}">${shuffledChoices[i]}<label>`))
                }
                $(".question-container").append($questionDiv)
                alreadyAnswered[`${shuffledQuestions[i].question}`] = 1
                break;
            }
        } else {
            let $resultsDiv = $("<div>")
            $resultsDiv.text('Finish')
            console.log($resultsDiv)
            $(".results-div").append($resultsDiv)
            $(".next").removeClass('show');
            $(".try-again").addClass('show');
        }
    }
}



$(".begin").on('click', questionSelector);
$(".begin").on('click', () => {
    // $(".next").addClass('show')
    $(".submit").addClass('show');
    $(".begin").addClass('hidden')
});
$(".next").on('click', () => {
    $(".question-choices").find('input').remove();
})
$(".next").on('click', () => {
    $(".question-choices").find('label').remove();
})
$(".next").on('click', questionSelector);
$(".next").on('click', () => {
    $(".question-container").find('.question-div').first().remove();
})
$(".try-again").on('click', () => {
    location.reload();
})