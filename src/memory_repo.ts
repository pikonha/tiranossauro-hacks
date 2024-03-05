import { Exercicio } from "./types";

export class RepositorioMemoria {
  private data: { [id: number]: Exercicio };

  constructor() {
    this.data = {};
  }

  async create(entity: Exercicio) {
    this.data[entity.id] = entity;
    return entity;
  }

  async read(id: number) {
    return this.data[id];
  }

  async update(id: number, updatedEntity: Partial<Exercicio>) {
    const existingEntity = this.data[id];
    if (existingEntity) {
      this.data[id] = { ...existingEntity, ...updatedEntity };
    }
  }

  async delete(id: number) {
    delete this.data[id];
  }
}
