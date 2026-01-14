const cvLang = document.getElementById("cvLang");
const cvFrame = document.getElementById("cvFrame");
const downloadBtn = document.getElementById("downloadBtn");

function updateCV(lang) {
  if (lang === "en") {
    cvFrame.src = "cv/CV_Front-End-Engineer.pdf";
    downloadBtn.href = "cv/CV_Front-End-Engineer.pdf";
  } else {
    cvFrame.src = "cv/CV_Ingeniera-Front-End.pdf";
    downloadBtn.href = "cv/CV_Ingeniera-Front-End.pdf";
  }
}

// Al cargar la página inicializamos en inglés
updateCV(cvLang.value);

// Cuando cambie el selector
cvLang.addEventListener("change", function () {
  updateCV(this.value);
});


