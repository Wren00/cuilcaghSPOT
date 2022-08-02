# CuilcaghSPOT

This is the backend code for a wildlife sightings app based around the area of Cuilcagh Mountain Park in Fermanagh. The database holds some wildlife data 
which can be added to using API calls. This will be tied to a frontend allowing users to submit data collected in the Geopark. The core of this app is
allowing users to make unverified sightings which can then be voted on by other users to confirm a species ID. Each sighting will hold time andlocation 
data which will be used on the frontend to place it on an interactive map of the park.

This section of the app has been created using PostgreSQL, Express and TypeScript. 

## Instructions to build and run locally

- Install Prisma and Docker, plus code and database viewing IDEs. Visual Studio Code and DataGrip were used for this app.
- Create a local .env file, see below for sample ENV file.
- In your IDE terminal cd to the directory of the app folder [server]
- Run npm install.

## How to run tests



- **Using docker-compose **
  - docker-compose up
---
- ** To clean completely locally **
    - docker-compose down
    - docker system prune -a --volumes -f
A docker-compose up will then rehost a clean version of your database
---

- ** Environment **
  - Create .env file locally with the url for your database
  - Sample .env file: (add your own database username and password and your local port instead of the placeholders)
  
     DATABASE_URL="postgresql://USERNAME:PASSWORD@localhost:PORT/cuilcaghspot?schema=public"
nodem

## API calls

Currently supported API calls to the database are:

Organisms 
These calls GET, POST or modify data on the organisms found in the park. 
----------
- getAllOrganisms
- getOrganismById
- getOrganismByName
- getOrganismByTaxonGroupId
- createOrganism
- updateOrganism
- deleteOrganism

User
These calls GET, POST or modify data on users using the app. Deletion of user data will be handled using obfuscation and not removal. 
----------
- getAllUsers
- getUserById
- getUserByName
- getUserByEmail
- getUserByLevel
- getTrustedUsers
- updateUserDetails
- updateUserPassword
- updateUserProfile
- createUser

Unverified Sightings
These calls GET, POST or modify sightings made by users. These are then confirmed by votes on the correct species ID before confirmed.
----------
- getAllUnverifiedSightings 
- getSightingsByOrganismId 
- getSightingsByUserId 
- createUnverifiedSighting 
- updateUnverifiedSighting 
- deleteSightingById 

Confirmed Sightings
These calls GET and POST sightings that have been confirmed by the app community. 
----------
- getAllConfirmedSightings
- getSightingsByOrganismId
- getSightingsByUserId
- createConfirmedSighting
- deleteConfirmedSighting

User Groups
These calls GET, POST and modify data on groups of users
----------
- getAllUserGroups
- getUserGroupById
- getUserGroupByName
- updateUserGroup
- createUserGroup
- deleteUserGroupById


## TODO
-   Swagger
-   Further testing
