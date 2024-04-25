    // une constante pour définir les questions, les choix et la réponse correcte.
        const quiz = [
            {
                question: "C'est quoi la capitale de la France?",
                options: ["Paris", "London", "Berlin", "Rome"],
                Response: "Paris"
            },
            {
                question: "Rome est la capitale de quelle nation?",
                options: ["Maroc", "Italie", "Belgique", "Brazil"],
                Response: "Italie"
            },
            {
                question: "C'est quoi la capital du Tchad?",
                options: ["Caire", "Yaoundé", "Rabat", "N'Djamena"],
                Response: "N'Djamena"
            },
            {
                question: "laquelle parmi ces villes n'est pas une Capitale?",
                options: ["Brussel", "Madrid", "Munchen", "Paris"],
                Response: "Munchen"
            }
        ];

        document.getElementById("pseudoForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Empêche le rechargement de la page
    
            const pseudoInput = document.getElementById("pseudoInput");
            const pseudoValue = pseudoInput.value; // Récupère la valeur saisie dans le champ pseudo
        });


        let currentQuestion = 0; // suivre la question actuelle.
        let score = 0; // suivre le score.
        let timeLeft = 5; // Countdown temps en seconds

        // Fonction pour afficher la question actuelle et lancer le countdown.
        function displayQuestion() {
            const questionElement = document.getElementById("question"); // récupère l'élément HTML avec l'identifiant "question" dans le document et le stocke dans la variable questionElement.
            const optionsElement = document.getElementById("options"); // récupère l'élément HTML avec l'identifiant "Option" dans le document et le stocke dans la variable questionElement.
            const countdownElement = document.getElementById("countdown");// récupère l'élément HTML avec l'identifiant "Countdown" dans le document et le stocke dans la variable questionElement.

            // Afficher la question.
            questionElement.textContent = quiz[currentQuestion].question; 

            // Vider les options.
            optionsElement.innerHTML = "";

            // Afficher les options.
            quiz[currentQuestion].options.forEach((option, index) => {
                const optionElement = document.createElement("button"); 
                optionElement.textContent = option;
                optionElement.addEventListener("click", () => {
                    clearInterval(timer); // arreter le  countdown quand l'option est sélectionnée.
                    checkAnswer(option); //
                });
                optionsElement.appendChild(optionElement);
            });

            // lancer le countdown
            timeLeft = 5;
            countdownElement.textContent = `Time left: ${timeLeft} seconds`;
            const timer = setInterval(() => {
                timeLeft--;
                countdownElement.textContent = `Time left: ${timeLeft} seconds`;
                if (timeLeft <= 0) {
                    clearInterval(timer); // Arreter le countdown quand le temps s'epuise.
                    checkAnswer(null); // Passer à la prochaine question sans sélectionner de réponse.
                }
            }, 1000);
        }

        // Fonction pour verifier la réponse correcte.
        function checkAnswer(selectedOption) {
            if (selectedOption === quiz[currentQuestion].Response) {
                score++; // Incrémenter le score si la réponse est correcte.
            }

            currentQuestion++; // passer à la question suivante.

            if (currentQuestion < quiz.length) {
                displayQuestion(); // Afficher la question suivante
            } else {
                displayScore(); // Afficher le score final.
            }
        }

        // Fonction pour afficher le score final.
        function displayScore() {
            const scoreElement = document.getElementById("score");
            scoreElement.textContent = `Your score:${pseudoValue} ${score}/${quiz.length}`;
        }

        // fonction pour lancer le quiz.
        function startQuiz() {
            displayQuestion();
        }

        // Commencer le quiz quand l'ecran se réfléchit.
        window.addEventListener("load", startQuiz);
