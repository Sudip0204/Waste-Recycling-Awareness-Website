// --- SCRIPT FOR CUSTOM FILE UPLOAD ---
const fileInput = document.getElementById('imageInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');

fileInput?.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    fileNameDisplay.textContent = fileInput.files[0].name;
  } else {
    fileNameDisplay.textContent = 'No file chosen';
  }
});

// Simulated AI Classifier
document.getElementById('classifyBtn')?.addEventListener('click', () => {
  const input = document.getElementById('imageInput');
  const resultEl = document.getElementById('classificationResult');
  
  if (input.files.length === 0) {
    resultEl.textContent = 'Please select an image first.';
    return;
  }

  resultEl.textContent = 'Analyzing image...';
  setTimeout(() => {
    const categories = ['Plastic', 'Organic', 'Metal', 'Paper', 'Glass'];
    const choice = categories[Math.floor(Math.random() * categories.length)];
    resultEl.textContent = `Result: This looks like ${choice}.`;
  }, 1200);
});

// Quiz System
const quizData = [
  { q: 'Which bin for banana peels?', a: 'Organic' },
  { q: 'Where do soda cans go?', a: 'Metal' },
  { q: 'Are greasy pizza boxes recyclable?', a: 'No' },
  { q: 'What about newspapers?', a: 'Paper' }
];
let quizIndex = 0;
let score = 0;

function showNextQuestion() {
  const container = document.getElementById('quizContainer');
  if (!container) return;
  
  if (quizIndex < quizData.length) {
    const qObj = quizData[quizIndex];
    container.innerHTML = `
      <p>${qObj.q}</p>
      <input type="text" id="quizAnswer" placeholder="Your answer...">
      <button id="submitAnswerBtn" class="btn btn-green">Submit</button>
    `;
    document.getElementById('quizAnswer').focus();
    document.getElementById('submitAnswerBtn').onclick = () => {
      const userAnswer = document.getElementById('quizAnswer').value.trim().toLowerCase();
      if (userAnswer === qObj.a.toLowerCase()) {
        score++;
      }
      quizIndex++;
      showNextQuestion();
    };
  } else {
    document.getElementById('quizContainer').innerHTML = '';
    document.getElementById('quizScore').textContent = `Quiz Complete! Your Score: ${score}/${quizData.length}`;
    document.getElementById('startQuizBtn').style.display = 'block';
    document.getElementById('startQuizBtn').textContent = 'Try Again';
  }
}

document.getElementById('startQuizBtn')?.addEventListener('click', () => {
  quizIndex = 0;
  score = 0;
  document.getElementById('startQuizBtn').style.display = 'none';
  document.getElementById('quizScore').textContent = '';
  showNextQuestion();
});

// Contact Form
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const statusEl = document.getElementById('contactStatus');
  statusEl.textContent = 'Sending...';
  setTimeout(() => {
    statusEl.textContent = 'Message sent successfully! Thank you.';
    statusEl.style.color = 'green';
    e.target.reset();
  }, 1000);
});

// Feedback Stars
document.querySelectorAll('.stars span')?.forEach(star => {
  star.addEventListener('click', () => {
    const value = star.getAttribute('data-value');
    document.querySelectorAll('.stars span').forEach(s => {
      s.classList.remove('selected');
      if (s.getAttribute('data-value') <= value) {
        s.classList.add('selected');
      }
    });
  });
});

// Feedback Form
document.getElementById('feedbackForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const statusEl = document.getElementById('feedbackStatus');
  statusEl.textContent = 'Submitting...';
  setTimeout(() => {
    statusEl.textContent = 'Thank you for your feedback!';
    statusEl.style.color = 'green';
    e.target.reset();
    document.querySelectorAll('.stars span').forEach(s => s.classList.remove('selected'));
  }, 1000);
});