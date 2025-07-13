const passwordInput = document.getElementById('passwordInput');
const resultDiv = document.getElementById('result');
const strengthFill = document.getElementById('strengthFill');
const copyBtn = document.getElementById('copyBtn');

// Load saved password from localStorage if available
const savedPassword = localStorage.getItem('lastPassword');
if (savedPassword) {
    passwordInput.value = savedPassword;
    checkPassword();
}

passwordInput.addEventListener('input', checkPassword);

function checkPassword() {
    const password = passwordInput.value.trim();
    let strength = 0;
    let feedback = '';
    localStorage.setItem('lastPassword', password); // Save current password

    // Check length with bonus for longer passwords
    if (password.length >= 16) strength += 40;
    else if (password.length >= 12) strength += 30;
    else if (password.length >= 8) strength += 20;
    else if (password.length >= 6) strength += 10;
    else strength += 0;

    // Check character types with weighted scoring
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    strength += (hasUpper ? 20 : 0) + (hasLower ? 20 : 0) + (hasNumber ? 15 : 0) + (hasSpecial ? 15 : 0);

    // Bonus for multiple character types
    const typeCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;
    if (typeCount >= 3) strength += 10;
    if (typeCount === 4) strength += 10;

    // Determine strength level and color
    let strengthText = '';
    let strengthClass = '';
    if (strength >= 90) {
        strengthText = 'Very Strong';
        strengthClass = 'very-strong';
    } else if (strength >= 70) {
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
    if (!hasUpper) feedback += '<span class="tip">Tip: Add uppercase letters.</span><br>';
    if (!hasLower) feedback += '<span class="tip">Tip: Add lowercase letters.</span><br>';
    if (!hasNumber) feedback += '<span class="tip">Tip: Add numbers.</span><br>';
    if (!hasSpecial) feedback += '<span class="tip">Tip: Add special characters.</span><br>';
    if (typeCount < 3) feedback += '<span class="tip">Tip: Use at least 3 different character types.</span><br>';

    resultDiv.innerHTML = feedback || 'Enter a password to check its strength.';
    copyBtn.style.display = password ? 'block' : 'none';
}

function copyToClipboard() {
    const feedbackText = resultDiv.innerText;
    navigator.clipboard.writeText(feedbackText).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        setTimeout(() => { copyBtn.innerText = originalText; }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}
