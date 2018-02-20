import database_common

@database_common.connection_handler
def add_new_board(cursor, user_id, board_title, favourite, background_image):
    cursor.execute("""
                    INSERT INTO boards(user_id, title, favourite, background_image) 
                    VALUES(%(user_id)s, %(title)s, %(favourite)s, %(background_image)s);
                   """,
                   {'user_id': user_id, 'title': board_title, 'favourite':favourite, 'background_image': background_image})