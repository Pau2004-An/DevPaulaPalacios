// Day/Night Toggle Script
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.getElementById("darkModeToggle");
  const body = document.body;

  // Verifica si hay un modo guardado en localStorage
  if (localStorage.getItem("dark-mode") === "enabled") {
    body.classList.add("dark-mode");
    toggleButton.textContent = "\u2600\uFE0F";
  } else {
    toggleButton.textContent = "\uD83C\uDF19";
  }

  // Evento de click en el botón
  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
      toggleButton.textContent = "\u2600\uFE0F";
      localStorage.setItem("dark-mode", "enabled");
    } else {
      toggleButton.textContent = "\uD83C\uDF19";
      localStorage.setItem("dark-mode", "disabled");
    }
  });
});

