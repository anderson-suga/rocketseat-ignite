import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "test",
  password: "test",
  database: "rentx",
});
