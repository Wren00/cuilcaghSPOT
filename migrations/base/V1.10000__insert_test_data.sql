INSERT INTO taxon_groups (taxon_group_name)
VALUES
    ('Amphibian'),
    ('Bird'),
    ('Mammal'),
    ('Flowering Plant'),
    ('Moss');

INSERT INTO organisms (taxon_name, latin_name, taxon_group_id, description)
VALUES
    ('Common Frog', 'Rana temporaria', 1, 'Common frogs are amphibians, breeding in ponds during the spring and 
    spending much of the rest of the year feeding in woodland, gardens,  hedgerows and tussocky grassland. 
    They are familiar inhabitants of garden ponds, where they lay their eggs in big "rafts" of spawn. They feed on a variety of invertebrates and even smaller amphibians.'),
    ('Meadow Pipit', 'Anthus pratensis', 2, 'A small, brown, streaky bird, the meadow pipit is the most common songbird in 
    upland areas. Its high, piping call is a familiar sound. In flight it shows white outer tail feathers
     and in the breeding season it has a fluttering "parachute" display flight. In winter, they are quite gregarious 
     and gather in small flocks, often invisible among the vegetation, suddenly flying up with typical jerky flight. Meadow pipit numbers in the UK have been 
declining since the mid-1970s, resulting in this species being included on the amber list of conservation concern.'),
    ('Red Fox', 'Vulpes vulpes', 3, 'The red fox is our only wild member of the dog family. They are not fussy eaters 
    and will happily munch on small mammals, birds, frogs, worms as well as berries and fruit! Foxes that live in towns and
     cities may even scavenge in bins to look for scraps. A male fox, called a dog makes a barking noise whereas the females, 
     called vixens make a spine-chilling scream sound.'),
    ('Bog Myrtle', 'Myrica gale', 4, 'A real West-of-Ireland shrub, Bog-myrtle loves acid soil, lake shores and bogland. 
     In impenetrable little thickets, it grows to about 1 metre tall, having red-brown, twiggy stems.  
     From April to May, little catkins grow – orange and red, on different plants; the male (orange) are each 15mm long with 
     4 stamens, the female (red) only 6mm long.  The oval to lanceolate leaves are downy below, almost hairless, and a 
     distinctive fragrance of resin emanates from them and from small yellow dots which grow on the branches.  
     This is a native plant and it belongs to the Myricaceae family.'),
    ('Flat topped bog moss', 'Sphagnum recurvum var. mucronatum', 5, 'There are numerous species of sphagnum moss that 
    look very similar, so are usually grouped together as "sphagnum" for easy description. These "bog-mosses" form the 
    amazingly multi-coloured, living carpets found in wet places like peat bogs, marshland, heath and moorland. 
    They grow from spores that are produced in fruiting bodies called capsules. When seen up close, they are very beautiful, 
    but they also play an important role in the creation and continuation of peat bogs. They hold water in their spongy 
    forms long after the surrounding soil has dried out, providing essential nutrients and helping to prevent the decay of 
    dead plant material. It is this organic matter that gets compressed over hundreds of years to form peat.');

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
