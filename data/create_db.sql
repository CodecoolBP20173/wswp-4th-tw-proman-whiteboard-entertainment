DROP TABLE IF EXISTS public.cards;
DROP TABLE IF EXISTS public.boards;
DROP TABLE IF EXISTS public.users;



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
    CONSTRAINT boards_users_id_fk FOREIGN KEY (user_id) REFERENCES users (id)
);
CREATE UNIQUE INDEX boards_id_uindex ON public.boards (id);


CREATE TABLE public.cards
(
    id SERIAL PRIMARY KEY NOT NULL,
    board_id INT NOT NULL,
    title VARCHAR NOT NULL,
    status_id INT NOT NULL,
    "order" INT NOT NULL,
    CONSTRAINT cards_boards_id_fk FOREIGN KEY (board_id) REFERENCES boards (id)
);
CREATE UNIQUE INDEX cards_id_uindex ON public.cards (id);

INSERT INTO users (name, password, image, email) VALUES ('admin', '$2y$10$XrZMUKwbiVwG9KyOzwMKouXwvxPmp1oFq0e70WwiUTjEJ2EFNSVKO', 'me.png', 'admin@proman.com');
