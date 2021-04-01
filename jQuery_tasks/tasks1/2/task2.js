/* 
Add new element div with classes "box" and "red" 
and positioned on the second place within the "box-container" element. 
*/
$('<div/>', {
    'class': 'box red',
  })
  .insertAfter('.box-container div:nth-of-type(1)');

/* 
Add new link with class "new", text "new link" and href attribute "#". 
*/
$('<a/>', {
  'class': 'new',
  html: 'new link',
  href: '#'
}).insertAfter('.link-list a:last');

/* 
Switch the places of the div elements and the lists. 
*/
$('.link-list').insertBefore('.box-container');