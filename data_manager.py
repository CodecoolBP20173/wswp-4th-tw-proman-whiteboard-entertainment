import database_common
import bcrypt

@database_common.connection_handler
def add_new_board(cursor, user_id, board_title, favourite, background_image):
    cursor.execute("""
                    INSERT INTO boards(user_id, title, favourite, background_image) 
                    VALUES(%(user_id)s, %(title)s, %(favourite)s, %(background_image)s)
                    RETURNING *;
                   """,
                   {'user_id': user_id, 'title': board_title, 'favourite':favourite, 'background_image': background_image})
    board = cursor.fetchone()
    return board


@database_common.connection_handler
def get_board(cursor, user_id, board_id):
    cursor.execute("""
                    SELECT title, favourite, background_image from boards
                    WHERE user_id = %(user_id)s
                    AND board_id = %(board_id)s
                   """,
                   {'user_id': user_id, 'board_id': board_id})
    board_datas = cursor.fetchall()

    return board_datas


@database_common.connection_handler
def get_all_board_to_a_user(cursor, user_id):
    cursor.execute("""
                    SELECT id, title, favourite, background_image from boards
                    WHERE user_id = %(user_id)s
                   """,
                   {'user_id': user_id})
    boards_datas = cursor.fetchall()

    return boards_datas

@database_common.connection_handler
def edit_board(cursor, board_id, new_title):
    cursor.execute("""
                    UPDATE boards
                    SET title = %(new_title)s
                    WHERE id = %(id)s;
                   """,
                   {'id': board_id, 'new_title': new_title})

@database_common.connection_handler
def edit_card(cursor, card_id, new_card):
    cursor.execute("""
                    UPDATE cards
                    SET title = %(new_card)s
                    WHERE id = %(id)s;
                   """,
                   {'id': card_id, 'new_card': new_card})


@database_common.connection_handler
def get_cards_by_board_id_and_status(cursor, board_id, status_id):
    cursor.execute("""
                    SELECT * FROM cards
                    WHERE board_id = %(board_id)s AND status_id = %(status_id)s
                    ORDER BY "order"
                    """,
                   {'board_id': board_id, 'status_id': status_id})
    return cursor.fetchall()


@database_common.connection_handler
def get_card_details_by_id(cursor, card_id):
    cursor.execute("""
        SELECT * FROM cards WHERE id = %(card_id)s
    """, {'card_id': card_id})
    return cursor.fetchone()


@database_common.connection_handler
def add_new_card(cursor, board_id, title, status_id, order):
    cursor.execute("""
                    INSERT INTO cards(board_id, title, status_id, "order")
                    VALUES(%(board_id)s, %(title)s, %(status_id)s, %(order)s);
                    """,
                   {'board_id': board_id, 'title': title, 'status_id': status_id, 'order': order})


@database_common.connection_handler
def get_max_card_id(cursor):
    cursor.execute("""SELECT MAX(id) AS "id" FROM cards;""")
    return cursor.fetchone()


@database_common.connection_handler
def get_the_number_of_cards_in_a_distinct_board_with_a_distinct_status(cursor, board_id, status_id):
    cursor.execute("""
                    SELECT COUNT(title) as number FROM cards
                    WHERE status_id = %(status_id)s AND board_id = %(board_id)s
                  """, {'status_id': status_id, 'board_id': board_id})
    return cursor.fetchone()


@database_common.connection_handler
def update_order(cursor, board_id, status_id, order, amount):
    cursor.execute("""
        UPDATE cards SET "order" = "order" + ({0})
        WHERE board_id = %(board_id)s AND status_id = %(status_id)s AND "order" >= %(order)s  
    """.format(amount), {'status_id': status_id, 'board_id': board_id, 'order': order})


@database_common.connection_handler
def update_card_status(cursor, card_id, new_status_id):
    cursor.execute("""
        UPDATE cards SET status_id = %(status_id)s WHERE id = %(card_id)s
    """, {'status_id': new_status_id, 'card_id': card_id})


@database_common.connection_handler
def update_card_order(cursor, card_id, new_order):
    cursor.execute("""
        UPDATE cards SET "order" = %(order)s WHERE id = %(card_id)s
    """, {'order': new_order, 'card_id': card_id})

def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())

    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')

    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)

@database_common.connection_handler
def check_name_in_database(cursor, name):
    cursor.execute("""
                    SELECT name FROM users
                    WHERE name = %(name)s;
                   """,
                   {'name': name})
    user_name_search = cursor.fetchone()

    return user_name_search

@database_common.connection_handler
def check_email_in_database(cursor, email):
    cursor.execute("""
                    SELECT email FROM users
                    WHERE email = %(email)s;
                   """,
                   {'email': email})
    every_email = cursor.fetchone()

    return every_email



@database_common.connection_handler
def save_registration(cursor, name, password, image):
    cursor.execute("""
                    INSERT INTO users (name, password, image, email) 
                    VALUES (%(name)s, %(password)s, %(image)s, %(email)s);
                   """,
                   {'name': name, 'password': password, 'image': image, 'email': email})


@database_common.connection_handler
def save_registration_without_image(cursor, name, password, email):
    cursor.execute("""
                    INSERT INTO users (name, password, email) 
                    VALUES (%(name)s, %(password)s, %(email)s);
                   """,
                   {'name': name, 'password': password, 'email': email})

@database_common.connection_handler
def get_users_password(cursor, name):
    cursor.execute("""
                    SELECT password FROM users
                    WHERE name = %(name)s;
                   """,
                   {'name': name})
    password = cursor.fetchone()

    return password

@database_common.connection_handler
def get_users_image(cursor, name):
    cursor.execute("""
                    SELECT image FROM users
                    WHERE name = %(name)s;
                   """,
                   {'name': name})
    image = cursor.fetchone()

    return image

@database_common.connection_handler
def get_id_by_username(cursor, name):
    cursor.execute("""
                    SELECT id FROM users
                    WHERE name = %(name)s;
                    """,
                   {'name': name})
    id = cursor.fetchone()

    return id


