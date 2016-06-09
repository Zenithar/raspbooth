// The MIT License (MIT)
// Copyright (c) 2016 Thibault NORMAND
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
// of the Software, and to permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

$(function() {
  "use strict";

  // Screenfull handler
  $(".navbar-brand").click( function() {
      screenfull.toggle();
  });

  // Use localStorage to store last preview filename
  var lastpreview = localStorage.getItem("lastpreview")
  if(lastpreview !== "" && lastpreview != undefined && lastpreview != null) {
    $("#preview").attr('src', '/static/preview/' + localStorage.getItem("lastpreview"));
  }

  // Preview button handler
  $("#btnPreview").click( function() {

    // Create a countdown
    var cd = new Countdown(
      4,
      document.querySelector('.count'),
      document.querySelector('#count-template')
    );

    // Overlay (no fade)
    $("#countdown").show();

    setTimeout(function() {
      // Do the barrel roll
      var jqxhr = $.getJSON( "/api/v1/preview", function(data) {
        // Update image source according generate image name
        $("#preview").attr('src', '/static/preview/' + data.filename);
        // Store in the localStorage
        window.localStorage.setItem("lastpreview", data.filename);
      }).always( function() {
        // Fade the overlay out
        $("#countdown").fadeOut("slow");
      });
    }, 2000);
  });

  // Print button handler
  $("#btnPrint").click( function() {
    // Overlay
    $("#overlaytext").text("Impression en cours ...");
    $("#overlay").fadeIn("fast");

    // Send the print request
    var jqxhr = $.getJSON( "/api/v1/print", function() {

    }).always( function() {
      setTimeout( function() {
        $("#overlay").fadeOut("slow");
      }, 50000);
    });
  });
});
