import "reflect-metadata";
import { DataSource } from "typeorm";

import { Category } from "../../../modules/cars/infra/typeorm/entities/Category";
import { Specification } from "../../../modules/cars/infra/typeorm/entities/Specifications";
import { User } from "../../../modules/accounts/infra/typeorm/entities/Users";
import { Car } from "../../../modules/cars/infra/typeorm/entities/Cars";
import { CarImage } from "../../../modules/cars/infra/typeorm/entities/CarIMage";

const listEntities = [Category, Specification, User, Car, CarImage];

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  synchronize: false,
  logging: false,
  entities: listEntities,
  migrations: ["src/shared/infra/typeorm/migrations/*.ts"],
  subscribers: [],
});

export function createConnection(host = "database"): Promise<DataSource> {
  return AppDataSource.setOptions({ host }).initialize();
}

export function createSeedAdmin(host = "database"): DataSource {
  const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "docker",
    password: "ignite",
    database: "rentx",
    synchronize: false,
    logging: false,
    entities: listEntities,
    migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
    subscribers: [],
  });

  return dataSource;
}
