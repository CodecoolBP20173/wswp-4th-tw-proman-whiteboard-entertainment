import database_common

@database_common.connection_handler
def add_new_board(cursor, user_id, board_title, favourite, background_image):
    cursor.execute("""
                    INSERT INTO boards(user_id, title, favourite, background_image) 
                    VALUES(%(user_id)s, %(title)s, %(favourite)s, %(background_image)s);
                   """,
                   {'user_id': user_id, 'title': board_title, 'favourite':favourite, 'background_image': background_image})


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
