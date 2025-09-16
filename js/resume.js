const cvLang = document.getElementById("cvLang");
const cvFrame = document.getElementById("cvFrame");
const downloadBtn = document.getElementById("downloadBtn");

function updateCV(lang) {
  if (lang === "en") {
    cvFrame.src = "cv/HV-FrontDeveloper_EN.pdf";
    downloadBtn.href = "cv/HV-FrontDeveloper_EN.pdf";
  } else {
    cvFrame.src = "cv/HV-FrontDeveloper.pdf";
    downloadBtn.href = "cv/HV-FrontDeveloper.pdf";
  }
}

// Al cargar la página inicializamos en inglés
updateCV(cvLang.value);

// Cuando cambie el selector
cvLang.addEventListener("change", function () {
  updateCV(this.value);
});


