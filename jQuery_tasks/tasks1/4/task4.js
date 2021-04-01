/* 
Make the rectangle disappear if the user clicks it. 
*/
$('.box').click(function () {
    $(this).toggle();
});

/* 
Make the ball slide to the right end of the "circle-container"
 for 2 seconds if the check box is selected. If the check box is 
 unselected the ball should slide back to the left side of the
  "circle-container" for 3 seconds. 
*/
$('#checkbox').click(function () {
    if ($(this).prop('checked')) {
        $('.circle').animate({
                left: `+=${$('.circle-container').width() - $('.circle').width()}`,
            },
            2000);
    } else {
        $('.circle').animate({
                left: `-=${$('.circle-container').width() - $('.circle').width()}`,
            },
            3000);
    }
});

$(document).ready(function (e) {
    $('#checkbox').prop('checked', false);
});