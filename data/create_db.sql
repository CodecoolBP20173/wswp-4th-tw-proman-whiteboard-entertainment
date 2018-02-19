DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.boards;
DROP TABLE IF EXISTS public.cards;


CREATE TABLE public.users
(
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    image VARCHAR,
    email VARCHAR NOT NULL,
    rank VARCHAR DEFAULT 'Novice' NOT NULL
);
CREATE UNIQUE INDEX users_id_uindex ON public.users (id);
CREATE UNIQUE INDEX users_name_uindex ON public.users (name);
CREATE UNIQUE INDEX users_email_uindex ON public.users (email);


CREATE TABLE public.boards
(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT,
    title VARCHAR NOT NULL,
    favourite BOOLEAN NOT NULL,
    background_image VARCHAR,
    CONSTRAINT boards_users_id_fk FOREIGN KEY (id) REFERENCES users (id)
);
CREATE UNIQUE INDEX boards_id_uindex ON public.boards (id);


CREATE TABLE public.cards
(
    id SERIAL PRIMARY KEY NOT NULL,
    board_id INT NOT NULL,
    title VARCHAR NOT NULL,
    CONSTRAINT cards_boards_id_fk FOREIGN KEY (id) REFERENCES boards (id)
);
CREATE UNIQUE INDEX cards_id_uindex ON public.cards (id);
