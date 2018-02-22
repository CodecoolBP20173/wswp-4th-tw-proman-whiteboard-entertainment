from flask import Flask, render_template, request, url_for, session, redirect
import data_manager
import json

app = Flask(__name__)


@app.route("/")
def index():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('main.html')


@app.route("/drop-card", methods=['POST'])
def route_drop_event():
    ''' POST: card_id, new_status_id, new_order'''
    form_data = request.form
    old_card_details = data_manager.get_card_details_by_id(form_data['card_id'])
    data_manager.update_order(old_card_details['board_id'], form_data['new_status_id'], form_data['new_order'], 1)
    data_manager.update_card_order(form_data['card_id'], form_data['new_order'])
    data_manager.update_card_status(form_data['card_id'], form_data['new_status_id'])

    if form_data['new_status_id'] != old_card_details['status_id']:
        data_manager.update_order(old_card_details['board_id'], old_card_details['status_id'], old_card_details['order'], -1)

    return 'ok'


@app.route("/boards")
def boards():
    name = session['name'] if 'name' in session else 'Anonymus'
    if name != 'Anonymus':
        image = data_manager.get_users_image(name)['image']
        id = data_manager.get_id_by_username(name)['id']
        return render_template("boards.html", name=name, image=image, id=id)
    else:
        return redirect('/')


@app.route("/new-board", methods=['POST'])
def add_new_board():
    user_id = session['id']
    board_title = request.form["title"]
    favourite = request.form.get("favourite", True)
    background_image = request.form.get("background_image",
                                        "https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?w=940&h=650&auto=compress&cs=tinysrgb")
    board = data_manager.add_new_board(user_id['id'], board_title, favourite, background_image)
    return json.dumps(board)


def get_cards(board_id):

    new_cards = data_manager.get_cards_by_board_id_and_status(board_id, 1)
    in_progress_cards = data_manager.get_cards_by_board_id_and_status(board_id, 2)
    testing_cards = data_manager.get_cards_by_board_id_and_status(board_id, 3)
    done_cards = data_manager.get_cards_by_board_id_and_status(board_id, 4)

    cards = [new_cards, in_progress_cards, testing_cards, done_cards]
    return cards


@app.route("/get-board", methods=['get'])
def get_board():
    user_id = session['id']
    print(user_id)
    boards = data_manager.get_all_board_to_a_user(user_id['id'])
    for board in boards:
        board["cards"] = get_cards(board['id'])

    return json.dumps(boards)


@app.route("/edit-board", methods=['POST'])
def edit_board():
    board_id = request.form["id"]
    new_title = request.form["title"]
    data_manager.edit_board(board_id, new_title)
    return "ok"


@app.route("/new-card", methods=['POST'])
def add_new_card():
    board_id = request.form['board_id']
    title = request.form['title']
    status = request.form['status_id']
    number_of_cards_in_status = data_manager.get_the_number_of_cards_in_a_distinct_board_with_a_distinct_status(
        board_id, status)
    card_order_number = number_of_cards_in_status['number'] + 1
    data_manager.add_new_card(board_id, title, status, card_order_number)
    return "ok"


@app.route("/edit-card", methods=['POST'])
def edit_card():
    card_id = request.form["id"]
    new_card = request.form["title"]
    data_manager.edit_card(card_id, new_card)
    return "ok"


@app.route('/registration', methods=["GET", "POST"])
def registration():
    if request.method == 'GET':
        return render_template("registration.html")
    else:
        name = request.form['name']
        email = request.form['email']
        every_username = data_manager.check_name_in_database(name)
        every_email = data_manager.check_email_in_database(email)

        if every_username is None and every_email is None:
            image = request.form['image']
            password = request.form['password']
            email = request.form['email']
            hashed_password = data_manager.hash_password(password)
            if len(image) < 5:
                data_manager.save_registration_without_image(name, hashed_password, email)
                return render_template("main.html")
            else:
                data_manager.save_registration(name, hashed_password, image, email)
                return render_template("main.html")
        else:
            return render_template('message.html', message='Username or e-mail is already taken', url=url_for('registration'))


@app.route('/login', methods=['POST'])
def login():
    username_check = request.form['name']
    password_check_input = request.form['password']
    username = data_manager.check_name_in_database(username_check)

    if username is not None:
        password_check_database = data_manager.get_users_password(username_check)['password']
        verify = data_manager.verify_password(password_check_input, password_check_database)
        if verify is True:
            session['name'] = request.form['name']
            name = session['name']
            id = data_manager.get_id_by_username(name)
            session['id'] = id
            return render_template('message.html', message='Successful log in as {0}'.format(name), url=url_for('boards'))

        else:
            return render_template('message.html', message='You wrote wrong username or password', url=url_for('index'))
    else:
        return render_template('message.html', message='You wrote wrong username or password', url=url_for('index'))


@app.route('/logout')
def logout():
    if 'name' not in session:
        return render_template('message.html', message='You are not logged in, silly', url=url_for('login'))
    else:
        session.pop('name', None)
        return render_template('message.html', message='Check out is successful', url=url_for('index'))


def main():
    app.run(debug=True, port=8002)


if __name__ == '__main__':
    app.secret_key = 'ThorIsTheBest'
    main()
