// O QUE PRECISA?

// 1) Identificar o que precisa ser multiplicado... Para isso, sempre que tiver um ponto antes, multiplicar e substituir

// A equa��o � sempre espa�ada por 1 espa�o em branco, resultando num ARRAY

// Esse array tem diversos elementos, entre eles o ['.'] - PONTO - que significa a multiplica��o

// Logo, todo elemento que estiver depois do ponto deve ser multiplicado pelo anterior do ponto
// Exemplo: 4 . 2 => 2 est� depois do ponto, logo deve ser realizado 2x4

// E depois disso 4 . 2 resultar� em 8

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// CASOS ESPECIAIS

// 1) Quando parenteses com incognita

// Quando parenteses com incognita, o parenteses n�o poder� ser substitu�do por um elemente �nico, e continuar� sendo um array
// Exemplo: ( 5x + 3 ) nunca poder� ser um elemento sozinho, string ou int na l�gica do programa
// Logo ele ser� um elemento do tipo array... [2, '.', ['(', 5x, '+', 3, ')']]
// Cabe ent�o ao Parenteses retirar os sinais, para ent�o o Multiplica iterar sobre cada item do array

// 2) Quando incognita

// Quando incognita, multiplica os numeros e concatena com a incognita

// -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// PARAMETROS

// 1) ARRAY QUE TER� OS ELEMENTOS A SEREM MULTIPLICADOS
// 2) INCOGNITA PARA VALIDAR QUANDO O CASO ESPECIAL N2 DEVE SER REALIZADO

// RETORNO

// Retorna um objeto, com o array atualizado para pr�xima etapa

// const lado = ['5', '.', '3', '.', '4', '+', '3']

// const multiplica = (ladoDaEquacao) => {
//   // Primeiro tenho que validar se tem ponto, se n�o nem faz nada
//   if (ladoDaEquacao.indexOf('.') === -1) {
//     return null
//   }

//   // Ok, tem ponto!!! Ent�o agora tem que multiplicar os elementos e ir trocando

//   ladoDaEquacao.forEach((element, index, array) => {
//     if (array[index - 1] === '.') {
//       const elementosMultiplicados = parseFloat(element) * parseFloat(array[index - 2])
//       ladoDaEquacao[index] = elementosMultiplicados
//       ladoDaEquacao.splice(array[index - 1])
//       ladoDaEquacao.splice(array[index - 2])
//     }
//   })

//   return ladoDaEquacao
// }

// const x = multiplica(lado)
// console.log(x)

const lado = ["5", ".", ["2x", "3"]];
const incognita = "x";

const multiplica = (ladoDaEquacao, incognita) => {
  // Primeiro tenho que validar se tem ponto, se n�o nem faz nada
  if (ladoDaEquacao.indexOf(".") === -1) {
    return null;
  }

  // Ok, tem ponto!!! Ent�o agora tem que multiplicar os elementos e ir trocando
  ladoDaEquacao.forEach((element, index) => {
    if (
      ladoDaEquacao[index - 1] === "." &&
      typeof element !== Array &&
      typeof ladoDaEquacao[index - 2] !== Array
    ) {
      if (
        element.indexOf(incognita) > -1 ||
        toString(ladoDaEquacao[index - 2]).indexOf(incognita) > -1
      ) {
        const elementosMultiplicados =
          parseFloat(element) * parseFloat(ladoDaEquacao[index - 2]);
        ladoDaEquacao[index] = elementosMultiplicados + incognita;
        ladoDaEquacao[index - 1] = "";
        ladoDaEquacao[index - 2] = "";
      } else {
        const elementosMultiplicados =
          parseFloat(element) * parseFloat(ladoDaEquacao[index - 2]);
        ladoDaEquacao[index] = elementosMultiplicados;
        ladoDaEquacao[index - 1] = "";
        ladoDaEquacao[index - 2] = "";
      }
    } else if (ladoDaEquacao[index - 1] === "." && typeof element === Array) {
      const i = ladoDaEquacao[index - 2];
      element.forEach((elementN, index) => {
        const elementosMultiplicados =
          parseFloat(elementN) * parseFloat(ladoDaEquacao[i]);
        element[index] = elementosMultiplicados + incognita;
        element[index - 1] = "";
        element[index - 2] = "";
      });
    }
  });

  const itemVazio = "";

  let itensVazios = ladoDaEquacao.indexOf(itemVazio);

  while (itensVazios >= 0) {
    ladoDaEquacao.splice(itensVazios, 1);
    itensVazios = ladoDaEquacao.indexOf(itemVazio);
  }

  return ladoDaEquacao;
};

const x = multiplica(lado, incognita);
console.log("aqui o resultado");
console.log(x);