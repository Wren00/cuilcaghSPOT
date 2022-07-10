INSERT INTO taxon_groups (taxon_group_name)
VALUES
    ('Amphibian'),
    ('Bird'),
    ('Mammal'),
    ('Flowering Plant'),
    ('Moss');

INSERT INTO organisms (taxon_name, latin_name, taxon_group_id)
VALUES
    ('Common Frog', 'Rana temporaria', 1),
    ('Meadow Pipit', 'Anthus pratensis', 2),
    ('Red Fox', 'Vulpes vulpes', 3),
    ('Bog Myrtle', 'Myrica gale', 4),
    ('Flat topped bog moss', 'Sphagnum recurvum var. mucronatum', 5);

INSERT INTO interest_groups (group_name, description)
VALUES 
    ('The OG Group', 'Original user group! Join!'),
    ('Insect Pals', 'All insect lovers hang out here');

INSERT INTO user_levels (description)
VALUES
    ('Guest'),
    ('Registered'),
    ('Admin');

INSERT INTO user_profiles (profile_message)
VALUES 
    ('New User'),
    ('New User'),
    ('New User');

INSERT INTO users(user_name, email_address, user_password, trusted_user, user_level_id,user_profile_id)
VALUES ('TEST', 'test@gmail.com', 'testpass', false, 2, 1),
        ('adminuser', 'adminuser@hotmail.com', 'adminpass', true, 3,2),
        ('trusteduser', 'sciencemail@gmail.com', 'sciencepass', true, 2, 3);

INSERT INTO users_to_groups(user_id, group_id) 
VALUES  (1,1),
        (3,1),
        (2,2),
        (1,2);

INSERT INTO unverified_sightings(organism_id, user_id, picture_url, date, lat, long)
VALUES (1, 1, 'afrog', '2022-05-10T18:25:43.511Z', 54.6688, -7.1111),
        (2, 2, 'abird', '2010-10-06T18:25:43.511Z', 54.9999, -7.3333);

INSERT INTO confirmed_sightings(organism_id, user_id, picture_url, date, lat, long)
VALUES (3, 3, 'afox', '2018-09-11T18:25:43.511Z', 54.6666, -7.2222),
        (5,3, 'moss', '2021-06-23T18:25:43.511Z', 54.6655, -7.1122);

INSERT INTO reactions(reaction_name)
VALUES ('thumbsup'),
        ('love'),
        ('bird'),
        ('laugh'),
        ('fox'),
        ('flower');
