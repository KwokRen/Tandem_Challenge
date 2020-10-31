let request = new XMLHttpRequest();
request.open("GET", "./Apprentice_TandemFor400_Data.json", false);
request.send(null)
let triviaQuestions = JSON.parse(request.responseText);

let randomIndex = Math.floor(Math.random() * triviaQuestions.length)

let alreadyAnswered = {}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}

let shuffledQuestions = shuffle(triviaQuestions)
// console.log(shuffledQuestions);
let $resultsDiv = $("<div>")
let counter = 0;

let questionSelector = () =>  {
    for (let i = 0; i < 11; i++){
        console.log(i)
        if (i !== 10) {
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
                    .append($(".question-choices").append(
                    $("<div>").addClass('label-input')
                    .append(`<input type="radio" name="${shuffledQuestions[index].question}" id="${shuffledChoices[i]}" value="${shuffledChoices[i]}">`)
                    .append(`<label for="${shuffledChoices[i]}">${shuffledChoices[i]}<label>`)))
                }
                const checkAnswer = () => {
                    if ($(`input[name="${shuffledQuestions[index].question}"]:checked`).val() === `${shuffledQuestions[i].correct}`) {
                        counter += 1
                        if (counter !== 1) {
                            $resultsDiv.text(`You are correct! You have recieved 1 point. You now currently have ${counter} points.`)
                            $(".results-div").append($resultsDiv)
                        } else {
                            $resultsDiv.text(`You are correct! You have recieved 1 point. You now currently have ${counter} point.`)
                            $(".results-div").append($resultsDiv)
                        }
                    } else {
                        if (counter !== 1) {
                            $resultsDiv.text(`You are incorrect. The correct answer is ${shuffledQuestions[i].correct}. You have recieved 0 points. You still have ${counter} points.`)
                            $(".results-div").append($resultsDiv)
                        } else {
                            $resultsDiv.text(`You are incorrect. The correct answer is ${shuffledQuestions[i].correct}. You have recieved 0 points. You still have ${counter} point.`)
                        $(".results-div").append($resultsDiv)
                        }
                    }
                }
                $(".submit").on('click', checkAnswer);
                $(".question-container").append($questionDiv)
                alreadyAnswered[`${shuffledQuestions[i].question}`] = 1
                break;
            }
        } else {
            let results;
            if (counter === 1) {
                results = `You got ${counter} point. You got ${(counter/10)*100}% right. You should try again.`
            } else if (counter <= 5) {
                results = `You got ${counter} points. You got ${(counter/10)*100}% right. You should try again.`
            } else if (counter === 10) {
                results = `You got ${counter} points. You got ${(counter/10)*100}% right. Fantastic job! You got them all correct.`
            } else {
                results = `You got ${counter} points. You got ${(counter/10)*100}% right. Good job!`
            }
            $resultsDiv.text(results)
            $(".final").append($resultsDiv)
            $(".next").removeClass('show');
            $(".try-again").addClass('show');
            $(".submit").removeClass('show');
        }
    }
}

$(".begin").on('click', questionSelector);
$(".begin").on('click', () => {
    // $(".next").addClass('show')
    $(".submit").addClass('show');
    $(".begin").addClass('hidden')
});
$(".submit").on('click', () => {
    $(".next").addClass('show');
    $(".submit").removeClass('show');
    $(".results-div").removeClass('hidden');
})
$(".next").on('click', () => {
    $(".question-choices").find('input').remove();
    $(".next").removeClass('show');
    $(".submit").addClass('show');
    $(".results-div").addClass('hidden');
})
$(".next").on('click', () => {
    $(".question-choices").find('.label-input').remove();
})
$(".next").on('click', questionSelector);
$(".next").on('click', () => {
    $(".question-container").find('.question-div').first().remove();
})
$(".try-again").on('click', () => {
    location.reload();
})