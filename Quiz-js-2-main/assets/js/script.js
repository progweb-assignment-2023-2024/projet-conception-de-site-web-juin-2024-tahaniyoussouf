    // Define the quiz questions and answers
        const quiz = [
            {
                question: "C'est quoi la capitale de la France?",
                options: ["Paris", "London", "Berlin", "Rome"],
                answer: "Paris"
            },
            {
                question: "laquelle parmis ces ville est pas une capitale?",
                options: ["Liège", "Brussel", "Madrid", "Amestrdam"],
                answer: "Liège"
            },
            {
                question: "laquelle parmis ces ville est une capital?",
                options: ["Marakech", "Bercelona", "Berlin", "Lyon"],
                answer: "Berlin"
            },
            {
                question: "Podabest est la capital de quel pays?",
                options: ["Algerie", "Tchad", "Belgique", "Hongarie"],
                answer: "Hongarie"
            }
        ];

        let currentQuestion = 0; // variable pour la question acctuelle.
        let score = 0; // variable pour le score.
        let timeLeft = 5; // variable pour le countdown

        // fonction pour afficher la question acctuelle est lancer le countdown.
        function displayQuestion() {
            const questionElement = document.getElementById("question");
            const optionsElement = document.getElementById("options");
            const countdownElement = document.getElementById("countdown");

            // Afficher la question.
            questionElement.textContent = quiz[currentQuestion].question;

            // Vider l'option.
            optionsElement.innerHTML = "";

            // Afficher l'option.
            quiz[currentQuestion].options.forEach((option, index) => {
                const optionElement = document.createElement("button");
                optionElement.textContent = option;
                optionElement.addEventListener("click", () => {
                    clearInterval(timer); // arreter le countdown quand une question est selectionnée.
                    checkAnswer(option);
                });
                optionsElement.appendChild(optionElement);
            });

            // lancer le countdown.
            timeLeft = 5;
            countdownElement.textContent = `Time left: ${timeLeft} seconds`;
            const timer = setInterval(() => {
                timeLeft--;
                countdownElement.textContent = `Time left: ${timeLeft} seconds`;
                if (timeLeft <= 0) {
                    clearInterval(timer); // arreter le countdown quand le temps s'est découlé.
                    checkAnswer(null); // aller à la question suivante.
                }
            }, 1000);
        }

        // Fonction pour verifier la réponse séléctionnée.
        function checkAnswer(selectedOption) {
            if (selectedOption === quiz[currentQuestion].answer) {
                score++; // Incrémenter le score si la question est correcte.
            }

            currentQuestion++; // passer à la question suivantes.

            if (currentQuestion < quiz.length) {
                displayQuestion(); // aller à la question suivante.
            } else {
                displayScore(); // Afficher le score.
            }
        }

        // Fonction pour afficher le score
        function displayScore() {
            const name=localStorage.getItem("nom");
            const prenom=localStorage.getItem("prenom");
            const scoreElement = document.getElementById("score");
            scoreElement.textContent =`${name} ${prenom} votre score : ${score}/${quiz.length}`;
        }

        // fonction pour lancer le quiz
        function startQuiz() {
            displayQuestion();
        }

    
        window.addEventListener("load", startQuiz);
