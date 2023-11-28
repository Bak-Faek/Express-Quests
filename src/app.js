const express = require("express");
const app = express();
app.use(express.json());
const validateMovie = require("./middlewares/validateMovie");
const validateUser = require("./middlewares/validateUser");


const movieControllers = require("./controllers/movieControllers");

app.get("/api/movies", movieControllers.getMovies);
app.post("/api/movies", movieControllers.postMovie);

app.get("/api/movies/:id", movieControllers.getMovieById);
app.put("/api/movies/:id", movieControllers.updateMovie);
app.delete("/api/movies/:id", movieControllers.deleteMovie);

app.get("/api/users", movieControllers.getUsers);
app.post("/api/users", movieControllers.postUser);

app.get("/api/users/:id", movieControllers.getUsersById);
app.put("/api/users/:id", movieControllers.updateUser);
app.delete("/api/users/:id", movieControllers.deleteUser);
  
app.post("/api/movies", validateMovie, movieControllers.postMovie);
app.put("/api/movies/:id", validateMovie, movieControllers.updateMovie);

app.post("/api/users", validateUser, movieControllers.postUser);
app.put("/api/users/:id", validateUser, movieControllers.updateUser);

module.exports = app;
