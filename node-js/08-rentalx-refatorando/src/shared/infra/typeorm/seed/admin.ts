import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import { createSeedAdmin } from "../dataSource";

const dataSource = createSeedAdmin();

async function create() {
  const id = uuidV4();
  const password = await hash("admin", 8);

  dataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!\n");
      dataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.query(
          `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
        values ('${id}', 'admin', 'admin@mail.com', '${password}', true, 'now()', 'xxxxxxx')
        `
        );
      });
      console.log("User admin created");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });
}

create();
