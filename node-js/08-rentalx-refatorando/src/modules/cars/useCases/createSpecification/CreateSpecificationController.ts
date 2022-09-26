import "reflect-metadata";
import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(
      CreateSpecificationUseCase
    );

    await createSpecificationUseCase.execute({ description, name });

    return response
      .status(201)
      .send({ message: "specification created successfully" });
  }
}

export { CreateSpecificationController };
