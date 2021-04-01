import * as api from '/requests.js';
import * as table from '/tableFunctionality.js';

$('.btn').one('click', async function (ev) {
    ev.preventDefault();

    const loader = $('.loader');
    const selected = $('#difficulty option:selected').text().trim();

    $('.sudoku').remove();

    if (selected == 'Select...') {
        return alert('Please select difficulty.');
    }

    loader.toggleClass('hidden'); // shows loader
    const data = await api.getSudoku(selected);
    const sudokuTable = table.drawSudoku(data);
    loader.toggleClass('hidden'); // hides loader
    loader.before(sudokuTable);

    $(this).on('click', async function (ev) {
        ev.preventDefault();
        const data = await table.prepareDataForPostReq();
        const response = await api.postSudoku(data);

        let solved = response.solution.map(row => row = `<div>${row.join(' ')}</div>`);

        $('#resultbox').removeClass('hidden').find('.difficulty').text(response.difficulty).end().find('.solution').html(solved);
    });
});