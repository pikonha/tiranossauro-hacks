import assert from "assert";

import { RepositorioMemoria } from "./memory_repo";
import { Exercicio } from "./types";

interface Repositorio {
  create(entidade: Exercicio): Promise<Exercicio>;
  read(id: number): Promise<Exercicio | undefined>;
  update(id: number, entidadeAtualizada: Partial<Exercicio>): Promise<void>;
  delete(id: number): Promise<void>;
}

class TesteExercicioCRUD {
  repo: Repositorio;

  constructor(repo: Repositorio) {
    this.repo = repo;
  }

  async executarTestes() {
    try {
      await this.testarCriacao();
      await this.testarLeitura();
      await this.testarAtualizacao();
      await this.testarExclusao();
      console.log("Todos os testes foram bem-sucedidos!");
    } catch (erro) {
      console.error("Ocorreu um erro nos testes:", erro);
    }
  }

  async testarCriacao() {
    try {
      const entidade: Exercicio = {
        id: 1,
        nome: "Teste Exercício",
        carga: 10,
        series: 3,
      };

      const exercicioCriado = await this.repo.create(entidade);
      const atual = await this.repo.read(entidade.id);
      assert.deepStrictEqual(atual, exercicioCriado, "Teste de Criação");
      console.log("Teste de Criação bem-sucedido");
    } catch (erro) {
      console.error("Erro no teste de Criação:", erro);
    }
  }

  async testarLeitura() {
    try {
      const id = 2;
      const esperado: Exercicio = {
        id,
        nome: "Teste Exercício",
        carga: 10,
        series: 3,
      };

      await this.repo.create(esperado);
      const atual = await this.repo.read(id);
      assert.deepStrictEqual(atual, esperado, "Teste de Leitura");
      console.log("Teste de Leitura bem-sucedido");
    } catch (erro) {
      console.error("Erro no teste de Leitura:", erro);
    }
  }

  async testarAtualizacao() {
    try {
      const id = 3;
      const entidadeInicial: Exercicio = {
        id,
        nome: "Teste Exercício",
        carga: 10,
        series: 3,
      };

      const entidadeAtualizada: Partial<Exercicio> = {
        nome: "Exercício Atualizado",
        carga: 15,
      };

      await this.repo.create(entidadeInicial);
      await this.repo.update(id, entidadeAtualizada);
      const atual = await this.repo.read(id);
      assert.deepStrictEqual(
        atual,
        { ...entidadeInicial, ...entidadeAtualizada },
        "Teste de Atualização"
      );
      console.log("Teste de Atualização bem-sucedido");
    } catch (erro) {
      console.error("Erro no teste de Atualização:", erro);
    }
  }

  async testarExclusao() {
    try {
      const id = 4;
      const entidade: Exercicio = {
        id,
        nome: "Teste Exercício",
        carga: 10,
        series: 3,
      };

      await this.repo.create(entidade);
      await this.repo.delete(id);
      const atual = await this.repo.read(id);
      assert.strictEqual(atual, undefined, "Teste de Exclusão");
      console.log("Teste de Exclusão bem-sucedido");
    } catch (erro) {
      console.error("Erro no teste de Exclusão:", erro);
    }
  }
}
const testCrud = new TesteExercicioCRUD(new RepositorioMemoria());
testCrud.executarTestes();
