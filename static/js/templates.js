Templates = {
    Constants: {
        HTMLPrefixes: {
            BOARD_ID: 'board_',
            STATUS_COLUMN_ID: 'status_column_',
            CARD_ID: 'card_'
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

    columnTemplate: function (status, boardID) {
        let generatedColumn;
        generatedColumn = `
                        <div class="card column">
                            <div class="card-block w-100 h-100">
                                <h4 class="card-header">${status.name}</h4>
                                <div style="" class="w-100 h-100 column-body" id="${boardID}-${this.Constants.HTMLPrefixes.STATUS_COLUMN_ID}${status.id}">
                                
                                </div>
                            </div>
                        </div>`;
        return generatedColumn;
    },

    boardTemplate: function (board) {
        let generatedBoard;
        generatedBoard = `
            <div class="card board">
                <div class="card-header" id="heading${board.id}">
                    <div class="row">
                        <div class="col-10">
                            <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapse${board.id}" aria-expanded="true" aria-controls="collapse${board.id}">
                              ${board.title}
                            </button>
                            </h5>
                        </div>
                        <div class="col">
                            <div class="card_options" id="heading${board.id}-options"></div>
                        </div>
                    </div>
                </div>
                
                
                
                <div id="collapse${board.id}" class="collapse" aria-labelledby="heading${board.id}" data-parent="#accordion">
                    <div class="card-body1" >
                        <!-- card group -->
                        <div class="card-group" id="${this.Constants.HTMLPrefixes.BOARD_ID}${board.id}">
                        
                        </div>
                        <!-- end of card group -->
                    </div>
                </div>
            </div>`;
        return generatedBoard;
    },

    modalTemplate: function(header, label, buttonLabel, mode, card=undefined) {
        let cardTitle = '';
        if (card) {
            cardTitle = card.title;
        }
        let generatedModal;
        generatedModal = `
            <div class="modal fade" id="create-${mode}-modal" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="eModalLabel">${header}</h5>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                    <label for="usr">${label}</label>
                        <input type="text" class="form-control" id="create-${mode}-input" value="${cardTitle}">
                    </div>
                  </div>
                  <div class="modal-footer" style="margin: 0 auto">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" data-dismiss="modal" id="create-${mode}-button">${buttonLabel}</button>
                  </div>
                </div>
              </div>
            </div>
        `;
        return generatedModal;
    },

    newCardButtonTemplate: function(board) {
        let generatedButton;
        generatedButton = `
            <button type="button" id="${this.Constants.HTMLPrefixes.BOARD_ID}${board.id}-create-card" class="plus">&#43;</button>
        `;
        return generatedButton;
    }
};
