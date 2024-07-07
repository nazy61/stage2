const request = require("supertest");
const app = require("../app");
const sinon = require("sinon");

describe("POST /login", () => {
  describe("given an email and password", () => {
    test("Ensure token expires at the correct time", async () => {
      let token;
      let clock;
      let user;

      const response = await request(app).post("/auth/login").send({
        email: "johndoe@gmail.com",
        password: "Testing01!",
      });

      user = response.body.data.user;
      token = response.body.data.accessToken;
      clock = sinon.useFakeTimers();

      const expirationTime = 3600000; // 1 hour in milliseconds

      // Simulate time passing
      clock.tick(expirationTime + 1000); // Add 1 second to ensure expiration

      const res = await request(app)
        .get(`/api/user/${user.userId}`)
        .set("authorization", token);

      expect(res.status).toBe(401);
      clock.restore();
    });
  });
});
