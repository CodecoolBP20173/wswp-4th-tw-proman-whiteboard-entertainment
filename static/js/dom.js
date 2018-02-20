// It uses data_handler.js to visualize elements
DOM = {
    openedBoardId: null,
    drake: null,

    Constants: {
        MODAL_CONTAINER_ID: Templates.Constants.HTMLPrefixes.MODAL + 'container',
        CREATE_BOARD_BUTTON_ID: Templates.Constants.HTMLPrefixes.BUTTON + 'create-new-board-navbar',
        MAIN_DIV_ID: 'main-content-container',

        ModalIDs: {
            CREATE_BOARD: Templates.Constants.HTMLPrefixes.MODAL + 'create-board',
            CREATE_CARD: Templates.Constants.HTMLPrefixes.MODAL + 'create-card',
            EDIT_CARD: Templates.Constants.HTMLPrefixes.MODAL + 'edit-card',
        }
    },

    Dragula: {
        _drake: null,

        _convertElementArray: (unconvertedArray) => Array.prototype.slice.call(unconvertedArray),

        addListener: function (type, callback) {
            DOM.Dragula._drake.on(type, callback);
        },

        refresh(elementArray, dropCallback) {
            if (DOM.Dragula._drake !== null) {
                DOM.Dragula._drake.destroy();
            }

            DOM.Dragula._drake = dragula({ containers: DOM.Dragula._convertElementArray(elementArray) });
        }
    },

    Modals: {
        create: function (title, inputLabel, inputValue, confirmButtonLabel, closeButtonLabel, modalId) {
            let modalContainer = document.getElementById(DOM.Constants.MODAL_CONTAINER_ID);

            modalContainer.appendChild(Templates.createHTMLElementFromString(Templates.modalTemplate(
                title, inputLabel, inputValue, confirmButtonLabel, closeButtonLabel, modalId
            )));
        },

        getInputValue: (modalId) => document.getElementById(Templates.Constants.HTMLPrefixes.INPUT + modalId).value,

        setInputValue: function (modalId, newValue) {
            document.getElementById(Templates.Constants.HTMLPrefixes.INPUT + modalId).value = newValue;
        },

        setConfirmationEvent: function (modalId, eventCallback) {
            document.getElementById(Templates.Constants.HTMLPrefixes.BUTTON + modalId).onclick = eventCallback;
        },
    },


    compareCardOrders: function(cardA, cardB) {
        if (cardA.order < cardB.order)
            return -1;
        if (cardA.order > cardB.order)
            return 1;
        return 0;
    },


    showBoard: function(board) {
        let cardsByBoard = DataHandler.getCardsByBoardId(board.id);
        let statuses = DataHandler.getStatuses();
        let boardHTML = Templates.boardTemplate(board);
        let container = document.getElementById('accordion');
        let node = document.createElement('div');
        node.innerHTML = boardHTML;
        container.appendChild(node);
        let columnContainer = document.getElementById(Templates.Constants.HTMLPrefixes.BOARD_ID + board.id);
        Listeners.assignCreateCardListener(board);

        for (let i = 0; i < statuses.length; i++) {
            let columnHTML = Templates.columnTemplate(statuses[i], board.id);
            columnContainer.innerHTML = columnContainer.innerHTML + columnHTML;
            if (cardsByBoard !== undefined) {
                let cardsForCurrentStatus = cardsByBoard[statuses[i].id].sort(DOM.compareCardOrders);

                for (let j = 0; j < cardsForCurrentStatus.length; j++) {
                    let currentCard = cardsForCurrentStatus[j];
                    DOM.showCard(currentCard);
                }
            }
        }
        DOM.Dragula.refresh(document.getElementsByClassName('column-body'));
        DOM.Dragula.addListener('drop', function(element) {
            DataHandler.sortCards(element.parentNode.id);
        });
    },


    showBoards: function () {
        /*
        let boards = DataHandler.getBoards();
        if (boards !== undefined && boards.length > 0) {
            for (let i = 0; i < boards.length; i++) {
                DOM.showBoard(boards[i]);
            }
        }*/
        DataHandler.getBoards(DOM.showBoard);
    },


    updateCardTitle: function(card) {
        let cardElement = document.getElementById(Templates.Constants.HTMLPrefixes.CARD_ID + card.id);
        cardElement.innerText = card.title;
    },


    showNavbar: function() {
        document.getElementById(DOM.Constants.MAIN_DIV_ID).appendChild(Templates.createHTMLElementFromString(Templates.navbarTemplate()));
    },


    showFooter: function() {
        document.getElementById(DOM.Constants.MAIN_DIV_ID).appendChild(Templates.createHTMLElementFromString(Templates.footerTemplate()));
    },


    showCard: function(card) {
        let cardContainer = document.getElementById(card.board_id + "-" + Templates.Constants.HTMLPrefixes.STATUS_COLUMN_ID + card.status_id);
        let cardHTML = Templates.cardTemplate(card);
        cardContainer.appendChild(Templates.createHTMLElementFromString(cardHTML));

        Listeners.assignEditCardListener(card);
    },

    initBootstrap: function() {
        document.getElementById(DOM.Constants.MAIN_DIV_ID).appendChild(Templates.createHTMLElementFromString(Templates.bootstrapTemplate()));
    },

    init: function() {
        DOM.showNavbar();
        DOM.initBootstrap();

        DOM.Modals.create('Create new board', 'Board title:', '', 'Create board', 'Cancel', DOM.Constants.ModalIDs.CREATE_BOARD);
        DOM.Modals.create('Add new card', 'Card title:', '', 'Add card', 'Cancel', DOM.Constants.ModalIDs.CREATE_CARD);
        DOM.Modals.create('Edit card', 'Card title:', '', 'Edit card', 'Cancel', DOM.Constants.ModalIDs.EDIT_CARD);
        Listeners.assignCreateBoardListener();

        DOM.showBoards();
        DOM.showFooter();
    }
};
