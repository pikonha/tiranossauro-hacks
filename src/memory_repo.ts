import { Exercicio } from "./types";

export class RepositorioMemoria {
  constructor() {}

  async create(entity: Exercicio): Promise<Exercicio> {
    return;
  }

  async read(id: number): Promise<Exercicio | undefined> {
    return;
  }

  async update(id: number, updatedEntity: Partial<Exercicio>): Promise<void> {}

  async delete(id: number): Promise<void> {}
}
