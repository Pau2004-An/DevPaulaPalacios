jQuery(document).ready(function($) {
  "use strict";

  $('form.contactForm').submit(function(e) {
    e.preventDefault(); 

    var f = $(this).find('.form-group'),
        ferror = false,
        emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    // Validar inputs
    f.children('input').each(function() {
      var i = $(this);
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false;
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') { ferror = ierror = true; }
            break;
          case 'minlen':
            if (i.val().length < parseInt(exp)) { ferror = ierror = true; }
            break;
          case 'email':
            if (!emailExp.test(i.val())) { ferror = ierror = true; }
            break;
          case 'checked':
            if (!i.is(':checked')) { ferror = ierror = true; }
            break;
          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) { ferror = ierror = true; }
            break;
        }
        i.next('.validation').html(
          (ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')
        ).show('blind');
      }
    });

    // Validar textareas
    f.children('textarea').each(function() {
      var i = $(this);
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false;
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') { ferror = ierror = true; }
            break;
          case 'minlen':
            if (i.val().length < parseInt(exp)) { ferror = ierror = true; }
            break;
        }
        i.next('.validation').html(
          (ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')
        ).show('blind');
      }
    });


    if (ferror) return false;
    var str = $(this).serialize();
    var action = $(this).attr('action');

    $.ajax({
      type: "POST",
      url: action,
      data: str,
      dataType: "json",
      success: function() {
        $('.contactForm').find("input, textarea").val(""); 
        $('#successModal').modal('show'); // abrir modal de éxito
      },
      error: function() {
        $('#errormessage').html("Hubo un error al enviar el formulario, intenta de nuevo.").addClass("show");
      }
    });

    return false;
  });

});
