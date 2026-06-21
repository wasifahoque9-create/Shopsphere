
function togglePassword(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  btn.title = isText ? 'Show password' : 'Hide password';
  btn.style.color = isText ? '' : 'var(--indigo)';
}


const pwInput = document.getElementById('password');
const fill = document.getElementById('strengthFill');
const label = document.getElementById('strengthLabel');

if (pwInput && fill && label) {
  pwInput.addEventListener('input', () => {
    const val = pwInput.value;
    let score = 0;

    if (val.length >= 6)  score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const pct = (score / 5) * 100;
    fill.style.width = pct + '%';

    if (score === 0)      { fill.style.background = ''; label.textContent = ''; }
    else if (score <= 1)  { fill.style.background = '#ef4444'; label.textContent = 'Too weak'; }
    else if (score <= 2)  { fill.style.background = '#f97316'; label.textContent = 'Weak'; }
    else if (score <= 3)  { fill.style.background = '#eab308'; label.textContent = 'Fair'; }
    else if (score === 4) { fill.style.background = '#22c55e'; label.textContent = 'Strong'; }
    else                  { fill.style.background = '#10b981'; label.textContent = 'Very strong ✓'; }
  });
}

document.querySelectorAll('.alert').forEach(el => {
  setTimeout(() => {
    el.style.transition = 'opacity 0.4s';
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 400);
  }, 5000);
});
