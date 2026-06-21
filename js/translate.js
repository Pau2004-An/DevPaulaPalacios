function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: "es",
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    "google_translate_element"
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const languageButtons = document.querySelectorAll("[data-language]");
  const translatedToSpanish = document.cookie.includes("googtrans=/en/es");

  languageButtons.forEach(function (button) {
    const language = button.getAttribute("data-language");
    button.classList.toggle(
      "active",
      translatedToSpanish ? language === "es" : language === "en",
    );

    button.addEventListener("click", function () {
      const translation = language === "es" ? "/en/es" : "/en/en";
      document.cookie = "googtrans=" + translation + ";path=/";
      window.location.reload();
    });
  });
});
