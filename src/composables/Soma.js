
export default function useSoma () {
  const soma = (ladoDaEquacao, incognita) => {
    console.log(ladoDaEquacao)
    let somaComIncognita = 0
    let somaSemIncognita = 0
    ladoDaEquacao.reduce((acc, cur) => {
      if (cur.indexOf(incognita) > -1) {
        console.log('entrou aqui')
        somaComIncognita = (parseFloat(somaComIncognita) + parseFloat(cur)) + incognita
      } else {
        console.log('entrou no 2')
        somaSemIncognita += parseFloat(cur)
      }

      return acc
    }, 0)

    ladoDaEquacao = [somaSemIncognita, somaComIncognita]

    return ladoDaEquacao
  }
  return {
    soma
  }
}
