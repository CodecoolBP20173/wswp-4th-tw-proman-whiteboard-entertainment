from flask import Flask, render_template, request
import data_manager
import json
app = Flask(__name__)

STATUSES = ['new', 'in progress', 'testing', 'done']


@app.route("/")
def main():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('main.html')


@app.route("/boards")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route("/new-board", methods=['POST'])
def add_new_board():
    user_id = request.form.get("user_id", 1)
    board_title = request.form["title"]
    favourite = request.form.get("favourite", True)
    background_image = request.form.get("background_image", "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?w=940&h=650&auto=compress&cs=tinysrgb")
    data_manager.add_new_board(user_id, board_title, favourite, background_image)
    return "ok"

@app.route("/get-board", methods=['get'])
def get_board():
    boards = data_manager.get_all_board_to_a_user(1)
    return json.dumps(boards)


@app.route("/new-card", methods=['POST'])
def add_new_card():
    board_id = request.form['board_id']
    title = request.form['title']
    status = STATUSES[0]
    number_of_cards_in_status = data_manager.get_the_number_of_cards_in_a_distinct_board_with_a_distinct_status(board_id, status)
    card_order_number = number_of_cards_in_status['number'] + 1
    data_manager.add_new_card(board_id, title, status, card_order_number)
    return "ok"


def main():
    app.run(debug=True, port=8002)

if __name__ == '__main__':
    main()