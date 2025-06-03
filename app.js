
document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".step");
  let currentStep = 0;

  
  const showStep = () => {
    if (!steps.length) return;
    steps.forEach((s, i) => s.classList.toggle("hidden", i !== currentStep));
    const prev = document.getElementById("prevStep");
    const next = document.getElementById("nextStep");
    const submit = document.getElementById("submitBtn");
    if (prev) prev.classList.toggle("hidden", currentStep === 0);
    if (next) next.classList.toggle("hidden", currentStep === steps.length - 1);
    if (submit) submit.classList.toggle("hidden", currentStep !== steps.length - 1);

    steps.forEach((s, i) => s.classList.toggle("hidden", i !== currentStep));
    document.getElementById("prevStep").classList.toggle("hidden", currentStep === 0);
    document.getElementById("nextStep").classList.toggle("hidden", currentStep === steps.length - 1);
    document.getElementById("submitBtn").classList.toggle("hidden", currentStep !== steps.length - 1);
  };

  document.getElementById("prevStep").addEventListener("click", () => {
    if (currentStep > 0) currentStep--;
    showStep();
  });

  document.getElementById("nextStep").addEventListener("click", () => {
    if (currentStep < steps.length - 1) currentStep++;
    showStep();
  });

  console.log("Adding submit listener to form...");
  document.getElementById("taxiForm").addEventListener("submit", (e) => {
    console.log("Form submitted");

    e.preventDefault();
    calculate();
  });

  showStep();
});

function calculate() {
  console.log("calculate() called");

  const trzba = Number(document.getElementById('trzba').value) || 0;
  const km = Number(document.getElementById('km').value) || 0;
  const palivo = Number(document.getElementById('palivo').value) || 0;
  const myti = Number(document.getElementById('myti').value) || 0;
  const kartou = Number(document.getElementById('kartou').value) || 0;
  const fakturou = Number(document.getElementById('fakturou').value) || 0;
  const pristavne = Number(document.getElementById('pristavne').value) || 0;
  const jine = Number(document.getElementById('jine').value) || 0;
  const smena = document.getElementById('typSmeny').value || '';
  const ridic = document.getElementById('driverName').value.trim();

  const hotovost = trzba - kartou - fakturou;
  const naklady = palivo + myti + pristavne + jine;
  const denFirma = (trzba * 0.5) - naklady;
  const vysledekHTML = `
    <h3>Výčetka pro ${ridic}</h3>
    <ul>
      <li><strong>Směna:</strong> ${smena}</li>
      <li><strong>Tržba:</strong> ${trzba} Kč</li>
      <li><strong>Kartou:</strong> ${kartou} Kč</li>
      <li><strong>Fakturou:</strong> ${fakturou} Kč</li>
      <li><strong>Hotovost:</strong> ${hotovost} Kč</li>
      <li><strong>Náklady:</strong> ${naklady} Kč</li>
      <li><strong>Zisk firmy:</strong> ${denFirma} Kč</li>
    </ul>
  `;

  document.getElementById('outputBox').innerHTML = vysledekHTML;
  document.getElementById('output-section').classList.remove('hidden');
  window.scrollTo({ top: document.getElementById('output-section').offsetTop, behavior: 'smooth' });
}

function newShift() {
  window.location.reload();
}

function downloadPDF() {
  alert('Export do PDF zatím není implementován');
}

function shareResult() {
  alert('Sdílení zatím není implementováno');
}
