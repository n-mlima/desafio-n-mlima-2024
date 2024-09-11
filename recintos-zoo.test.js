import { RecintosZoo } from './recintos-zoo';

describe('RecintosZoo', () => {
  let zoo;

  beforeEach(() => {
    zoo = new RecintosZoo();
  });

  test('Deve retornar recintos viáveis para MACACO (quantidade: 2)', () => {
    const resultado = zoo.analisaRecintos('MACACO', 2);
    expect(resultado.recintosViaveis).toEqual([
      "Recinto 1 (espaço livre: 5 total: 10)",
      "Recinto 2 (espaço livre: 3 total: 5)",
      "Recinto 3 (espaço livre: 2 total: 7)"
    ]);
  });

  test('Deve retornar erro "Animal inválido" para UNICORNIO', () => {
    const resultado = zoo.analisaRecintos('UNICORNIO', 1);
    expect(resultado.erro).toBe("Animal inválido");
  });

  test('Deve retornar erro "Quantidade inválida" para quantidade negativa', () => {
    const resultado = zoo.analisaRecintos('LEAO', -1);
    expect(resultado.erro).toBe("Quantidade inválida");
  });

  test('Deve retornar erro "Não há recinto viável" para HIPOPOTAMO', () => {
    const resultado = zoo.analisaRecintos('HIPOPOTAMO', 1);
    expect(resultado.erro).toBe("Não há recinto viável");
  });

  test('Deve retornar recintos viáveis para LEOPARDO (quantidade: 1)', () => {
    const resultado = zoo.analisaRecintos('LEOPARDO', 1);
    expect(resultado.recintosViaveis).toEqual([
      "Recinto 1 (espaço livre: 4 total: 10)",
      "Recinto 5 (espaço livre: 6 total: 9)"
    ]);
  });
});
