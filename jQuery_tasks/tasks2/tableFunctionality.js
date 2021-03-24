function changeNumberInCell(ev) {
    if (ev.target.className.includes('cell')) {
        if (ev.target.className.includes('constant')) {
            return alert('You cant change this number.');
        } else {
            let currentNumber = Number(ev.target.textContent);
            if (currentNumber == 9) {
                ev.target.textContent = 1;
            } else {
                ev.target.textContent = currentNumber + 1;
            }
        }
    }
}

export function drawSudoku(data) {
    return new Promise(resolve => {
        const sudoku = $('<div/>', {
            'class': 'sudoku',
        });
        data.board.forEach(row => row.forEach(num => {
            const cell = createSudokuCell(num);
            cell.appendTo(sudoku);
        }));
        sudoku.click(changeNumberInCell);
        resolve(sudoku);
    });
}

export function prepareDataForPostReq() {
    return new Promise(resolve => {
        const data = {
            board: []
        };

        const cellsArr = [...document.querySelectorAll('.sudoku div.cell')];

        try {
            for (let i = 0; i < 81; i += 9) {
                const boardRow = [];
                for (let y = 0; y < 9; y++) {
                    // if (Number(cellsArr[i + y].textContent) == 0) {
                    //     throw new Error('Please fill all cells.');
                    // }
                    boardRow.push(Number(cellsArr[i + y].textContent));
                }
                data.board.push(boardRow);
            }
            resolve(data);
        } catch (err) {
            return alert(err.message);
        }
    });
}

function createSudokuCell(num) {
    let cell;
    if (num > 0) {
        cell = $('<div/>', {
            'class': 'cell constant',
            html: num,
        });
    } else {
        cell = $('<div/>', {
            'class': 'cell'
        });
    }
    return cell;
}