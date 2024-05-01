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
    const questionElement = document.getElementById("question"); // récupère l'élément HTML avec l'identifiant "question" dans le document et le stocke dans la variable questionElement.
    const optionsElement = document.getElementById("options"); // récupère l'élément HTML avec l'identifiant "Option" dans le document et le stocke dans la variable questionElemen;                 
    const countdownElement = document.getElementById("timer"); // récupère l'élément HTML avec l'identifiant "Countdown" dans le document et le stocke dans la variable questionElemen;

    // Affiche la question
    questionElement.textContent = quiz[currentQuestion].question;
                                                                

    // Vide les options précédentes
    optionsElement.innerHTML = "";

    // Affiche les options pour la question actuelle
    quiz[currentQuestion].options.forEach((option) => {
        const optionElement = document.createElement("button");
        optionElement.textContent = option;
        optionElement.addEventListener("click", () => {
            clearInterval(timer); // Arrête le compte à rebours quand l'option est sélectionnée.
            verifierReponse(option); // représente l'option de réponse sélectionnée
        });
        optionsElement.appendChild(optionElement);
    });

    // Démarre le compte à rebours seulement après avoir affiché les options
    let timeLeft = 5; // Durée initiale du compte à rebours en secondes
    countdownElement.textContent = timeLeft; // Affiche le temps restant dans l'élément countdown


    timer = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer); // Arreter le countdown quand le temps s'écoule.
            verifierReponse(null); // Aucune réponse donnée (temps écoulé)
        }
    }, 1000);
}

// Vérifie la réponse sélectionnée par le joueur
function verifierReponse(selectedOption) {
    const answer = quiz[currentQuestion].answer; // Récupère la réponse correcte pour la question actuelle
    const modal = document.getElementById('modal'); // Récupère l'élément modal
    const modalContent = document.getElementById('modal-content'); // Récupère le contenu de la modal

    if (selectedOption === answer) {
        score++; // Incrémente le score si la réponse est correcte
        modalContent.textContent = `Bravo ! La réponse "${answer}" est correcte.`;
    } else {
        modalContent.textContent = `Dommage, la réponse incorrecte est "${answer}".`;
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
    modal.style.display = 'none'; //  Cache la modal au chargement de la page
});


// Fonction pour afficher le score
function displayScore() {
    const name = localStorage.getItem("nom"); // Récupère le nom depuis localStorage
    const prenom = localStorage.getItem("prenom"); // Récupère le prénom depuis localStorage
    
    // Afficher le score nécessite une variable 'score', qui n'est pas définie dans cet extrait de code.
    // En supposant que 'score' représente le score du quiz.
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `${name} ${prenom} votre score : ${score}/${quiz.length}`;
}
