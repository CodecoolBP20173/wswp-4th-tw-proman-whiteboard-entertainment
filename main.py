from flask import Flask, render_template, request
import data_manager
app = Flask(__name__)


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
    print(board_title)
    favourite = request.form.get("favourite", True)
    background_image = request.form.get("background_image", "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?w=940&h=650&auto=compress&cs=tinysrgb")
    data_manager.add_new_board(user_id, board_title, favourite, background_image)
    return "ok"


def main():
    app.run(debug=True)

if __name__ == '__main__':
    main()