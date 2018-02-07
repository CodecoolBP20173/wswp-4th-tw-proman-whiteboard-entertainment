// This function is to initialize the application
function assignBoardListeners(board) {
    let currentBoard = document.getElementById('heading' + board.id);
    currentBoard.addEventListener('mouseenter', function() {
        let addCardButton = Templates.newCardButtonTemplate(board);
        let boardHeader = document.getElementById('heading' + board.id + '-options');
        boardHeader.innerHTML = boardHeader.innerHTML + addCardButton;

        if (boardHeader.children.length < 2) {
            let newCardDOM = document.getElementById(Templates.Constants.HTMLPrefixes.BOARD_ID + board.id + '-create-card');
            newCardDOM.addEventListener('click', function() {
                let newModal = Templates.modalTemplate('Add new card', 'Card title', 'Add card', 'card');
                let modalContainer = document.getElementById('modals');
                modalContainer.innerHTML = modalContainer.innerHTML + newModal;

                let modalDOM = $('#create-card-modal');
                setupModal(modalDOM, board);
                modalDOM.modal('show');
            });
        }

    });
    currentBoard.addEventListener('mouseleave', function() {
        let buttons = document.getElementsByClassName('plus');
        while (buttons.length) {
            let currentButton = buttons[0];
            currentButton.parentNode.removeChild(currentButton);
        }
    });
}


function setupModal(_modal, board) {
    _modal.on('hidden.bs.modal', function () {
        let title = document.getElementById('create-card-input').value;
        let boardID = board.id;
        let statusID = DataHandler.Constants.DEFAULT_DATA.statuses[0].id;
        DataHandler.createNewCard(title, boardID, statusID, DOM.showCard);
        let node = document.getElementById('modals');

        // TODO: We have to remove the modal
        /*
            It's not so easy, because if we want to remove from the modals div, then first we have to de-attach
            the eventlistener from the button which triggered it... but it's in that same function so it might cause headache
         */
    });
}


function init() {
    DataHandler.init();

    let boards = DataHandler._data.boards;
    if (boards !== undefined && boards.length > 0) {
        for (let i = 0; i < boards.length; i++)
        {
            DOM.showBoard(boards[i]);
            assignBoardListeners(boards[i]);
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
