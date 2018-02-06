Templates = {
    Constants: {
        HTMLPrefixes: {
            BOARD_ID: 'board_',
            STATUS_COLUMN_ID: 'status_column_',
            CARD_ID: 'card_'
        }
    },

    cardTemplate: function (card) {
        let generatedCard = `<div class="card card-default" style="margin: 20px" align="center">
                        <div class="card-body" id="${this.Constants.HTMLPrefixes.CARD_ID}${card.id}">${card.title}</div>
                    </div>`;
        return generatedCard;
    },

    columnTemplate: function (status) {

        let generatedColumn = `<div class="card">
                            <div class="card-block" id="${this.Constants.HTMLPrefixes.STATUS_COLUMN_ID}${status.id}">
                                    <h4 class="card-header">${status.name}</h4>
                             </div>
                      </div>`;
        return generatedColumn;
    },

    boardTemplate: function (board) {

        let generatedBoard = `
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      ${boardName}
                    </button>
                    </h5>
                </div>
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body1" id="${this.Constants.HTMLPrefixes.BOARD_ID}${board.title}">
                        <!-- card group -->
                        <div class="card-group" id="${boardID}-columns">
                        
                        </div>
                        <!-- end of card group -->
                    </div>
                </div>
            </div>`;
        return generatedBoard;
    }
};
