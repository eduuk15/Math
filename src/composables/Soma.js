
export default function useSoma () {
  const soma = (ladoDaEquacao, incognita) => {
    const array = []
    let somaComIncognita = 0
    let somaSemIncognita = 0
    if (typeof ladoDaEquacao === typeof array) {
      ladoDaEquacao.reduce((acc, cur) => {
        if (typeof cur !== typeof array) {
          if ((cur.toString()).indexOf(incognita) > -1) {
            somaComIncognita = (parseFloat(somaComIncognita) + parseFloat(cur)) + incognita
          } else {
            somaSemIncognita += parseFloat(cur)
          }
        }
        if (typeof cur === typeof array) {
          cur.forEach((element) => {
            if ((element.toString()).indexOf(incognita) > -1) {
              somaComIncognita = (parseFloat(somaComIncognita) + parseFloat(element)) + incognita
            } else {
              somaSemIncognita += parseFloat(element)
            }
          })
        }

        return acc
      }, 0)

      ladoDaEquacao = [somaSemIncognita, somaComIncognita]
    }

    return ladoDaEquacao
  }
  return {
    soma
  }
}
