Listeners = {

    // This function is to initialize the application
    assignCreateCardListener: function(board) {
        let currentBoard = document.getElementById(Templates.Constants.HTMLPrefixes.HEADING + board.id);

        currentBoard.addEventListener('mouseenter', function() {
            let buttonId = Templates.Constants.HTMLPrefixes.BUTTON + Templates.Constants.HTMLPrefixes.BOARD_ID + board.id + '-create-card';
            let editButtonId = Templates.Constants.HTMLPrefixes.BUTTON + Templates.Constants.HTMLPrefixes.BOARD_ID + board.id + '-edit-board';
            document.getElementById(buttonId).style.visibility = 'visible';
            document.getElementById(editButtonId).style.visibility = 'visible';

        });

        currentBoard.addEventListener('mouseleave', function() {
            let buttonId = Templates.Constants.HTMLPrefixes.BUTTON + Templates.Constants.HTMLPrefixes.BOARD_ID + board.id + '-create-card';
            let editButtonId = Templates.Constants.HTMLPrefixes.BUTTON + Templates.Constants.HTMLPrefixes.BOARD_ID + board.id + '-edit-board';
            document.getElementById(buttonId).style.visibility = 'hidden';
            document.getElementById(editButtonId).style.visibility = 'hidden';

        });

        let buttonId = Templates.Constants.HTMLPrefixes.BUTTON + Templates.Constants.HTMLPrefixes.BOARD_ID + board.id + '-create-card';
        document.getElementById(buttonId).addEventListener('click', function () {
            DOM.Modals.setConfirmationEvent(DOM.Constants.ModalIDs.CREATE_CARD, function () {
                let title = DOM.Modals.getInputValue(DOM.Constants.ModalIDs.CREATE_CARD);
                let statusId = DataHandler.Constants.DEFAULT_DATA.statuses[0].id;
                DataHandler.createNewCard(title, board.id, statusId, DOM.showCard);
            });

            DOM.Modals.setInputValue(DOM.Constants.ModalIDs.CREATE_CARD, '');
            $('#' + DOM.Constants.ModalIDs.CREATE_CARD).modal('show');
        });

        let editButtonId = Templates.Constants.HTMLPrefixes.BUTTON + Templates.Constants.HTMLPrefixes.BOARD_ID + board.id + '-edit-board';
        document.getElementById(editButtonId).addEventListener('click', function () {
            DOM.Modals.setConfirmationEvent(DOM.Constants.ModalIDs.EDIT_BOARD, function () {
                let title = DOM.Modals.getInputValue(DOM.Constants.ModalIDs.EDIT_BOARD);
                DataHandler.editBoard(board.id, title);
                $('#' + Templates.Constants.HTMLPrefixes.BOARD_ID + board.id + '-title')[0].innerHTML = title;
            });

            let boardTitle = $('#' + Templates.Constants.HTMLPrefixes.BOARD_ID + board.id + '-title')[0].innerText;
            DOM.Modals.setInputValue(DOM.Constants.ModalIDs.EDIT_BOARD, boardTitle);
            $('#' + DOM.Constants.ModalIDs.EDIT_BOARD).modal('show');
        })
    },


    assignCreateBoardListener: function() {
        DOM.Modals.setConfirmationEvent(DOM.Constants.ModalIDs.CREATE_BOARD, function () {
            DataHandler.createNewBoard(DOM.Modals.getInputValue(DOM.Constants.ModalIDs.CREATE_BOARD), DOM.showBoard);
        });

        document.getElementById(DOM.Constants.CREATE_BOARD_BUTTON_ID).addEventListener('click', function() {
            DOM.Modals.setInputValue(DOM.Constants.ModalIDs.CREATE_BOARD, '');
            $('#' + DOM.Constants.ModalIDs.CREATE_BOARD).modal('show');
        });
    },


    assignEditCardListener: function(card) {
        let cardElement = document.getElementById(Templates.Constants.HTMLPrefixes.BUTTON + Templates.Constants.HTMLPrefixes.CARD_ID + card.id + '-edit-card');
        console.log(cardElement);

        cardElement.addEventListener('click', function() {
            DOM.Modals.setInputValue(DOM.Constants.ModalIDs.EDIT_CARD, card.title);

            DOM.Modals.setConfirmationEvent(DOM.Constants.ModalIDs.EDIT_CARD, function () {
                let title = DOM.Modals.getInputValue(DOM.Constants.ModalIDs.EDIT_CARD);
                DataHandler.updateCard(card, title, DataHandler.editCard());
                DOM.updateCardTitle(card)
            });

            $('#' + DOM.Constants.ModalIDs.EDIT_CARD).modal('show');
        });
    }
};
