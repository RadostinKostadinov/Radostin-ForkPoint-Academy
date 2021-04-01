export async function getSudoku(difficulty) {
    return $.ajax({
        url: 'https://sugoku.herokuapp.com/board?difficulty=' + difficulty,
        method: 'GET',
        success: function (data) {
            return data;
        },
        error: function (xhr, status, errorThrown) {
            console.log('Error: ' + errorThrown);
            console.log('Status: ' + status);
            console.dir(xhr);
        }
    });
}

export async function postSudoku(data) {
    return $.ajax({
        url: 'https://sugoku.herokuapp.com/solve',
        method: 'POST',
        data,
    }).done(function (response) {
        return response;
    });
}