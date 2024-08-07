const request = require("supertest");
const app = require("../src/app");
const database = require("../database");
const crypto = require("node:crypto");
afterAll(() => database.end());

describe("GET /api/users", () => {
  it("should return all users", async () => {
    const response = await request(app).get("/api/users");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });
}); 

describe("GET /api/users/:id", () => {
  it("should return one user", async () => {
    const response = await request(app).get("/api/users/1");

    expect(response.headers["content-type"]).toMatch(/json/);

    expect(response.status).toEqual(200);
  });

  it("should return no user", async () => {
    const response = await request(app).get("/api/users/0");

    expect(response.status).toEqual(404);
  });
});

describe("POST /api/users", () => {
  it("should return created user", async () => {
    const newUser = {
      firstname: "Marie",
      lastname: "Martin",
      email: `${crypto.randomUUID()}@wild.co`,
      city: "Paris",
      language: "French",
    };

    const response = await request(app).post("/api/users").send(newUser);

    expect(response.status).toEqual(201);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("number");

    const [result] = await database.query(
      "SELECT * FROM users WHERE id=?",
      response.body.id
    );

    const [movieInDatabase] = result;

    expect(movieInDatabase).toHaveProperty("id");
    expect(movieInDatabase).toHaveProperty("firstname");
    expect(movieInDatabase.firstname).toStrictEqual(newUser.firstname);

    expect(movieInDatabase).toHaveProperty("lastname");
    expect(movieInDatabase.lastname).toStrictEqual(newUser.lastname);

    expect(movieInDatabase).toHaveProperty("email");
    expect(movieInDatabase.email).toStrictEqual(newUser.email);

    expect(movieInDatabase).toHaveProperty("city");
    expect(movieInDatabase.city).toStrictEqual(newUser.city);

    expect(movieInDatabase).toHaveProperty("language");
    expect(movieInDatabase.language).toStrictEqual(newUser.language);
  });
});

describe("PUT /api/users/:id", () => {
  it("should edit user", async () => {
    const newUser = {
      firstname: "Mark",
      lastname: "Torres",
      email: `${crypto.randomUUID()}@wild.com`,
      city: "New York",
      language: "English",
    };

    const [result] = await database.query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [
        newUser.firstname,
        newUser.lastname,
        newUser.email,
        newUser.email,
        newUser.language,
      ]
    );

    const id = result.insertId;

    const updatedUser = {
      firstname: "Pat",
      lastname: "Hayes",
      email: `${crypto.randomUUID()}@wild.com`,
      city: "Madrid",
      language: "Spanish",
    };

    const response = await request(app)
      .put(`/api/users/${id}`)
      .send(updatedUser);

    expect(response.status).toEqual(204);

    const [result1] = await database.query(
      "SELECT * FROM users WHERE id=?",
      id
    );

    const [movieInDatabase] = result1;

    expect(movieInDatabase).toHaveProperty("id");

    expect(movieInDatabase).toHaveProperty("firstname");
    expect(movieInDatabase.firstname).toStrictEqual(updatedUser.firstname);

    expect(movieInDatabase).toHaveProperty("lastname");
    expect(movieInDatabase.lastname).toStrictEqual(updatedUser.lastname);

    expect(movieInDatabase).toHaveProperty("email");
    expect(movieInDatabase.email).toStrictEqual(updatedUser.email);

    expect(movieInDatabase).toHaveProperty("city");
    expect(movieInDatabase.city).toStrictEqual(updatedUser.city);

    expect(movieInDatabase).toHaveProperty("language");
    expect(movieInDatabase.language).toStrictEqual(updatedUser.language);
  });

  it("should return no user", async () => {
    const newUser = {
      firstname: "Mark",
      lastname: "Torres",
      email: `${crypto.randomUUID()}@wild.com`,
      city: "New York",
      language: "English",
    };

    const response = await request(app).put("/api/users/0").send(newUser);

    expect(response.status).toEqual(404);
  });
});

describe("DELETE /api/users/:id", () => {
  it("should delete user", async () => {
    const newUser = {
      firstname: "Captain",
      lastname: "America",
      email: "captain.america@avengers.com",
      city: "world",
      language: "American",
    };

    const [result] = await database.query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [
        newUser.firstname,
        newUser.lastname,
        newUser.email,
        newUser.city,
        newUser.language,
      ]
    );

    const id = result.insertId;

    const deleteUser = {
      firstname: "Captain",
      lastname: "America",
      email: "captain.america@avengers.com",
      city: "world",
      language: "American",
    };

    const response = await request(app)
      .delete(`/api/users/${id}`)
      .send(deleteUser);

    expect(response.status).toEqual(204);
  });

  it("should return no movie", async () => {
    const newUser = {
      firstname: "Captain",
      lastname: "America",
      email: "captain.america@avengers.com",
      city: "world",
      language: "American",
    };

    const response = await request(app).delete("/api/users/0").send(newUser);

    expect(response.status).toEqual(404);
  });
});
