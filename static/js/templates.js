Templates = {
    BoardTemplate: function (boardTitle) {
        let board = `<title>${boardTitle}</title>`;
        return board;
    },

    cardTemplate: function (cardTitle) {
        let card = `<div class="card card-default" style="margin: 20px" align="center">
                        <div class="card-body">${cardTitle}</div>
                    </div>`;
        return card;
    },

    columnTemplate: function (name, cards) {
        let allCards = '';
        for (card of cards) {
            allCards += this.cardTemplate(card.title);
        }
        let column = `<div class="card">
                            <div class="card-block">
                                    <h4 class="card-header">${name}</h4>
                                        ${allCards}
                             </div>
                      </div>`;
        return column
    },

    boardTemplate: function (boardName, columns) {
        let allColumns = '';
        for (column of columns) {
            allColumns += this.columnTemplate(column.name, column.cards)

        }
        let board = `
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      ${boardName}
                    </button>
                    </h5>
                </div>
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body1">
                        <!-- card group -->
                        <div class="card-group">
                            ${allColumns}
                        </div>
                        <!-- end of card group -->
                    </div>
                </div>
            </div>`;
        return board;
    }
};
