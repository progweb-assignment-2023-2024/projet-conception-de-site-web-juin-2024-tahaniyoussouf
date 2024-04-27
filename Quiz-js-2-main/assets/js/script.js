// Définition des questions et réponses du quiz
const quiz = [
    {
        question: "Quelle est la capitale de la France ?",
        options: ["Paris", "Londres", "Berlin", "Rome"],
        answer: "Paris"
    },
    {
        question: "Quelle ville n'est pas une capitale ?",
        options: ["Liège", "Bruxelles", "Madrid", "Amsterdam"],
        answer: "Liège"
    },
    {
        question: "Quelle ville est une capitale ?",
        options: ["Marrakech", "Barcelone", "Berlin", "Lyon"],
        answer: "Berlin"
    },
    {
        question: "Podapst est la capital de quel pays?",
        options: ["Algérie", "Tchad", "Belgique", "Hongrie"],
        answer: "Hongrie"
    }
];

let currentQuestion = 0; // Question actuelle
let score = 0; // Score du joueur
let timer; // Timer du compte à rebours

// Fonction pour afficher la question actuelle et lancer le compte à rebours
function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const countdownElement = document.getElementById("timer");

    // Affiche la question
    questionElement.textContent = quiz[currentQuestion].question;

    // Vide les options précédentes
    optionsElement.innerHTML = "";

    // Affiche les options pour la question actuelle
    quiz[currentQuestion].options.forEach((option) => {
        const optionElement = document.createElement("button");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => {
            clearInterval(timer); // Arrête le compte à rebours
            verifierReponse(option);
        });
        optionsElement.appendChild(optionElement);
    });

    // Démarre le compte à rebours seulement après avoir affiché les options
    let timeLeft = 5;
    countdownElement.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            verifierReponse(null); // Aucune réponse donnée (temps écoulé)
        }
    }, 1000);
}

// Vérifie la réponse sélectionnée par le joueur
function verifierReponse(selectedOption) {
    const answer = quiz[currentQuestion].answer;
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-content');

    if (selectedOption === answer) {
        score++; // Incrémente le score si la réponse est correcte
        modalContent.textContent = `Bravo ! La réponse "${answer}" est correcte.`;
    } else {
        modalContent.textContent = `Dommage, la réponse correcte est "${answer}".`;
    }

    modal.style.display = 'flex'; // Affiche la modal

    setTimeout(() => {
        modal.style.display = 'none'; // Cache la modal après quelques secondes
        currentQuestion++; // Passe à la question suivante
        if (currentQuestion < quiz.length) {
            displayQuestion(); // Affiche la prochaine question
        } else {
            displayScore(); // Affiche le score final
        }
    }, 2000); // Délai en millisecondes avant de passer à la question suivante
}

// Démarre le quiz lorsque la page est chargée
window.addEventListener("load", () => {
    displayQuestion(); // Affiche la première question
    modal.style.display = 'none'
});

// Fonction pour afficher le score
function displayScore() {
    const name = localStorage.getItem("nom"); // Retrieve 'nom' from localStorage
    const prenom = localStorage.getItem("prenom"); // Retrieve 'prenom' from localStorage
    
    // Displaying the score requires a 'score' variable, which is not defined in this snippet
    // Assuming 'score' is meant to represent the quiz score
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `${name} ${prenom} votre score : ${score}/${quiz.length}`;
}
