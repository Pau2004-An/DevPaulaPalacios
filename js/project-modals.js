document.addEventListener("DOMContentLoaded", function () {
  var projectModals = document.querySelectorAll(
    '.modal.fade-scale[id^="portfolio"]',
  );

  function normalizeText(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function splitSentences(value) {
    return value.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
  }

  projectModals.forEach(function (modal) {
    var legacyContent = modal.querySelector(".modal-content");
    var legacyImage = modal.querySelector(".modal-header img");
    var legacyTitle = modal.querySelector(".modal-title");
    var legacyDescription = modal.querySelector(".modal-body p");
    var legacyLink = modal.querySelector(".modal-footer a");

    if (
      !legacyContent ||
      !legacyImage ||
      !legacyTitle ||
      !legacyDescription
    ) {
      return;
    }

    var trigger = document.querySelector(
      '[data-target="#' + modal.id + '"]',
    );
    var projectCard = trigger ? trigger.closest(".portfolio-item") : null;
    var projectType = projectCard
      ? normalizeText(
          (projectCard.querySelector(".portfolio-info p") || {}).textContent ||
            "Web Project",
        )
      : "Web Project";
    var technologies = projectCard
      ? projectCard.querySelector(".tech-icons")
      : null;

    var fullDescription = normalizeText(legacyDescription.textContent);
    var roleMarker = fullDescription.search(/My role\s*:/i);
    var overview =
      roleMarker >= 0
        ? fullDescription.slice(0, roleMarker).trim()
        : fullDescription;
    var role =
      roleMarker >= 0
        ? fullDescription.slice(roleMarker).replace(/My role\s*:/i, "").trim()
        : "I developed the project from planning through implementation, focusing on usability, responsive behavior, and maintainable code.";

    var overviewSentences = splitSentences(overview);
    var roleSentences = splitSentences(role);
    var summary = normalizeText(
      overviewSentences.slice(0, 2).join(" ") || overview,
    );
    var challenge = normalizeText(
      overviewSentences.slice(2).join(" ") ||
        overviewSentences.slice(0, 2).join(" ") ||
        overview,
    );
    var solution = normalizeText(
      roleSentences.slice(0, Math.max(1, roleSentences.length - 1)).join(" ") ||
        role,
    );
    var impact = normalizeText(
      roleSentences.length > 1
        ? roleSentences.slice(-1).join(" ")
        : "The result is a responsive, maintainable digital experience aligned with the project’s goals.",
    );

    var imageSource = legacyImage.getAttribute("src").replace(/^\/img\//, "img/");
    var title = normalizeText(legacyTitle.textContent);
    var linkHref = legacyLink ? legacyLink.getAttribute("href") : "";
    var linkLabel = legacyLink
      ? normalizeText(legacyLink.textContent)
      : "Visit Live Site";
    var technologyMarkup = technologies
      ? technologies.innerHTML
      : '<i class="fa-solid fa-code" aria-hidden="true"></i>';

    modal.classList.add("project-modal");
    modal.setAttribute("aria-labelledby", modal.id + "-title");
    modal.setAttribute("aria-hidden", "true");

    legacyContent.innerHTML =
      '<button type="button" class="project-modal-close" data-dismiss="modal" aria-label="Close project details">' +
      '<i class="fa-solid fa-xmark" aria-hidden="true"></i>' +
      "</button>" +
      '<div class="project-modal-grid">' +
      '<div class="project-modal-visual">' +
      '<div class="project-modal-image">' +
      '<img src="' +
      imageSource +
      '" alt="' +
      title +
      ' project preview" />' +
      (linkHref
        ? '<a href="' +
          linkHref +
          '" target="_blank" rel="noopener noreferrer" aria-label="Open ' +
          title +
          '"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>'
        : "") +
      "</div>" +
      '<div class="project-modal-meta">' +
      '<div class="project-meta-item"><span>Project type</span><strong><i class="fa-solid fa-display"></i>' +
      projectType +
      "</strong></div>" +
      '<div class="project-meta-item"><span>My role</span><strong><i class="fa-solid fa-user-gear"></i>Front-End Developer</strong></div>' +
      '<div class="project-meta-item project-meta-tech"><span>Technologies</span><div class="project-modal-tech">' +
      technologyMarkup +
      "</div></div>" +
      "</div>" +
      (linkHref
        ? '<a class="project-modal-link" href="' +
          linkHref +
          '" target="_blank" rel="noopener noreferrer"><i class="fa-solid fa-arrow-up-right-from-square"></i>' +
          linkLabel +
          "</a>"
        : "") +
      "</div>" +
      '<div class="project-modal-details">' +
      '<div class="project-featured"><i class="fa-solid fa-star"></i> Featured project</div>' +
      '<h4 id="' +
      modal.id +
      '-title">' +
      title +
      "</h4>" +
      '<p class="project-modal-summary">' +
      summary +
      "</p>" +
      '<div class="project-modal-divider"></div>' +
      '<article class="project-detail-item"><i class="fa-regular fa-circle-dot"></i><div><h5>The Challenge</h5><p>' +
      challenge +
      "</p></div></article>" +
      '<article class="project-detail-item"><i class="fa-solid fa-circle-check"></i><div><h5>The Solution</h5><p>' +
      solution +
      "</p></div></article>" +
      '<article class="project-detail-item"><i class="fa-solid fa-star"></i><div><h5>My Impact</h5><p>' +
      impact +
      "</p></div></article>" +
      '<div class="project-modal-results">' +
      '<div><i class="fa-solid fa-display"></i><strong>100%</strong><span>Responsive</span></div>' +
      '<div><i class="fa-solid fa-gauge-high"></i><strong>Optimized</strong><span>Performance</span></div>' +
      '<div><i class="fa-solid fa-magnifying-glass"></i><strong>SEO</strong><span>Focused</span></div>' +
      '<div><i class="fa-regular fa-face-smile"></i><strong>UX</strong><span>User-centered</span></div>' +
      "</div>" +
      "</div>" +
      "</div>";
  });
});
