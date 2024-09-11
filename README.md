# Desafio do Zoológico

Este projeto é um desafio técnico onde você deve construir uma lógica em JavaScript para alocar animais em recintos de um zoológico com base em regras específicas. O objetivo é garantir que os animais sejam alocados adequadamente de acordo com o espaço disponível e as necessidades de cada espécie.

## Estrutura do Projeto

- **`recintos-zoo.js`**: Implementação da lógica de alocação de animais.
- **`recintos-zoo.test.js`**: Testes unitários para validar a lógica de alocação.
- **`package.json`**: Arquivo de configuração do projeto e dependências.

## Desafio

### Requisitos

1. **Recintos Disponíveis**

   O zoológico possui os seguintes recintos:

   | número    | bioma             | tamanho total |  animais existentes |
   |-----------|-------------------|---------------|---------------------|
   | 1         | savana            |   10          |   3 macacos         |
   | 2         | floresta          |    5          |   vazio             |
   | 3         | savana e rio      |    7          |  1 gazela           |
   | 4         | rio               |    8          |   vazio             |
   | 5         | savana            |    9          |  1 leão             |

2. **Animais**

   O zoológico só pode tratar os seguintes animais:

   | espécie    | tamanho | bioma                |
   |------------|---------|----------------------|
   | LEAO       |   3     |  savana              |
   | LEOPARDO   |   2     |  savana              |
   | CROCODILO  |   3     |  rio                 |
   | MACACO     |   1     |  savana ou floresta  |
   | GAZELA     |   2     |  savana              |
   | HIPOPOTAMO |   4     |  savana ou rio       |

3. **Funcionalidade**

   Desenvolver uma função que analise os recintos disponíveis e determine quais são viáveis para alocar uma quantidade específica de um animal, considerando o bioma e o espaço disponível.
