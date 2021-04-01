const boxes = $('.box');

/* 
Add click event listener on each list element which would show 
alert that contains the text of the clicked element. 
*/
$('li').click(function () {
    alert($(this).text());
});

/* 
Add click event to the boxes that changes the color of the clicked 
one to red and restoring the original color if it's clicked again.  
*/
boxes.click(function () {
    $(this).toggleClass('red');
});

/* 
Add similar event to the links that changes the color of all 
the boxes (from the original to red and vice versa). 
*/
$('.button').click(function () {
    if ($('.box:first').hasClass('red')) {
        boxes.each(function () {
            $(this).removeClass('red');
        });
    } else {
        boxes.each(function () {
            $(this).addClass('red');
        });
    }
});