const startBtn = document.getElementById("startBtn");

const welcomeScreen = document.getElementById("welcomeScreen");
const unitScreen = document.getElementById("unitScreen");
const quizReadyScreen = document.getElementById("quizReadyScreen");
const quizScreen = document.getElementById("quizScreen");

const studentGreeting = document.getElementById("studentGreeting");
const quizStartBtn = document.getElementById("quizStartBtn");
const backToUnitBtn = document.getElementById("backToUnitBtn");

const quizProgress = document.getElementById("quizProgress");
const questionText = document.getElementById("questionText");
const choiceArea = document.getElementById("choiceArea");
const nextBtn = document.getElementById("nextBtn");

let currentQuestions = [];
let currentIndex = 0;
let score = 0;

startBtn.addEventListener("click", function () {
    const name = document.getElementById("studentName").value.trim();
    const grade = document.querySelector('input[name="grade"]:checked');
    const studentClass = document.getElementById("studentClass").value.trim();
    const studentNumber = document.getElementById("studentNumber").value.trim();

    if (!name || !grade || !studentClass || !studentNumber) {
        alert("이름, 학년, 반, 번호를 모두 입력해 주세요.");
        return;
    }

    studentGreeting.textContent =
        `${name} 학생, 오늘은 어떤 단원을 공부할까요?`;

    welcomeScreen.classList.add("hidden");
    unitScreen.classList.remove("hidden");
});

document.querySelectorAll(".unit-card").forEach(function (card) {
    card.addEventListener("click", function () {
        const unit = card.dataset.unit;

        if (unit === "소인수분해") {
            unitScreen.classList.add("hidden");
            quizReadyScreen.classList.remove("hidden");
        } else {
            alert("이 단원은 곧 연결됩니다.");
        }
    });
});

backToUnitBtn.addEventListener("click", function () {
    quizReadyScreen.classList.add("hidden");
    unitScreen.classList.remove("hidden");
});

quizStartBtn.addEventListener("click", function () {
    currentQuestions = [...QUESTIONS.prime];
    currentQuestions.sort(() => Math.random() - 0.5);

    currentIndex = 0;
    score = 0;

    quizReadyScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    showQuestion();
});

function showQuestion() {
    const q = currentQuestions[currentIndex];

    quizProgress.textContent = `${currentIndex + 1} / ${currentQuestions.length}`;
    questionText.textContent = q.question;

    choiceArea.innerHTML = "";
    nextBtn.classList.add("hidden");

    q.choices.forEach(function (choice, index) {
        const button = document.createElement("button");
        button.className = "choice-button";
        button.textContent = choice;

        button.addEventListener("click", function () {
            checkAnswer(index, q.answer, button);
        });

        choiceArea.appendChild(button);
    });
}

function checkAnswer(selected, answer, selectedButton) {
    const buttons = document.querySelectorAll(".choice-button");

    buttons.forEach(function (btn) {
        btn.disabled = true;
    });

    if (selected === answer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        buttons[answer].classList.add("correct");
    }

    nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", function () {
    currentIndex++;

    if (currentIndex < currentQuestions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizScreen.innerHTML = `
        <header class="app-header">
            <div class="logo">🎉</div>
            <h1>퀴즈 완료!</h1>
            <h2>${score} / ${currentQuestions.length} 문제 정답</h2>
        </header>

        <section class="message">
            <h3>🌱 오늘도 성장했습니다.</h3>
            <p>
                틀린 문제는 다시 배우면 됩니다.<br>
                포기하지 않는 사람이 결국 답을 찾습니다.
            </p>
        </section>

        <button onclick="location.reload()">처음으로 돌아가기</button>
    `;
}
