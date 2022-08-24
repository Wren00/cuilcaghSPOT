import jwt from "jsonwebtoken";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsImlhdCI6MTY1ODMwNTk3MiwiZXhwIjoxNjU4MzA2MDkyfQ.NFdr0kEv31_RXS9lViM7t7cUEI5X4aLO_tmg_PGBHuU";

const decodedToken = jwt.decode(token);

console.log(decodedToken);
