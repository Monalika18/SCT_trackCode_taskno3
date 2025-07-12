const passwordInput = document.getElementById('passwordInput');
const resultDiv = document.getElementById('result');
const strengthFill = document.getElementById('strengthFill');

// Real-time checking as user types
passwordInput.addEventListener('input', checkPassword);

function checkPassword() {
  const password = passwordInput.value;
  let strength = 0;
  let feedback = '';

  // Check length
  if (password.length >= 12) strength += 30;
  else if (password.length >= 8) strength += 20;
  else if (password.length >= 6) strength += 10;
  else strength += 0;

  // Check for uppercase
  if (/[A-Z]/.test(password)) strength += 20;

  // Check for lowercase
  if (/[a-z]/.test(password)) strength += 20;

  // Check for numbers
  if (/[0-9]/.test(password)) strength += 15;

  // Check for special characters
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength += 15;

  // Determine strength level and color
  let strengthText = '';
  let strengthClass = '';
  if (strength >= 80) {
    strengthText = 'Very Strong';
    strengthClass = 'very-strong';
  } else if (strength >= 60) {
    strengthText = 'Strong';
    strengthClass = 'strong';
  } else if (strength >= 40) {
    strengthText = 'Moderate';
    strengthClass = 'moderate';
  } else {
    strengthText = 'Weak';
    strengthClass = 'weak';
  }

  // Update strength bar
  strengthFill.style.width = `${strength}%`;
  strengthFill.className = `strength-fill ${strengthClass}`;

  // Provide feedback
  feedback = `Strength: <span style="color: #007BFF;">${strengthText}</span> (Score: <span style="color: #007BFF;">${strength}/100</span>)<br>`;
  if (password.length < 6) feedback += '<span class="tip">Tip: Use at least 6 characters.</span><br>';
  if (!/[A-Z]/.test(password)) feedback += '<span class="tip">Tip: Add uppercase letters.</span><br>';
  if (!/[a-z]/.test(password)) feedback += '<span class="tip">Tip: Add lowercase letters.</span><br>';
  if (!/[0-9]/.test(password)) feedback += '<span class="tip">Tip: Add numbers.</span><br>';
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) feedback += '<span class="tip">Tip: Add special characters.</span><br>';

  resultDiv.innerHTML = feedback || 'Enter a password to check its strength.';
}