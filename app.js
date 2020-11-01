// Grabbing the data from the JSON file
let request = new XMLHttpRequest();
request.open("GET", "./Apprentice_TandemFor400_Data.json", false);
request.send(null)
let triviaQuestions = JSON.parse(request.responseText);
// Variable created to grab a random question
let randomIndex = Math.floor(Math.random() * triviaQuestions.length)
// Object created to store questions that were already shown so there would be no duplicate questions
let alreadyAnswered = {}
// Function created to shuffle the array so the questions are out of order
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr
}
// Storing the shuffled questions in a variable
let shuffledQuestions = shuffle(triviaQuestions)
let $resultsDiv = $("<div>")
// Initializing counter to capture the points a user has scored
let counter = 0;
// Function to generate question onto the page, and the multiple choices
let questionSelector = () =>  {
    // For loop to go through 10 questions (as per requirements)
    for (let i = 0; i < 11; i++){
        // As long as the current iteration is not the tenth one, generate a question after clicking next
        if (i !== 10) {
            let index = i
            let $questionDiv = $("<div>").addClass('question-div')
            $questionDiv.addClass(`${i}`).text(`${shuffledQuestions[i].question}`)
            // If the question is already inside the object alreadyAnswered, then you would continue with the loop to grab a question
            if (alreadyAnswered[`${shuffledQuestions[i].question}`]) {
                continue
            } else {
                // If the question is not inside the object alreadyAnswered, then generate it to the page and add it to the object so it will not be duplicated in the future
                // Creating a variable that stores both the incorrect and correct data from the JSON object
                let choices = shuffledQuestions[i].incorrect
                choices.push(shuffledQuestions[i].correct)
                // Shuffling the choices to randomize
                let shuffledChoices = shuffle(choices);
                // For each of the questions, append with a radio button and label
                for (let i = 0; i < shuffledChoices.length; i++){
                    console.log(i)
                    $(".question-choices-container")
                    $(".question-choices-container")
                    .append($(".question-choices").append(
                    $("<div>").addClass('label-input')
                    .append(`<input type="radio" name="${shuffledQuestions[index].question}" id="${shuffledChoices[i]}" value="${shuffledChoices[i]}">`)
                    .append(`<label for="${shuffledChoices[i]}">${shuffledChoices[i]}<label>`)))
                }
                // Function to check whether the answer selected by user is correct or incorrect
                const checkAnswer = () => {
                    if ($(`input[name="${shuffledQuestions[index].question}"]:checked`).val() === `${shuffledQuestions[i].correct}`) {
                        // If the answer is correct, then the counter will increase by one
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
                // The function will run when the user clicks the submit button
                $(".submit").on('click', checkAnswer);
                $(".question-container").append($questionDiv)
                alreadyAnswered[`${shuffledQuestions[i].question}`] = 1
                break;
            }
        } else {
            // If the iteration of the loop is at 10, then the user would have answered 10 questions and the results will appear at the end along with a try again button to refresh the trivia.
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