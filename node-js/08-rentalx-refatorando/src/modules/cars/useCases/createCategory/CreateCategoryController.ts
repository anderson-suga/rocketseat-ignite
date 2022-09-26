import "reflect-metadata";
import { container } from "tsyringe";
import { Response, Request } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

class CreateCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase.execute({ name, description });

    return response
      .status(201)
      .send({ message: "category created successfully" });
  }
}

export { CreateCategoryController };
