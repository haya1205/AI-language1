// Small replies dictionary
const replies = {
  "hello": "Hello → ہیلو (greeting used to say Hi).",
  "thank you": "Thank you → شکریہ (used to show gratitude).",
  "good morning": "Good morning → صبح بخیر (used to greet in morning).",
  "good night": "Good night → شب بخیر (used before sleeping).",
  "apple": "Apple → سیب (a round red or green fruit).",
  "book": "Book → کتاب (a collection of written pages).",
  "teacher": "Teacher → استاد (a person who teaches).",
  "student": "Student → طالب علم (a person who studies).",
  "water": "Water → پانی (a clear liquid for drinking).",
  "beautiful": "Beautiful → خوبصورت (pleasing to the eyes or mind)."
};

// UI elements
const startBtn = document.getElementById("startLearningBtn");
const chatWidget = document.getElementById("chatWidget");
const chatHeaderClose = document.getElementById("chatCloseBtn");
const chatInput = document.getElementById("chatInput");
const chatSend = document.getElementById("chatSend");
const chatMessages = document.getElementById("chatMessages");

// Reply function
function fakeAIReply(text) {
  const key = text.toLowerCase().trim();
  return replies[key] ||
    "Sorry, I don’t know this one 😅 — try another word like 'apple' or 'teacher'.";
}

// Helper to append message
function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `msg ${sender}`;
  const bubble = document.createElement("span");
  bubble.className = "bubble";
  bubble.innerHTML = text;
  msg.appendChild(bubble);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Toggle chat widget
startBtn && startBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (chatWidget.style.display === "none" || chatWidget.style.display === "") {
    chatWidget.style.display = "block";
    addMessage('bot', 'Assalamu Alaikum! Try typing a word like "apple" or "teacher".');
  } else {
    chatWidget.style.display = "none";
  }
});

// Close button
chatHeaderClose && chatHeaderClose.addEventListener("click", () => {
  chatWidget.style.display = "none";
});

// Send message
function sendMessage() {
  const userText = chatInput.value.trim();
  if (!userText) return;
  addMessage('user', escapeHtml(userText));
  chatInput.value = '';
  setTimeout(() => {
    const reply = fakeAIReply(userText);
    addMessage('bot', escapeHtml(reply));
  }, 400);
}

// Event listeners
chatSend.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMessage();
  }
});

// Escape HTML
function escapeHtml(text) {
  return String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

// --- Load Cards from data.json ---
fetch('/data.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    data.forEach((item, i) => {
      container.innerHTML += `
        <div class="col-md-6 col-lg-4 mb-4">
          <div class="card h-100 shadow-sm border-0"">
            <img src="${item.img}" class="card-img-top" alt="${item.title}">
            <div class="card-body text-center">
              <h5>${item.title}</h5>
              <p class="text-muted">${item.short}</p>
              <button class="btn btn-outline-primary btn-sm read-btn"
                data-title="${item.title}"
                data-desc="${item.desc}"
                data-img="${item.img}"
                data-bullets='${JSON.stringify(item.bullets)}'>
                Read More
              </button>
            </div>
          </div>
        </div>`;
    });

    setupModal();
  })
  .catch(err => {
    console.error(err);
    document.getElementById('cards-container').innerHTML =
      '<p class="text-center text-muted">Unable to load features right now.</p>';
  });

// Modal setup function
function setupModal() {
  const modal = document.getElementById('featureModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImg = document.getElementById('modalImg');
  const modalDesc = document.getElementById('modalDesc');
  const modalBullets = document.getElementById('modalBullets');

  document.querySelectorAll('.read-btn').forEach(button => {
    button.addEventListener('click', () => {
      const title = button.getAttribute('data-title');
      const desc = button.getAttribute('data-desc');
      const img = button.getAttribute('data-img');
      const bullets = JSON.parse(button.getAttribute('data-bullets'));

      modalTitle.textContent = title;
      if (modalImg) modalImg.src = img || '';
      modalDesc.textContent = desc;

      // Clear previous bullets
      modalBullets.innerHTML = '';
      bullets.forEach(bullet => {
        const li = document.createElement('li');
        li.textContent = bullet;
        modalBullets.appendChild(li);
      });

      const modalInstance = new bootstrap.Modal(modal);
      modalInstance.show();
    });
  });
}
