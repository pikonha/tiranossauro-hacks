import sqlite3 from "sqlite3";

import { Exercicio } from "./types";

export class RepositorioSQLite {
  private db: sqlite3.Database;

  constructor() {
    // Conectar ao banco de dados SQLite (pode ser em memória ou em arquivo)
    this.db = new sqlite3.Database(":memory:"); // Banco de dados em memória para simplicidade; substitua por um caminho de arquivo para armazenamento persistente
    // Criar a tabela se ela não existir
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS exercicios (
          id INTEGER PRIMARY KEY,
          nome TEXT,
          carga INTEGER,
          series INTEGER
        )
      `);
    });
  }

  create(entity: Exercicio): Promise<Exercicio> {
    return new Promise((resolve, reject) => {
      const { id, nome, carga, series } = entity;
      const stmt = this.db.prepare(
        "INSERT INTO exercicios (id, nome, carga, series) VALUES (?, ?, ?, ?)"
      );
      stmt.run(id, nome, carga, series, (err) => {
        if (err) reject(err);
        else resolve(entity);
      });
    });
  }

  read(id: number): Promise<Exercicio | undefined> {
    return new Promise((resolve, reject) => {
      this.db.get("SELECT * FROM exercicios WHERE id = ?", [id], (err, row) => {
        if (err) reject(err);
        else resolve(row as Exercicio);
      });
    });
  }

  update(id: number, updatedEntity: Partial<Exercicio>): Promise<void> {
    return new Promise((resolve, reject) => {
      const keys = Object.keys(updatedEntity);
      const values = Object.values(updatedEntity);
      const placeholders = keys.map((key) => `${key} = ?`).join(", ");
      const stmt = this.db.prepare(
        `UPDATE exercicios SET ${placeholders} WHERE id = ?`
      );
      stmt.run(...values, id, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const stmt = this.db.prepare("DELETE FROM exercicios WHERE id = ?");
      stmt.run(id, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
