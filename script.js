let currentStep = 0;

function showStep(step) {
  // Hide all
  document.querySelectorAll('.form-section').forEach((el, i) => {
    el.classList.toggle('active', i === step);
  });

  // Update sidebar
  document.querySelectorAll('.step').forEach((el, i) => {
    el.classList.toggle('active', i === step);
  });
}

function nextStep() {
  if (!validateStep(currentStep)) return;

  if (currentStep === 2) updateSummary(); // before Step 4
  currentStep++;
  if (currentStep > 3) currentStep = 3;
  showStep(currentStep);
}

function prevStep() {
  currentStep--;
  if (currentStep < 0) currentStep = 0;
  showStep(currentStep);
}

function validateStep(step) {
  const form = document.querySelector(`#form-step-${step}`);
  if (!form) return true;

  const inputs = form.querySelectorAll('input[required]');
  for (let input of inputs) {
    if (!input.checked && !input.value.trim()) {
      alert("Please fill out required fields.");
      return false;
    }
  }

  return true;
}

function updateSummary() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const plan = document.querySelector('input[name="plan"]:checked')?.value || 'None';
  const addons = Array.from(document.querySelectorAll('.addon:checked')).map(cb => cb.value);

  const summaryHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Plan:</strong> ${plan}</p>
    <p><strong>Add-ons:</strong> ${addons.join(', ') || 'None'}</p>
  `;

  document.getElementById('summary').innerHTML = summaryHTML;
}

function submitForm() {
  // Get form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const plan = document.querySelector('input[name="plan"]:checked')?.value || 'None';
  const addons = Array.from(document.querySelectorAll('.addon:checked')).map(cb => cb.value).join(', ') || 'None';

  // Fill hidden email form
  document.getElementById('hidden-name').value = name;
  document.getElementById('hidden-email').value = email;
  document.getElementById('hidden-phone').value = phone;
  document.getElementById('hidden-plan').value = plan;
  document.getElementById('hidden-addons').value = addons;

  // Submit the form to FormSubmit
  document.getElementById('emailForm').submit();

  // Reset original form visually
  currentStep = 0;
  showStep(currentStep);
  document.querySelectorAll('input').forEach(input => {
    if (input.type === 'radio' || input.type === 'checkbox') input.checked = false;
    else input.value = '';
  });
}

