document.addEventListener("DOMContentLoaded", function(){

  const words = ["HELLO","WORLD","JAVASCRIPT","QUIZ","PUZZLE","HUSSAIN"];
  let currentWord="", scrambledWord="", score=0, time=60, timerInterval;

  const playBtn = document.getElementById("play-game-btn");
  const modal = document.getElementById("game-modal");
  const closeModal = document.getElementById("close-modal");
  const chatWindow = document.getElementById("chat-window");
  const userInput = document.getElementById("user-answer");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const nextWordBtn = document.getElementById("next-word");

  function scrambleWord(word){ return word.split('').sort(()=>Math.random()-0.5).join(''); }

  function newWord(){
    currentWord = words[Math.floor(Math.random()*words.length)];
    scrambledWord = scrambleWord(currentWord);
    appendBotMessage(`Unscramble: ${scrambledWord}`);
    userInput.value = ""; userInput.focus();
  }

  function appendBotMessage(msg){
    const div = document.createElement("div");
    div.classList.add("chat-message","chat-bot");
    div.innerText = msg;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function appendUserMessage(msg){
    const div = document.createElement("div");
    div.classList.add("chat-message","chat-user");
    div.innerText = msg;
    chatWindow.appendChild(div);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function startTimer(){
    timerDisplay.innerText = time;
    timerInterval = setInterval(()=>{
      time--;
      timerDisplay.innerText = time;
      if(time<=0){
        clearInterval(timerInterval);
        appendBotMessage("⏰ Time's up! Final Score: "+score);
        userInput.disabled = true;
      }
    },1000);
  }

  playBtn.addEventListener("click", ()=>{
    modal.style.display = "flex"; // show modal front
    time=60; score=0;
    scoreDisplay.innerText=score;
    chatWindow.innerHTML="";
    userInput.disabled=false;
    startTimer();
    newWord();
  });

  closeModal.addEventListener("click", ()=>{
    modal.style.display="none";
    clearInterval(timerInterval);
  });

  userInput.addEventListener("input", ()=>{
    let answer = userInput.value.toUpperCase();
    if(answer === currentWord){
      score++; scoreDisplay.innerText=score;
      appendUserMessage(answer);
      appendBotMessage("✅ Correct!");
      setTimeout(newWord,800);
    }
  });

  nextWordBtn.addEventListener("click", ()=>{
    appendBotMessage(`⏭ Skipped! Correct was: ${currentWord}`);
    newWord();
  });

});
