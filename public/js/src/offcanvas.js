$(document).ready(function () {
  $(document).on('click', '[data-toggle=offcanvas]', function () {
    $('.row-offcanvas').toggleClass('active')
  });
});