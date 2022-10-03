import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import { DataSource } from "typeorm";
import { createConnection } from "../../../../shared/infra/typeorm/dataSource";

import { app } from "@shared/infra/http/app";

let connection: DataSource;

describe("List Categories Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license )
        values('${id}', 'admin2', 'admin2@mail.com', '${password}', true, 'now()', 'XXXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.destroy();
  });

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admi2n@mail.com",
      password: "admin",
    });

    const { token } = responseToken.body;

    const category = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest 1",
        description: "Category Supertest 1",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const getCategories = await request(app).get("/categories");

    console.log(getCategories);

    expect(getCategories.status).toBe(200);
    expect(getCategories.body.length).toBe(1);
    expect(getCategories.body[0]).toHaveProperty("id");
    expect(getCategories.body[0].name).toEqual("Category Supertest");
  });
});
