CREATE TABLE IF NOT EXISTS taxon_groups
(
    id               SERIAL PRIMARY KEY NOT NULL,
    taxon_group_name VARCHAR            NOT NULL,
    description      VARCHAR
);

CREATE TABLE IF NOT EXISTS organisms
(
    id             SERIAL PRIMARY KEY NOT NULL,
    taxon_name     VARCHAR            NOT NULL,
    latin_name     VARCHAR            NOT NULL,
    taxon_group_id INT                NOT NULL,
    picture_url    VARCHAR,
    description    VARCHAR,
    FOREIGN KEY (taxon_group_id) REFERENCES taxon_groups (id)
);

CREATE TABLE IF NOT EXISTS user_levels
(
    id          SERIAL PRIMARY KEY NOT NULL,
    description VARCHAR            NOT NULL
);

CREATE TABLE IF NOT EXISTS user_profiles
(
    id              SERIAL PRIMARY KEY NOT NULL,
    profile_message VARCHAR,
    profile_picture VARCHAR
);

CREATE TABLE IF NOT EXISTS users
(
    id              SERIAL PRIMARY KEY NOT NULL,
    user_name       VARCHAR            NOT NULL UNIQUE,
    email_address   VARCHAR            NOT NULL UNIQUE,
    user_password   VARCHAR(255)       NOT NULL,
    trusted_user    BOOLEAN,
    user_level_id   INT                NOT NULL,
    user_profile_id INT                NOT NULL,

    FOREIGN KEY (user_level_id) REFERENCES user_levels (id),
    FOREIGN KEY (user_profile_id) REFERENCES user_profiles (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reactions
(
    id            SERIAL PRIMARY KEY NOT NULL,
    reaction_name VARCHAR            NOT NULL
);


CREATE TABLE IF NOT EXISTS interest_groups
(
    id          SERIAL PRIMARY KEY NOT NULL,
    group_name  VARCHAR            NOT NULL,
    description VARCHAR
);

CREATE TABLE IF NOT EXISTS users_to_groups
(
    id       SERIAL PRIMARY KEY NOT NULL,
    group_id INT                NOT NULL,
    user_id  INT                NOT NULL,
    FOREIGN KEY (group_id) REFERENCES interest_groups (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS unverified_sightings
(
    id          SERIAL PRIMARY KEY NOT NULL,
    organism_id INT                NOT NULL,
    user_id     INT                NOT NULL,
    picture_url VARCHAR            NOT NULL,
    date        DATE               NOT NULL,
    lat         NUMERIC            NOT NULL,
    long        NUMERIC            NOT NULL,
    user_votes  INT,

    FOREIGN KEY (organism_id) REFERENCES organisms (id),
    FOREIGN KEY (user_id) REFERENCES users (id)

);

CREATE TABLE IF NOT EXISTS confirmed_sightings
(

    id          SERIAL PRIMARY KEY NOT NULL,
    organism_id INT                NOT NULL,
    user_id     INT                NOT NULL,
    picture_url VARCHAR            NOT NULL,
    date        DATE               NOT NULL,
    lat         NUMERIC            NOT NULL,
    long        NUMERIC            NOT NULL,

    FOREIGN KEY (organism_id) REFERENCES organisms (id),
    FOREIGN KEY (user_id) REFERENCES users (id)

);

CREATE TABLE IF NOT EXISTS sighting_to_reactions
(
    id          SERIAL PRIMARY KEY NOT NULL,
    sighting_id INT NOT NULL,
    reaction_id INT NOT NULL,
    reaction_count INT NOT NULL DEFAULT 0,

    FOREIGN KEY (sighting_id) REFERENCES confirmed_sightings (id),
    FOREIGN KEY (reaction_id) REFERENCES reactions (id)
    );
