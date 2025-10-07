document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const formMessage = document.getElementById('formMessage');

  if(!name || !email || !message) {
    formMessage.textContent = 'Please fill all fields.';
    formMessage.className = 'form-message error';
    return;
  }

  if(!validateEmail(email)) {
    formMessage.textContent = 'Please enter a valid email.';
    formMessage.className = 'form-message error';
    return;
  }

  formMessage.textContent = 'Sending message...';
  formMessage.className = 'form-message';

  setTimeout(() => {
    formMessage.textContent = `Thank you, ${name}! Your message has been sent.`;
    formMessage.className = 'form-message success';
    this.reset();
  }, 1500);
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
