// Frontend-only validation and small behaviors for login form
document.addEventListener('DOMContentLoaded', function(){
  const form = document.getElementById('loginForm');
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  const usernameError = document.getElementById('usernameError');
  const passwordError = document.getElementById('passwordError');
  const formMessage = document.getElementById('formMessage');
  const togglePass = document.getElementById('togglePass');

  function validateEmailOrUsername(value){
    if(!value) return 'Please enter username or email.';
    // simple email pattern test
    const emailLike = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(value.length < 3) return 'Too short.';
    if(value.includes(' ')) return 'No spaces allowed.';
    return null;
  }

  function validatePassword(value){
    if(!value) return 'Please enter your password.';
    if(value.length < 6) return 'Password must be at least 6 characters.';
    return null;
  }

  togglePass.addEventListener('click', function(){
    if(password.type === 'password'){
      password.type = 'text';
      togglePass.textContent = 'Hide';
      togglePass.setAttribute('aria-label','Hide password');
    } else {
      password.type = 'password';
      togglePass.textContent = 'Show';
      togglePass.setAttribute('aria-label','Show password');
    }
  });

  username.addEventListener('input', function(){
    usernameError.textContent = '';
  });
  password.addEventListener('input', function(){
    passwordError.textContent = '';
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    formMessage.textContent = '';
    let hasError = false;

    const uErr = validateEmailOrUsername(username.value.trim());
    const pErr = validatePassword(password.value);

    if(uErr){ usernameError.textContent = uErr; hasError = true } else usernameError.textContent = '';
    if(pErr){ passwordError.textContent = pErr; hasError = true } else passwordError.textContent = '';

    if(hasError) return;

    // Demo success behavior: show message and reset password field
    formMessage.textContent = 'Logging in... (demo)';
    // mimic network delay
    setTimeout(()=>{
      const remember = document.getElementById('remember').checked;
      formMessage.textContent = `Login successful. Remember: ${remember ? 'yes' : 'no'}`;
      password.value = '';
    }, 900);
  });

  // Demo social buttons
  document.getElementById('googleBtn').addEventListener('click', ()=>{
    formMessage.textContent = 'Google sign-in is not wired in this demo.';
  });
  document.getElementById('facebookBtn').addEventListener('click', ()=>{
    formMessage.textContent = 'Facebook sign-in is not wired in this demo.';
  });
  document.getElementById('forgot').addEventListener('click', (e)=>{
    e.preventDefault();
    formMessage.textContent = 'Open password recovery flow (demo).';
  });
});
