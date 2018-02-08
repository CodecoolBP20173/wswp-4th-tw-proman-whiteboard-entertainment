Listeners = {
    Constants: {
        MODAL_MODES: {
            CREATE: 'create',
            EDIT: 'edit'
        }
    },

    // This function is to initialize the application
    assignBoardListeners: function(board) {
        let currentBoard = document.getElementById('heading' + board.id);
        currentBoard.addEventListener('mouseenter', function() {
            let addCardButton = Templates.newCardButtonTemplate(board);
            let boardHeader = document.getElementById('heading' + board.id + '-options');
            boardHeader.innerHTML = boardHeader.innerHTML + addCardButton;

            if (boardHeader.children.length < 2) {
                let newCardDOM = document.getElementById(Templates.Constants.HTMLPrefixes.BOARD_ID + board.id + '-create-card');
                newCardDOM.addEventListener('click', function() {
                    let newModal = Templates.modalTemplate('Add new card', 'Card title', 'Add card', Templates.Constants.modalModes.CARD);
                    let modalContainer = document.getElementById('modals');
                    modalContainer.innerHTML = modalContainer.innerHTML + newModal;

                    let modalDOM = $('#create-card-modal');
                    let modalSaveButton = document.getElementById('create-card-button');
                    Listeners.setupModal(modalSaveButton, board, Listeners.Constants.MODAL_MODES.CREATE);
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
    },

    setupModal: function(_modalButton, boardID, mode, card=null) {
        if (mode === Listeners.Constants.MODAL_MODES.CREATE) {
            _modalButton.addEventListener('click', function () {
                let title = document.getElementById('create-card-input').value;
                let statusID = DataHandler.Constants.DEFAULT_DATA.statuses[0].id;
                DataHandler.createNewCard(title, boardID, statusID, DOM.showCard);

                // TODO: We have to remove the modal
                /*
                    It's not so easy, because if we want to remove from the modals div, then first we have to de-attach
                    the eventlistener from the button which triggered it... but it's in that same function so it might cause headache
                 */
            });
        } else if (mode === Listeners.Constants.MODAL_MODES.EDIT) {
            _modalButton.addEventListener('click', function () {
                let title = document.getElementById('create-card-input').value;
                DataHandler.updateCard(card, title);

                // TODO: We have to remove the modal
                /*
                    It's not so easy, because if we want to remove from the modals div, then first we have to de-attach
                    the eventlistener from the button which triggered it... but it's in that same function so it might cause headache
                 */
            });
        }

    },


    assignCardListeners: function(cardDOM, card) {
        cardDOM.addEventListener('click', function() {
            let modalHTML = Templates.modalTemplate('Edit card', 'Card title', 'Save changes', Templates.Constants.modalModes.CARD, card);
            let modalContainer = document.getElementById('modals');
            let modalNode = document.createElement('div');
            modalNode.innerHTML = modalHTML;
            modalContainer.appendChild(modalNode);

            let modalDOM = document.getElementById('create-card-modal');

            let modalSaveButton = document.getElementById('create-' + Templates.Constants.modalModes.CARD + '-button');
            Listeners.setupModal(modalSaveButton, card.board_id, Listeners.Constants.MODAL_MODES.EDIT, card);
            $('#create-card-modal').modal('show');
        });
    }
};
