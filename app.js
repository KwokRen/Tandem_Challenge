let request = new XMLHttpRequest();
request.open("GET", "./Apprentice_TandemFor400_Data.json", false);
request.send(null)
let triviaQuestions = JSON.parse(request.responseText);

console.log(triviaQuestions);