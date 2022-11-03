
export default function useSoma () {
  const soma = (ladoDaEquacao, incognita) => {
    let somaComIncognita = 0
    let somaSemIncognita = 0
    ladoDaEquacao.reduce((acc, cur) => {
      if (cur.indexOf(incognita) > -1) {
        somaComIncognita = (parseFloat(somaComIncognita) + parseFloat(cur)) + incognita
      } else {
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
