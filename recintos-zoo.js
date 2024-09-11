class RecintosZoo {
  constructor() {
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: ['macaco', 'macaco', 'macaco'] },
      { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
      { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: ['gazela'] },
      { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
      { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: ['leao'] }
    ];

    this.animais = {
      LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
      LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
      CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
      MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
      GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
    };
  }

  analisaRecintos(tipoAnimal, quantidade) {
    tipoAnimal = tipoAnimal.toUpperCase();

    // Validações iniciais
    if (!this.animais[tipoAnimal]) {
      return { erro: "Animal inválido" };
    }
    
    if (!Number.isInteger(quantidade) || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }

    const animal = this.animais[tipoAnimal];
    const tamanhoNecessario = (animal.tamanho * quantidade) + (quantidade > 1 ? 1 : 0); // Soma 1 se for um grupo de animais
    const recintosViaveis = [];

    // Lógica de validação de recintos
    this.recintos.forEach(recinto => {
      const { numero, bioma, tamanhoTotal, animais } = recinto;

      // Verifica compatibilidade de bioma
      if (!animal.biomas.includes(bioma) && !(animal.biomas.includes('savana') && bioma.includes('rio'))) {
        return;
      }

      // Verifica se o recinto tem espaço suficiente
      const espacoOcupado = animais.reduce((acc, curr) => acc + this.animais[curr.toUpperCase()].tamanho, 0);
      const espacoLivre = tamanhoTotal - espacoOcupado;

      if (espacoLivre < tamanhoNecessario) {
        return;
      }

      // Regras específicas para animais carnívoros
      if (animal.carnivoro && animais.length > 0 && animais.some(a => this.animais[a.toUpperCase()].carnivoro && a.toUpperCase() !== tipoAnimal)) {
        return;
      }

      // Regras para macacos
      if (tipoAnimal === 'MACACO' && animais.length === 0) {
        return;
      }

      // Hipopótamos só podem conviver com outras espécies em biomas "savana e rio"
      if (tipoAnimal === 'HIPOPOTAMO' && animais.length > 0 && bioma !== 'savana e rio') {
        return;
      }

      // Adiciona o recinto à lista de viáveis
      recintosViaveis.push(`Recinto ${numero} (espaço livre: ${espacoLivre - tamanhoNecessario} total: ${tamanhoTotal})`);
    });

    // Retorna a lista de recintos viáveis ou erro se nenhum for encontrado
    if (recintosViaveis.length > 0) {
      return { recintosViaveis };
    } else {
      return { erro: "Não há recinto viável" };
    }
  }
}

export { RecintosZoo as RecintosZoo };
