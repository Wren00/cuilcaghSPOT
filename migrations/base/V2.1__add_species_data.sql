INSERT INTO organisms (taxon_name, latin_name, taxon_group_id, picture_url, description, is_protected)
VALUES ('Irish Hare','Lepus timidus hibernicus', 3, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Mountain_Hare_-_geograph.org.uk_-_373125.jpg/640px-Mountain_Hare_-_geograph.org.uk_-_373125.jpg', 'Kingdom:	Animalia
Phylum:	Chordata
Class:	Mammalia
Order:	Lagomorpha
Family:	Leporidae
Genus:	Lepus
Species:	L. timidus hibernicus', true),
('Golden Plover','Pluvialis apricaria', 2, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluvialis_apricaria_photo.jpg/640px-Pluvialis_apricaria_photo.jpg', 'Kingdom:	Animalia
Phylum:	Chordata
Class:	Aves
Order:	Charadriiformes
Family:	Charadriidae
Genus:	Pluvialis
Species:	P. apricaria', true),
('Marsh Fritillary', 'Euphydryas aurinia', 5, 'https://upload.wikimedia.org/wikipedia/commons/5/55/Marsh_fritillary_%28Euphydryas_aurinia%29_male.jpg','Kingdom:	Animalia
Phylum:	Arthropoda
Class:	Insecta
Order:	Lepidoptera
Family:	Nymphalidae
Genus:	Euphydryas
Species:	E. aurinia', true),
('Drinker Moth', 'Euthrix potatoria', 5, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Drinker_Moth._Euthrix_potatoria._Lasiocampidae_%2810904043426%29.jpg/640px-Drinker_Moth._Euthrix_potatoria._Lasiocampidae_%2810904043426%29.jpg','Kingdom:	Animalia
Phylum:	Arthropoda
Class:	Insecta
Order:	Lepidoptera
Family:	Lasiocampidae
Genus:	Euthrix
Species:	E. potatoria', false),
('Polypody Fern', 'Polypodium vulgare', 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Polypodium_vulgare_Paprotka_zwyczajna_2020-06-29_01.jpg/640px-Polypodium_vulgare_Paprotka_zwyczajna_2020-06-29_01.jpg', 'Kingdom:	Plantae
Clade:	Tracheophytes
Division:	Polypodiophyta
Class:	Polypodiopsida
Order:	Polypodiales
Suborder:	Polypodiineae
Family:	Polypodiaceae
Genus:	Polypodium
Species:	P. vulgare', false),
('Moss Carder Bee', 'Bombus muscorum', 6, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Bombus_muscorum.jpg/640px-Bombus_muscorum.jpg', 'Kingdom:	Animalia
Phylum:	Arthropoda
Class:	Insecta
Order:	Hymenoptera
Family:	Apidae
Genus:	Bombus
Subgenus:	Thoracobombus
Species:	B. muscorum', true),
('Common Hawker Dragonfly', 'Aeshna juncea', 6, 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Aeshna_juncea_2.jpg', 'Kingdom:	Animalia
Phylum:	Arthropoda
Class:	Insecta
Order:	Odonata
Infraorder:	Anisoptera
Family:	Aeshnidae
Genus:	Aeshna
Species:	A. juncea', false);

INSERT INTO unverified_sightings(organism_id, user_id, picture_url, date, lat, long)
VALUES (3, 2, 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Red_Fox_%28Vulpes_vulpes%29_%284%29.jpg', '1990-10-12T18:25:43.511Z', 54.6677, -7.1332),
        (6, 2, 'https://upload.wikimedia.org/wikipedia/commons/3/36/Lepus_timidus_ainu.jpg', '2020-09-24T18:25:43.511Z', 54.9900, -7.5656),
        (11, 2, 'https://upload.wikimedia.org/wikipedia/commons/6/69/Bombus_muscorum1.jpg', '1995-05-18T18:25:43.511Z', 54.9923, -7.6213);