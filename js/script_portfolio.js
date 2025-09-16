// shuffle.js
var shuffleme = (function ($) {
  "use strict";

  var $grid = $("#grid"),
    $btns = $(".portfolio-sorting a"),
    shuffleInstance = null;

  var init = function () {
    // instanciar Shuffle
    if ($grid.length && typeof Shuffle !== "undefined") {
      shuffleInstance = new Shuffle($grid[0], {
        itemSelector: '[class*="col-"]',
      });
      setupFilters();
      listen();
    } else {
      console.error("Shuffle.js no encontrado o #grid ausente.");
    }
  };

  // Configurar los filtros
  var setupFilters = function () {
    $btns.on("click", function (e) {
      e.preventDefault();
      var $this = $(this);
      var group = $this.data("group") || "all";

      // cambiar clases activas
      $btns.removeClass("active");
      $this.addClass("active");

      // aplicar filtro
      if (typeof shuffleInstance.filter === "function") {
        // Versión 5+
        if (group === "all") {
          shuffleInstance.filter(); // sin parámetro = mostrar todo
        } else {
          shuffleInstance.filter(group);
        }
      } else if (typeof shuffleInstance.shuffle === "function") {
        // Versión 4
        shuffleInstance.shuffle(group === "all" ? Shuffle.ALL_ITEMS : group);
      }
    });
  };

  // Recalcular layout cuando cargan imágenes
  var listen = function () {
    var debouncedLayout = function () {
      if (shuffleInstance) shuffleInstance.update();
    };

    $grid.find("img").each(function () {
      if (!this.complete || this.naturalWidth === undefined) {
        var proxyImage = new Image();
        $(proxyImage).on("load", function () {
          $(this).off("load");
          debouncedLayout();
        });
        proxyImage.src = this.src;
      }
    });

    setTimeout(function () {
      debouncedLayout();
    }, 500);
  };

  return {
    init: init,
  };
})(jQuery);

// Iniciar si #grid existe
$(function () {
  if ($("#grid").length > 0) {
    shuffleme.init();
  }
});
