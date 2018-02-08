Templates = {
    Constants: {
        HTMLPrefixes: {
            BOARD_ID: 'board-',
            STATUS_COLUMN_ID: 'status-column-',
            CARD_ID: 'card-',
            BUTTON: 'button-',
            MODAL: 'modal-',
            INPUT: 'input-',
            HEADING: 'heading-'
        },
    },


    createHTMLElementFromString: function (htmlString) {
        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        return div.firstChild;
    },


    cardTemplate: function (card) {
        let generatedCard;
        generatedCard = `
                    <div class="card card-default" style="margin: 20px" align="center">
                        <div class="card-body" id="${Templates.Constants.HTMLPrefixes.CARD_ID}${card.id}">${card.title}</div>
                    </div>`;
        return generatedCard;
    },

    navbarTemplate: function () {
        return (`
        <nav id="topnavbar" class="navbar  justify-content-between" style="height: 60px">
          
            <div>
              <a class="navbar-brand" href="#">
                  <img src="https://static.ezgif.com/images/bg-transparent.gif" width="60" height="60"  alt="" style="vertical-align: top; display: inline-block" >
                  <h1 style="vertical-align: bottom; display: inline-block">ProMan</h1>
                            
               </a>
            </div>
            <div>
                  <button type="button" id="${DOM.Constants.CREATE_BOARD_BUTTON_ID}" class="btn btn-primary" data-toggle="modal" data-target="#${DOM.Constants.ModalIDs.CREATE_BOARD}" style="display: inline-block;">Add new board</button>
            </div>
        </nav>
        `);
    },

    footerTemplate: () => `
        <nav id="footer" class="navbar navbar-light bg-light fixed-bottom justify-content-between" style="height: 60px">
            <div id="footer">WhiteBoard Entertainment
            <br><br>Bakcsa Bálint, Gál Ágnes, Lisztes Alex, Vlasics Tibor</div>
        </nav>
    `,

    columnTemplate: function (status, boardId) {
        let generatedColumn;
        generatedColumn = `
                        <div class="card column">
                            <div class="card-block w-100 h-100">
                                <h4 class="card-header">${status.name}</h4>
                                <div style="" class="w-100 h-100 column-body" data-status-id="${status.id}" data-board-id="${boardId}" id="${boardId}-${Templates.Constants.HTMLPrefixes.STATUS_COLUMN_ID}${status.id}"></div>
                            </div>
                        </div>`;
        return generatedColumn;
    },


    boardTemplate: function (board) {
        let generatedBoard;
        generatedBoard = `
            <div class="card board">
                <div class="card-header" id="heading-${board.id}">
                    <div class="row">
                        <div class="col-10">
                            <h5 class="mb-0">
                            <button class="btn button-box" data-toggle="collapse" data-target="#collapse${board.id}" aria-expanded="true" aria-controls="collapse${board.id}">
                              ${board.title}
                            </button>
                            </h5>
                        </div>
                        <div class="col justify-content-center">
                            <div class="card_options justify-content-center" id="heading-${board.id}-options">
                                <button type="button" id="${Templates.Constants.HTMLPrefixes.BUTTON}${Templates.Constants.HTMLPrefixes.BOARD_ID}${board.id}-create-card" style="visibility: hidden;" class="plus">&#43;</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="collapse${board.id}" class="collapse" aria-labelledby="heading-${board.id}" data-parent="#accordion">
                    <div class="card-body1" >
                        <div class="card-group" id="${Templates.Constants.HTMLPrefixes.BOARD_ID}${board.id}">
                    </div>
                </div>
            </div>
        </div>`;
        return generatedBoard;
    },

    bootstrapTemplate: () => `<div id="accordion" style="margin-top:80px"></div>`,

    modalTemplate: (title, inputLabel, inputValue, confirmButtonLabel, closeButtonLabel, modalId) => `
        <div class="modal fade" id="${modalId}" tabindex="-1" role="dialog" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="ModalLabel">${title}</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                        <label for="usr">${inputLabel}</label>
                            <input type="text" class="form-control" id="${Templates.Constants.HTMLPrefixes.INPUT}${modalId}" value="${inputValue}">
                        </div>
                    </div>
                    <div class="modal-footer" style="margin: 0 auto">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">${closeButtonLabel}</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" id="${Templates.Constants.HTMLPrefixes.BUTTON}${modalId}">${confirmButtonLabel}</button>
                    </div>
                </div>
            </div>
        </div>
    `

};
