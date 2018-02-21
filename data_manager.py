import database_common

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
                   {'user_id': user_id, 'board_id': board_id});
    board_datas = cursor.fetchall()

    return board_datas


@database_common.connection_handler
def get_all_board_to_a_user(cursor, user_id):
    cursor.execute("""
                    SELECT id, title, favourite, background_image from boards
                    WHERE user_id = %(user_id)s
                   """,
                   {'user_id': user_id});
    boards_datas = cursor.fetchall()

    return boards_datas

@database_common.connection_handler
def edit_board(cursor, board_id, new_title):
    cursor.execute("""
                    UPDATE boards
                    SET title = %(new_title)s
                    WHERE id = %(id)s;
                   """,
                   {'id': board_id, 'new_title': new_title});



@database_common.connection_handler
def add_new_card(cursor, board_id, title, status, order):
    cursor.execute("""
                    INSERT INTO cards(board_id, title, status, "order")
                    VALUES(%(board_id)s, %(title)s, %(status)s, %(order)s);
                    """,
                   {'board_id': board_id, 'title': title, 'status': status, 'order': order})


@database_common.connection_handler
def get_the_number_of_cards_in_a_distinct_board_with_a_distinct_status(cursor, board_id, status):
    cursor.execute("""
                    SELECT COUNT(title) as number FROM cards
                    WHERE status = %(status)s AND board_id = %(board_id)s
                  """, {'status': status, 'board_id': board_id})
    return cursor.fetchone()
