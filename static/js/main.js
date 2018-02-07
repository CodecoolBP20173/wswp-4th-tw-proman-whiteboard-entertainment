// This function is to initialize the application
function init() {
    DataHandler.init();

    let boards = DataHandler._data.boards;
    if (boards !== undefined && boards.length > 0) {
        for (let i = 0; i < boards.length; i++)
        {
            DOM.showBoard(boards[i]);
        }
    }

    let newBoardButton = document.getElementById(DOM.Constants.CreateBoardIDs.BUTTON_ID);
    newBoardButton.addEventListener('click', function() {
        let title = document.getElementById(DOM.Constants.CreateBoardIDs.INPUT_ID).value;
        document.getElementById(DOM.Constants.CreateBoardIDs.INPUT_ID).value = "";
        DataHandler.createNewBoard(title, DOM.showBoard);
    });
    // it uses the dom.js to show boards
}

init();
