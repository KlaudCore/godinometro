/*
=================================
 GODINÓMETRO v1.0

 MOTOR DEL QUIZ

=================================
*/


// Variables del juego

let currentQuestion = 0;

let totalPoints = 0;

let answersSelected = [];



// Elementos HTML

const questionTitle = document.getElementById("question");

const answersContainer = document.getElementById("answers");

const questionNumber = document.getElementById("question-number");

const percentageText = document.getElementById("percentage");

const progressBar = document.getElementById("progress");




// Iniciar juego

loadQuestion();




// ===============================
// Cargar pregunta
// ===============================


function loadQuestion(){


    const question = questions[currentQuestion];


    questionTitle.textContent = question.question;


    questionNumber.textContent =
    `Pregunta ${currentQuestion + 1} de ${questions.length}`;



    updateProgress();



    answersContainer.innerHTML = "";



    question.answers.forEach((answer)=>{


        const button = document.createElement("button");


        button.classList.add("answer-btn");


        button.textContent = answer.text;



        button.onclick = ()=>{


            selectAnswer(answer.points);


        };



        answersContainer.appendChild(button);


    });


}




// ===============================
// Respuesta seleccionada
// ===============================


function selectAnswer(points){


    totalPoints += points;



    answersSelected.push({

        question:
        questions[currentQuestion].id,

        points:points

    });



    currentQuestion++;



    if(currentQuestion < questions.length){


        loadQuestion();


    }

    else{


        finishQuiz();


    }


}






// ===============================
// Barra progreso
// ===============================


function updateProgress(){


    const progress =
    (currentQuestion / questions.length) * 100;



    progressBar.style.width =
    `${progress}%`;



    percentageText.textContent =
    `${Math.round(progress)}%`;


}






// ===============================
// Terminar
// ===============================


function finishQuiz(){


    const maxPoints =
    questions.length * 10;



    const result =
    Math.round((totalPoints / maxPoints) * 100);



    const data = {


        score:result,


        points:totalPoints,


        answers:answersSelected,


        date:new Date().toISOString()


    };



    localStorage.setItem(

        "godinometro_result",

        JSON.stringify(data)

    );



    window.location.href =
    "resultado.html";


}