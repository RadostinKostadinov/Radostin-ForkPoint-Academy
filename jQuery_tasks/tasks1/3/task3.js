//Add click event listener on each list element which would show 
//alert that contains the text of the clicked element.
$('li').click(function (ev) {
    alert($(this).text());
});

//Change the color of the element on hovering over it and
//restore the original color after the cursor is not over the element.
$('li').hover(function (ev) {
    $(this).css('color', 'red');
}, function (ev) {
    $(this).css('color', 'black');
});

// Add click event to the boxes that changes the color of the clicked 
//one to red and restoring the original color if it's clicked again. 


$('.box').click(function (ev) {
    $(this).toggleClass('red');
});

//Add similar event to the links that changes the color of all 
//the boxes (from the original to red and vice versa).
$('.button').click(function (ev) {
    if($('.box:first').hasClass('red')){
        $('.box').each(function() {
            $(this).removeClass('red');
        });
    } else {
        $('.box').each(function() {
            $(this).addClass('red');
        });
    }
}); 