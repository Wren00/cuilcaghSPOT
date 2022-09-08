INSERT INTO taxon_groups (taxon_group_name)
VALUES ('Amphibians'),
       ('Birds'),
       ('Mammals'),
       ('Plants'),
       ('Butterflies and Moths'),
       ('Other Insects and Arthropods');

INSERT INTO organisms (taxon_name, latin_name, taxon_group_id, picture_url, description)
VALUES ('Common Frog', 'Rana temporaria', 1, 'https://upload.wikimedia.org/wikipedia/commons/1/16/Common_frog.jpg', 'Common frogs are amphibians, breeding in ponds during the spring and
    spending much of the rest of the year feeding in woodland, gardens,  hedgerows and tussocky grassland.
    They are familiar inhabitants of garden ponds, where they lay their eggs in big "rafts" of spawn. They feed on a variety of invertebrates and even smaller amphibians.'),
       ('Meadow Pipit', 'Anthus pratensis', 2,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Meadow-Pipit.jpg/640px-Meadow-Pipit.jpg', 'A small, brown, streaky bird, the meadow pipit is the most common songbird in
    upland areas. Its high, piping call is a familiar sound. In flight it shows white outer tail feathers
     and in the breeding season it has a fluttering "parachute" display flight. In winter, they are quite gregarious
     and gather in small flocks, often invisible among the vegetation, suddenly flying up with typical jerky flight. Meadow pipit numbers in the UK have been
declining since the mid-1970s, resulting in this species being included on the amber list of conservation concern.'),
       ('Red Fox', 'Vulpes vulpes', 3,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Vulpes_vulpes_1_%28Martin_Mecnarowski%29.jpg/640px-Vulpes_vulpes_1_%28Martin_Mecnarowski%29.jpg', 'The red fox is our only wild member of the dog family. They are not fussy eaters
    and will happily munch on small mammals, birds, frogs, worms as well as berries and fruit! Foxes that live in towns and
     cities may even scavenge in bins to look for scraps. A male fox, called a dog makes a barking noise whereas the females,
     called vixens make a spine-chilling scream sound.'),
       ('Bog Myrtle', 'Myrica gale', 4,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Myrica_gale_kz14.jpg/640px-Myrica_gale_kz14.jpg', 'A real West-of-Ireland shrub, Bog-myrtle loves acid soil, lake shores and bogland.
     In impenetrable little thickets, it grows to about 1 metre tall, having red-brown, twiggy stems.
     From April to May, little catkins grow – orange and red, on different plants; the male (orange) are each 15mm long with
     4 stamens, the female (red) only 6mm long.  The oval to lanceolate leaves are downy below, almost hairless, and a
     distinctive fragrance of resin emanates from them and from small yellow dots which grow on the branches.
     This is a native plant and it belongs to the Myricaceae family.'),
       ('Flat topped bog moss', 'Sphagnum recurvum var. mucronatum', 4,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/PR_Vresova_stran_019_Sphagnum_cf_recurvum.jpg/640px-PR_Vresova_stran_019_Sphagnum_cf_recurvum.jpg', 'There are numerous species of sphagnum moss that
    look very similar, so are usually grouped together as "sphagnum" for easy description. These "bog-mosses" form the
    amazingly multi-coloured, living carpets found in wet places like peat bogs, marshland, heath and moorland.
    They grow from spores that are produced in fruiting bodies called capsules. When seen up close, they are very beautiful,
    but they also play an important role in the creation and continuation of peat bogs. They hold water in their spongy
    forms long after the surrounding soil has dried out, providing essential nutrients and helping to prevent the decay of
    dead plant material. It is this organic matter that gets compressed over hundreds of years to form peat.');

INSERT INTO interest_groups (group_name, description)
VALUES ('The OG Group', 'Original user group! Join!'),
       ('Insect Pals', 'All insect lovers hang out here');

INSERT INTO user_levels (description)
VALUES ('Guest'),
       ('Registered'),
       ('Admin');

INSERT INTO user_profiles (profile_message)
VALUES ('New User'),
       ('New User'),
       ('New User');

INSERT INTO users(user_name, email_address, user_password, trusted_user, user_level_id, user_profile_id)
VALUES ('TEST', 'test@gmail.com', 'testpass', false, 2, 1),
       ('adminuser', 'adminuser@hotmail.com', 'adminpass', true, 3, 2),
       ('trusteduser', 'sciencemail@gmail.com', 'sciencepass', true, 2, 3);

INSERT INTO users_to_groups(user_id, group_id)
VALUES (1, 1),
       (3, 1),
       (2, 2),
       (1, 2);

INSERT INTO unverified_sightings(organism_id, user_id, picture_url, date, lat, long, user_votes)
VALUES (1, 1,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/European_Common_Frog_Rana_temporaria_2.jpg/640px-European_Common_Frog_Rana_temporaria_2.jpg',
        '2022-05-10T18:25:43.511Z', 54.212, -7.816, 0),
       (2, 2,
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Anthus_pratensis_-_Meadow_Pipit_2021-03-27_01.jpg/640px-Anthus_pratensis_-_Meadow_Pipit_2021-03-27_01.jpg',
        '2010-10-06T18:25:43.511Z', 54.213, -7.799, 0);

INSERT INTO confirmed_sightings(organism_id, user_id, picture_url, date, lat, long)
VALUES (3, 3, 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Red_Fox_%28Vulpes_vulpes%29_%284%29.jpg',
        '2018-09-11T18:25:43.511Z', 54.2501, -7.8158),
       (5, 3, 'https://upload.wikimedia.org/wikipedia/commons/2/22/Sphagnum.flexuosum.jpg', '2021-06-23T18:25:43.511Z',
        54.2623, -7.8125);

INSERT INTO reactions(reaction_name)
VALUES ('ThumbUpRounded'),
       ('FavoriteRounded'),
       ('YardRounded'),
       ('PetsRounded'),
       ('SentimentVerySatisfiedRounded');

INSERT INTO user_posts(user_id, post_title, post_content)
VALUES (3, 'The Beauty of Butterflies', 'Here are some wonderful butterflies to see in Cuilcagh...map winged swift, peacock, green-veined White, even the small Heath!'),
   (2, 'Bird Hunting(in a good way)', 'Woke up early to find golden plovers. Confirmed sighting of a male, check my sightings for proof!');
