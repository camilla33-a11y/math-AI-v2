const startBtn = document.getElementById("startBtn");
const welcomeScreen = document.getElementById("welcomeScreen");
const unitScreen = document.getElementById("unitScreen");
const studentGreeting = document.getElementById("studentGreeting");

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
