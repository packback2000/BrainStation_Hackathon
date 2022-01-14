const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");

if (mostRecentScore <= 3) {
finalScore.innerText = "Your score is " + mostRecentScore + " maybe you should study a little more";
} if (mostRecentScore > 3 && mostRecentScore <7) {
    finalScore.innerText = "Your score is " + mostRecentScore + " good job but you can do a little better";
    } if (mostRecentScore > 7) {
        finalScore.innerText = "Your score is " + mostRecentScore + " Amazing Job!";
        }

username.addEventListener("keyup", () => {
    console.log(username.value)

    saveScoreBtn.disabled = !username.value;
});

saveHighScore = e => {
    console.log("clicked the save")
    e.preventDefault();
    alert("Your Score has been Saved")
};

