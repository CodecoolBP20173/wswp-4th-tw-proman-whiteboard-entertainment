// It uses data_handler.js to visualize elements
DOM = {
    openedBoardId: null,

    Constants: {
        HTMLPrefixes: {
            BOARD_ID: 'board_',
            STATUS_COLUMN_ID: 'status_column_',
            CARD_ID: 'card_'
        },

        CreateBoardIDs: {
            INPUT_ID: 'create-board-input',
            BUTTON_ID: 'create-board-button'
        }
    },


    showBoard: function(boards) {
        let cardsByBoard = DataHandler.getCardsByBoardId(boards.id);
        let statuses = DataHandler.getStatuses();
        let boardHTML = Templates.boardTemplate(boards);
        let container = document.getElementById('accordion');
        container.innerHTML = container.innerHTML + boardHTML;
        let columnContainer = document.getElementById(DOM.Constants.HTMLPrefixes.BOARD_ID + boards.id);

        for (let i = 0; i < statuses.length; i++) {
            let cardsHTML = ``;
            let columnHTML = Templates.columnTemplate(statuses[i], boards.id);
            columnContainer.innerHTML = columnContainer.innerHTML + columnHTML;
            let cardContainer = document.getElementById(boards.id + "-" + DOM.Constants.HTMLPrefixes.STATUS_COLUMN_ID + statuses[i].id);

            if (cardsByBoard !== undefined) {
                let cardsForCurrentStatus = cardsByBoard[statuses[i].id];

                for (let j = 0; j < cardsForCurrentStatus.length; j++) {
                    let currentCard = cardsForCurrentStatus[j];
                    cardsHTML += Templates.cardTemplate(currentCard);
                }

                cardContainer.innerHTML = cardContainer.innerHTML + cardsHTML;
            }
        }

        // TODO: close all the boards
        // TODO: open this board
        /*
            By default the freshly generated boards are open (if you create more, then all of them) because that's
            how the templates are made.
            We either close all the boards and open this board OR make the template to be created as collapsed....
         */

        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        // iterate through boards from local storage and add them to the html code with showBoard function
    },


    openBoard: function(boardId) {
        // generate status columns
        // getCardsByBoardID iterate through of the cards and call generateCard and connect them to the specified status column
        // add the generated dom to the specified board's layout
        // close the other board
        this.openedBoardId = boardId;
    },


    closeBoard: function(boardId) {
        // remove content from the last opened board
        this.openedBoardId = null;
    }


    // here comes more features
};
