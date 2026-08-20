/* =====================================================
   DILEMAS DIGITAIS
   JAVASCRIPT PRINCIPAL
===================================================== */


/* ================= MENU MOBILE ================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

});


document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

    });

});


/* ================= TEMA ================= */

const themeButton = document.getElementById("themeButton");

const savedTheme = localStorage.getItem("dilemas-theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeButton.textContent = "☀️";

}


themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    themeButton.textContent =
        isLight ? "☀️" : "🌙";

    localStorage.setItem(
        "dilemas-theme",
        isLight ? "light" : "dark"
    );

});


/* ================= FILTRO DOS DILEMAS ================= */

const filters =
    document.querySelectorAll(".filter");

const dilemaCards =
    document.querySelectorAll(".dilema-card");


filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(item => {
            item.classList.remove("active");
        });

        filter.classList.add("active");

        const category =
            filter.dataset.filter;

        dilemaCards.forEach(card => {

            const cardCategory =
                card.dataset.category;

            if (
                category === "todos" ||
                category === cardCategory
            ) {

                card.style.display = "flex";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/* ================= MODAL DE SOLUÇÃO ================= */

const solutionButtons =
    document.querySelectorAll(".solution-btn");

const solutionModal =
    document.getElementById("solutionModal");

const modalText =
    document.getElementById("modalText");

const modalClose =
    document.getElementById("modalClose");


solutionButtons.forEach(button => {

    button.addEventListener("click", () => {

        modalText.textContent =
            button.dataset.solution;

        solutionModal.classList.remove("hidden");

    });

});


modalClose.addEventListener("click", () => {

    solutionModal.classList.add("hidden");

});


solutionModal.addEventListener("click", event => {

    if (event.target === solutionModal) {

        solutionModal.classList.add("hidden");

    }

});


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        solutionModal.classList.add("hidden");

    }

});


/* ================= COPIAR DICAS ================= */

const copyButtons =
    document.querySelectorAll(".copy-tip");

const toast =
    document.getElementById("toast");


copyButtons.forEach(button => {

    button.addEventListener("click", async () => {

        const tip =
            button.parentElement.querySelector(".tip-text");

        const text =
            tip.textContent.trim();

        try {

            await navigator.clipboard.writeText(text);

            showToast();

            button.textContent = "✓ Copiado";

            setTimeout(() => {

                button.textContent = "Copiar dica";

            }, 1800);

        } catch (error) {

            alert(text);

        }

    });

});


function showToast() {

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 1800);

}


/* ================= CHECKLIST ================= */

const checkboxes =
    document.querySelectorAll(
        ".check-item input"
    );

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");


function updateChecklist() {

    const total =
        checkboxes.length;

    const checked =
        document.querySelectorAll(
            ".check-item input:checked"
        ).length;

    const percentage =
        Math.round((checked / total) * 100);

    progressBar.style.width =
        `${percentage}%`;

    progressText.textContent =
        `${percentage}%`;

}


checkboxes.forEach(checkbox => {

    checkbox.addEventListener(
        "change",
        updateChecklist
    );

});


/* ================= QUIZ ================= */

const questions = [

    {
        question:
            "Você recebe uma notícia muito chocante em um grupo. O que faz?",

        answers: [
            "Compartilho imediatamente.",
            "Verifico a fonte e procuro outras informações.",
            "Acredito porque várias pessoas enviaram.",
            "Faço um comentário antes de verificar."
        ],

        correct: 1
    },


    {
        question:
            "Qual atitude ajuda mais a proteger suas contas?",

        answers: [
            "Usar a mesma senha em todos os sites.",
            "Anotar a senha em uma postagem privada.",
            "Usar senhas diferentes e autenticação de dois fatores.",
            "Compartilhar a senha com amigos."
        ],

        correct: 2
    },


    {
        question:
            "Uma inteligência artificial apresenta uma informação importante. O que você deve fazer?",

        answers: [
            "Aceitar porque a IA sempre está certa.",
            "Verificar a informação em fontes confiáveis.",
            "Compartilhar imediatamente.",
            "Ignorar qualquer informação produzida por IA."
        ],

        correct: 1
    },


    {
        question:
            "Qual é uma boa prática para melhorar sua relação com redes sociais?",

        answers: [
            "Manter todas as notificações ativadas.",
            "Usar as redes durante todas as refeições.",
            "Definir limites de tempo e fazer pausas.",
            "Nunca sair das redes."
        ],

        correct: 2
    },


    {
        question:
            "Você recebe um link pedindo seu código de autenticação. O que faz?",

        answers: [
            "Envio o código.",
            "Encaminho para outras pessoas.",
            "Não envio e verifico se a mensagem é legítima.",
            "Clico em todos os links da mensagem."
        ],

        correct: 2
    }

];


