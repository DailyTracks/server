const request = require("supertest");
const app = require("../../app");

describe("login endpoint", () => {
  it("should return 200", () => {
    return request(app)
      .post("/api/auth/login")
      .send({
        userId: "k_anon3747@naver.com",
        password: "asd",
      })
      .expect(200)
      .expect((response) => {
        if (response._body.message !== "로그인 성공") {
          throw new Error("Invalid success message");
        }
      });
  });
});
