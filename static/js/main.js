function init() {
    DataHandler.init();

    let boards = DataHandler._data.boards;
    if (boards !== undefined && boards.length > 0) {
        for (let i = 0; i < boards.length; i++)
        {
            DOM.showBoard(boards[i]);
        }
    }


    let modalHTML = Templates.modalTemplate('Add new board', 'Board title', 'Create board', Templates.Constants.modalModes.BOARD);
    let modalContainer = document.getElementById('modals');
    modalContainer.innerHTML = modalContainer.innerHTML + modalHTML;
    let newBoardButton = document.getElementById(DOM.Constants.CreateBoardIDs.BUTTON_ID);
    newBoardButton.addEventListener('click', function() {
        let title = document.getElementById(DOM.Constants.CreateBoardIDs.INPUT_ID).value;
        document.getElementById(DOM.Constants.CreateBoardIDs.INPUT_ID).value = "";
        DataHandler.createNewBoard(title, DOM.showBoard);
    });
    // it uses the dom.js to show boards
}

init();