let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;


const startQuiz =
    document.getElementById("startQuiz");

const quizIntro =
    document.querySelector(".quiz-intro");

const quizContainer =
    document.getElementById("quizContainer");

const quizResult =
    document.getElementById("quizResult");

const questionNumber =
    document.getElementById("questionNumber");

const question =
    document.getElementById("question");

const answers =
    document.getElementById("answers");

const nextQuestion =
    document.getElementById("nextQuestion");

const quizProgress =
    document.getElementById("quizProgress");

const scoreElement =
    document.getElementById("score");

const resultTitle =
    document.getElementById("resultTitle");

const resultText =
    document.getElementById("resultText");

const restartQuiz =
    document.getElementById("restartQuiz");


/* INICIAR */

startQuiz.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    quizIntro.classList.add("hidden");

    quizResult.classList.add("hidden");

    quizContainer.classList.remove("hidden");

    loadQuestion();

});


/* CARREGAR PERGUNTA */

function loadQuestion() {

    const current =
        questions[currentQuestion];

    selectedAnswer = null;

    nextQuestion.disabled = true;

    questionNumber.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    question.textContent =
        current.question;

    answers.innerHTML = "";

    quizProgress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;


    current.answers.forEach(
        (answer, index) => {

            const button =
                document.createElement("button");

            button.className =
                "answer";

            button.textContent =
                answer;

            button.addEventListener(
                "click",
                () => selectAnswer(button, index)
            );

            answers.appendChild(button);

        }
    );

}


/* SELECIONAR RESPOSTA */

function selectAnswer(button, index) {

    document
        .querySelectorAll(".answer")
        .forEach(answer => {

            answer.classList.remove("selected");

        });


    button.classList.add("selected");

    selectedAnswer = index;

    nextQuestion.disabled = false;

}


/* PRÓXIMA */

nextQuestion.addEventListener("click", () => {

    if (selectedAnswer === null) {
        return;
    }

    const current =
        questions[currentQuestion];


    if (
        selectedAnswer === current.correct
    ) {

        score++;

    }


    currentQuestion++;


    if (
        currentQuestion <
        questions.length
    ) {

        loadQuestion();

    } else {

        showResult();

    }

});


/* RESULTADO */

function showResult() {

    quizContainer.classList.add("hidden");

    quizResult.classList.remove("hidden");

    scoreElement.textContent =
        score;


    if (score === 5) {

        resultTitle.textContent =
            "Você manda muito bem! 🚀";

        resultText.textContent =
            "Excelente! Você demonstra uma ótima consciência sobre segurança, informação e responsabilidade digital.";

    }

    else if (score >= 3) {

        resultTitle.textContent =
            "Bom trabalho! 🧠";

        resultText.textContent =
            "Você já possui bons hábitos digitais. Continue questionando informações e protegendo seus dados.";

    }

    else {

        resultTitle.textContent =
            "Hora de evoluir! 🌱";

        resultText.textContent =
            "Não se preocupe. O importante é aprender. Explore as soluções deste site e tente novamente.";

    }

}


/* REINICIAR */

restartQuiz.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    quizResult.classList.add("hidden");

    quizIntro.classList.remove("hidden");

});


/* ================= ANIMAÇÃO AO ENTRAR NA TELA ================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                }

            });

        },
        {
            threshold: 0.1
        }
    );


document
    .querySelectorAll(
        ".solution-card, .dilema-card"
    )
    .forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(20px)";

        card.style.transition =
            "opacity .6s ease, transform .6s ease";

        observer.observe(card);

    });