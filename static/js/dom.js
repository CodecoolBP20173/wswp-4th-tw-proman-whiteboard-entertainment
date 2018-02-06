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


    // returns rendered html codes:
    Template: {
        generateBoard: function(board_details) {

        },

        generateCard: function(card_details) {

        }
    },


    showBoards: function(boards) {
        let boardHTML = Templates.boardTemplate(boards);
        let container = document.getElementById('accordion');
        container.innerHTML = container.innerHTML + boardHTML;
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
