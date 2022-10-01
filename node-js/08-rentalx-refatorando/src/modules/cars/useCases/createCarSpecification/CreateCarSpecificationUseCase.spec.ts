import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificactionUseCase: CreateCarSpecificationUseCase;
let carsRespositoryInMemory: CarsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRespositoryInMemory = new CarsRepositoryInMemory();
    createCarSpecificactionUseCase = new CreateCarSpecificationUseCase(
      carsRespositoryInMemory
    );
  });

  it("should not be able to add a new specification to the car to a no-existent car", () => {
    expect(async () => {
      const car_id = "1234";
      const specifications_id = ["54321"];
      await createCarSpecificactionUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRespositoryInMemory.create({
      name: "Name Car 1",
      description: "Description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specifications_id = ["54321"];

    await createCarSpecificactionUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
