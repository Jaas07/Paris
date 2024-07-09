document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const answers = {
        question1: event.target.question1.value.trim().toLowerCase(),
        question2: event.target.question2.value.trim().toLowerCase(),
        question3: event.target.question3.value.trim().toLowerCase(),
        question4: event.target.question4.value.trim().toLowerCase(),
        question5: event.target.question5.value.trim().toLowerCase()
    };
    
    //respuestas correctas
    const correctAnswers = {
        question1: 'paris',
        question2: 'coq au vin',
        question3: '1789',
        question4: 'leonardo da vinci',
        question5: 'loire'
    };
    
    let score = 0;
    for (let key in answers) {
        if (answers[key] === correctAnswers[key]) {
            score++;
        }
    }
    
    document.getElementById('result').innerHTML = `Gracias ${username}, obtuviste una puntuación de ${score}/5.`;

     // Enviar los datos a la base de datos
     fetch('http://localhost:3000/save-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, score })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
});
