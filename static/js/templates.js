Templates = {
    Constants: {
        HTMLPrefixes: {
            BOARD_ID: 'board-',
            STATUS_COLUMN_ID: 'status-column-',
            CARD_ID: 'card-'
        }
    },

    cardTemplate: function (card) {
        let generatedCard;
        generatedCard = `
                    <div class="card card-default" style="margin: 20px" align="center">
                        <div class="card-body" id="${this.Constants.HTMLPrefixes.CARD_ID}${card.id}">${card.title}</div>
                    </div>`;
        return generatedCard;
    },

    columnTemplate: function (status, boardId) {
        let generatedColumn;
        generatedColumn = `
                        <div class="card">
                            <div class="card-block w-100 h-100">
                                <h4 class="card-header">${status.name}</h4>
                                <div style="" class="w-100 h-100 column-body" data-status-id="${status.id}" data-board-id="${boardId}" id="${boardId}-${this.Constants.HTMLPrefixes.STATUS_COLUMN_ID}${status.id}">
                                </div>
                            </div>
                        </div>`;
        return generatedColumn;
    },

    boardTemplate: function (board) {
        let generatedBoard;
        generatedBoard = `
            <div class="card">
                <div class="card-header" id="heading${board.id}">
                    <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${board.id}" aria-expanded="true" aria-controls="collapse${board.id}">
                      ${board.title}
                    </button>
                    </h5>
                </div>
                <div id="collapse${board.id}" class="collapse" aria-labelledby="heading${board.id}" data-parent="#accordion">
                    <div class="card-body1" >
                        <div class="card-group" id="${this.Constants.HTMLPrefixes.BOARD_ID}${board.id}">
                        </div>
                    </div>
                </div>
            </div>`;
        return generatedBoard;
    }
};
