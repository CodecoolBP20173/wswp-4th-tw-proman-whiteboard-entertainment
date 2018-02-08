// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'DataHandler._data' below)
DataHandler = {
    Constants: {
        DEFAULT_DATA: {
            "statuses": [
                {
                    "id": 1,
                    "name": "New"
                },
                {
                    "id": 2,
                    "name": "In progress"
                },
                {
                    "id": 3,
                    "name": "Testing"
                },
                {
                    "id": 4,
                    "name": "Done"
                }
            ],
            "boards": [],
            "cards": []
        },
        KEY_IN_LOCAL_STORAGE: 'proman-data' // the string that you use as a key in localStorage to save your application data
    },

    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.

    _loadDefaultData: function() {
        DataHandler._data = Object.assign({}, DataHandler.Constants.DEFAULT_DATA);

        // save the default values to local storage:
        DataHandler._saveData();
    },

    _loadData: function() {
        // it is not called from outside
        // loads data from local storage, parses it and put into DataHandler._data property
        if (DataHandler.Constants.KEY_IN_LOCAL_STORAGE in localStorage) {
            DataHandler._data = JSON.parse(localStorage[DataHandler.Constants.KEY_IN_LOCAL_STORAGE]);

            let BreakException = {};
            let that = this;
            try {
                Object.keys(DataHandler.Constants.DEFAULT_DATA).forEach(function (currentKey) {
                    if (!that._data.hasOwnProperty(currentKey)) {
                        throw BreakException;
                    }
                });


                // let objectKeys = Object.keys(DataHandler.Constants.DEFAULT_DATA);
                // for(let i = 0; i < objectKeys.length; i++){
                //     let currentKey = objectKeys[i];
                //     if (!that._data.contains(currentKey)) {
                //         throw BreakException;
                //     }
                // }
            } catch (exception) {
                if (exception === BreakException) {
                    DataHandler._loadDefaultData();
                }
                else {
                    throw exception;
                }
            }
        }
        else {
            DataHandler._loadDefaultData();
        }
    },


    _saveData: function() {
        // it is not called from outside
        // saves the data from DataHandler._data to local storage
        localStorage[DataHandler.Constants.KEY_IN_LOCAL_STORAGE] = JSON.stringify(DataHandler._data);

    },


    init: function() {
        DataHandler._loadData();
    },


    getBoards: () => DataHandler._data.boards,


    getBoard: function(boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },


    getStatuses: function() {
        // the statuses are retrieved and then the callback function is called with the statuses
        return DataHandler._data.statuses;
    },


    getStatus: function(statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },


    getCardsByBoardId: function(boardId) {
        // the cards are retrieved and then the callback function is called with the cards
        // get all of the card details connected to the specified board
        // get statuses
        // separate cards by status id and returns the object
        /*
            {
                status1: [card1, card2]
                ...
            }
        */
        let cardsForStatuses = {};
        let all_cards = DataHandler._data.cards;
        let statuses = DataHandler.getStatuses();

        for (let i = 0; i < statuses.length; i++) {
            let key = statuses[i].id;
            cardsForStatuses[key] = [];
        }

        for (let i = 0; i < all_cards.length; i++) {
            if (all_cards[i].board_id === boardId) {
                cardsForStatuses[all_cards[i].status_id].push(all_cards[i]);
            }
        }

        return cardsForStatuses;
    },


    getCard: function(cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },


    createNewBoard: function(boardTitle, callback) {
        // creates new board, saves it and calls the callback function with its data
        // callback is the showBoard from the dom module
        let newID = (DataHandler._data.boards)? DataHandler._data.boards.length + 1 : 1;
        let board = {
            "id": newID,
            "title": boardTitle,
            "is_active": true,
        };
        DataHandler._data.boards.push(board);
        DataHandler._saveData();

        callback(board);
    },


    createNewCard: function(cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
        let id = DataHandler._data.cards.length + 1;
        let order = DataHandler.getCardsByBoardId(boardId)[statusId].length + 1;
        let card = {
            "id": id,
            "title": cardTitle,
            "board_id": boardId,
            "status_id": statusId,
            "order": order
        };
        DataHandler._data.cards.push(card);
        DataHandler._saveData();

        callback(card);
    },


    updateCard: function(card, newTitle, callback) {
        for (let currentCard of DataHandler._data.cards) {
            if (currentCard.id === card.id) {
                currentCard.title = newTitle;
                break;
            }
        }
        DataHandler._saveData();
        callback(card);
    }


    // here comes more features
};

