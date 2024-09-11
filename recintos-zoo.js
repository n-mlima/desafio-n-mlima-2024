class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animaisExistentes: [{ especie: 'MACACO', quantidade: 3 }] },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animaisExistentes: [] },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animaisExistentes: [{ especie: 'GAZELA', quantidade: 1 }] },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animaisExistentes: [] },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animaisExistentes: [{ especie: 'LEAO', quantidade: 1 }] }
    ];

    this.animais = {
      LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
      MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
      GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
    };
  }

  analisaRecintos(especie, quantidade) {
    if (!this.animais[especie]) {
      return { erro: "Animal inválido" };
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: "Quantidade inválida" };
    }

    const recintosViaveis = this.recintos
      .filter(recinto => this.recintoViavel(recinto, especie, quantidade))
      .map(recinto => {
        const espacoLivre = this.calcularEspacoLivre(recinto, especie, quantidade);
        return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
      })
      .sort((a, b) => parseInt(a.split(' ')[1]) - parseInt(b.split(' ')[1]));

    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }

    return { recintosViaveis };
  }

  recintoViavel(recinto, especie, quantidade) {
    const animal = this.animais[especie];
    const espacoNecessario = animal.tamanho * quantidade;
    const espacoOcupado = this.calcularEspacoOcupado(recinto);
    const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

    // Verificar espaço suficiente
    if (espacoLivre < espacoNecessario) return false;

    // Verificar bioma adequado
    if (!animal.bioma.some(b => recinto.bioma.includes(b))) return false;

    // Regras específicas
    if (animal.carnivoro && recinto.animaisExistentes.length > 0 && recinto.animaisExistentes[0].especie !== especie) return false;
    if (!animal.carnivoro && recinto.animaisExistentes.some(a => this.animais[a.especie].carnivoro)) return false;
    if (especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animaisExistentes.length > 0) return false;
    if (especie === 'MACACO' && recinto.animaisExistentes.length === 0 && quantidade === 1) return false;
    if (recinto.animaisExistentes.length > 0 && recinto.animaisExistentes[0].especie !== especie && espacoLivre < espacoNecessario + 1) return false;

    return true;
  }

  calcularEspacoOcupado(recinto) {
    return recinto.animaisExistentes.reduce((total, animal) => {
      return total + this.animais[animal.especie].tamanho * animal.quantidade;
    }, 0) + (recinto.animaisExistentes.length > 1 ? 1 : 0);
  }

  calcularEspacoLivre(recinto, novaEspecie, novaQuantidade) {
    const espacoOcupado = this.calcularEspacoOcupado(recinto);
    const novoEspacoOcupado = this.animais[novaEspecie].tamanho * novaQuantidade;
    const espacoExtra = recinto.animaisExistentes.length > 0 && recinto.animaisExistentes[0].especie !== novaEspecie ? 1 : 0;
    return recinto.tamanhoTotal - espacoOcupado - novoEspacoOcupado - espacoExtra;
  }
}

module.exports = { RecintosZoo };

