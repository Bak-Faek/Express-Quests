const express = require("express");
const app = express();
app.use(express.json());

const movieControllers = require("./controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.post("/api/movies", movieControllers.postMovie);
app.get("/api/movies/:id", movieControllers.getMovieById);
app.get("/api/users", movieControllers.getUsers);
app.post("/api/users", movieControllers.postUser);
app.get("/api/users/:id", movieControllers.getUsersById);

module.exports = app;
