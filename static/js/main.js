$(function() {
  "use strict";

  $(".navbar-brand").click( function() {
      screenfull.toggle();
  });

  $("#btnPreview").click( function() {
    $("#overlaytext").text("Updating preview ...");
    $("#overlay").fadeIn("fast");

    var jqxhr = $.getJSON( "/api/v1/preview", function(data) {
      $("#preview").attr('src', '/static/preview/' + data.filename);
    }).always( function() {
      $("#overlay").fadeOut("slow");
    });
  });

  $("#btnPrint").click( function() {
    $("#overlaytext").text("Printing the current preview ...");
    $("#overlay").fadeIn("fast");

    var jqxhr = $.getJSON( "/api/v1/print", function() {

    }).always( function() {
      $("#overlay").fadeOut("slow");
    });
  });
});
