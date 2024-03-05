import { Exercicio } from "./types";

export class RepositorioMemoria {
  constructor() {}

  async create(entity: Exercicio) {}

  async read(id: number) {}

  async update(id: number, updatedEntity: Partial<Exercicio>) {}

  async delete(id: number) {}
}
