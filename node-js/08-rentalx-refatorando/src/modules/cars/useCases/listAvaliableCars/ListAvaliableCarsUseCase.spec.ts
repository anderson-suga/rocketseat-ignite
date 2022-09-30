import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvaliableCarsUseCase } from "./ListAvaliableCarsUseCase";

let listCarsUseCase: ListAvaliableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvaliableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all avaliable cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A4",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "ABC-321",
      fine_amount: 100,
      brand: "audi 1",
      category_id: "658273a7-fc85-4f7e-980c-bf67251d0706",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all avaliable cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Audi A5",
      description: "Carro bonito",
      daily_rate: 140,
      license_plate: "ABC-323",
      fine_amount: 100,
      brand: "audi 2",
      category_id: "658273a7-fc85-4f7e-980c-bf67251d0706",
    });
    const cars = await listCarsUseCase.execute({ brand: "audi 2" });

    expect(cars).toEqual([car]);
  });
});
