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
        let node = document.createElement('div');
        node.innerHTML = boardHTML;
        container.appendChild(node);
        let columnContainer = document.getElementById(DOM.Constants.HTMLPrefixes.BOARD_ID + boards.id);
        Listeners.assignBoardListeners(boards);

        for (let i = 0; i < statuses.length; i++) {
            let cardsHTML = ``;
            let columnHTML = Templates.columnTemplate(statuses[i], boards.id);
            columnContainer.innerHTML = columnContainer.innerHTML + columnHTML;
            let cardContainer = document.getElementById(boards.id + "-" + DOM.Constants.HTMLPrefixes.STATUS_COLUMN_ID + statuses[i].id);
            if (cardsByBoard !== undefined) {
                let cardsForCurrentStatus = cardsByBoard[statuses[i].id];

                for (let j = 0; j < cardsForCurrentStatus.length; j++) {
                    let currentCard = cardsForCurrentStatus[j];
                    //cardsHTML += Templates.cardTemplate(currentCard);
                    DOM.showCard(currentCard);
                }

                //cardContainer.innerHTML = cardContainer.innerHTML + cardsHTML;
            }
        }
        let arraylike = document.getElementsByClassName('column-body');
        let containers = Array.prototype.slice.call(arraylike);
        let drake = dragula({ containers: containers });

        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        // iterate through boards from local storage and add them to the html code with showBoard function
    },


    showCard: function(card) {
        let cardContainer = document.getElementById(card.board_id + "-" + DOM.Constants.HTMLPrefixes.STATUS_COLUMN_ID + card.status_id);
        let cardHTML = Templates.cardTemplate(card);
        //cardContainer.innerHTML = cardContainer.innerHTML + cardHTML;
        /*let node = document.createElement('div');
        node.innerHTML = cardHTML;
        cardContainer.appendChild(node);*/
        let newContent = document.createElement('div');
        newContent.innerHTML = cardHTML;

        while (newContent.firstChild) {
            cardContainer.appendChild(newContent.firstChild);
        }
        let cardDOM = document.getElementById(DOM.Constants.HTMLPrefixes.CARD_ID + card.id);
        Listeners.assignCardListeners(cardDOM, card);
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
