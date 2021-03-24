import * as api from '/requests.js';
import * as table from '/tableFunctionality.js';

$('.btn').one('click', async function (ev) {
    ev.preventDefault();
    $('.sudoku').remove();
    $('.loader').toggleClass('hidden');


    const selected = $('#difficulty option:selected').text().trim();

    if (selected == 'Select...') {
        alert('Please select difficulty.');
    }

    const data = await api.getSudoku(selected);

    // --- Може и без този try-catch, защото преди това проверяваме с if-a..., 
    // но ако някой бутне html-a и добави в section-a други опции(невалидни), ще ги хванем тук.
    // Може и да си направим един масив, само с валидните difficulty-та и да check-ваме там и тогава да изпращаме заявката, тогава ще е по-добре, 
    // защото не правим заявка и пестим от трафик и време, но пак има опастност, ако някой друг добави невалидни данни в тоя масив с difficulty-тата.
    try {
        let sum = 0;
        data.board.forEach(row => row.forEach(num => sum += num));
        if (sum == 0) {
            throw new Error('Invalid difficulty');
        }
    } catch (err) {
        return alert(err.message);
    }
    // ================================================================================================================================================
    console.log(data);
    const sudokuTable = await table.drawSudoku(data);
    $('.loader').toggleClass('hidden').before(sudokuTable);

    $(this).click(async function (ev) {
        ev.preventDefault();
        const data = await table.prepareDataForPostReq();
        const response = await api.postSudoku(data);
        console.log(response);

        let solved = response.solution.reduce((acc, curr) => {
            let row = [];
            curr.forEach(el => row.push(el));
            acc.push(row);
            return acc;
        }, []).map(row => row = `<div>${row.join(' ')}</div>`);

        $('#resultbox').removeClass('hidden').find('.difficulty').text(response.difficulty).end().find('.solution').html(solved);
    });
});

