//Select all odd items from the first list and add them class "red".
$('.list:first li:odd').addClass('red');
$('.list')
    .eq(0).find('li:even').addClass('blue')
    .end().end()
    .eq(1).find(`li:gt(${this.length - 4})`).addClass('blue');