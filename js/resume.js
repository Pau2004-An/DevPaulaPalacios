const cvLang = document.getElementById("cvLang");
const cvFrame = document.getElementById("cvFrame");
const downloadBtn = document.getElementById("downloadBtn");
const navDownloadBtn = document.getElementById("navDownloadBtn");
const openPdfBtn = document.getElementById("openPdfBtn");
const documentLanguage = document.getElementById("documentLanguage");

function updateCV(lang) {
  const isEnglish = lang === "en";
  const file = isEnglish
    ? "cv/Paula_Palacios_Frontend_Developer_EN.pdf"
    : "cv/Paula_Palacios_Frontend_Developer.pdf";

  cvFrame.src = file;
  downloadBtn.href = file;
  navDownloadBtn.href = file;
  openPdfBtn.href = file;
  documentLanguage.textContent = isEnglish
    ? "English version"
    : "Versión en español";
}

updateCV(cvLang.value);

cvLang.addEventListener("change", function () {
  updateCV(this.value);
});
