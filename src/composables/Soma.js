
export default function useSoma () {
  const soma = (ladoDaEquacao, incognita) => {
    const array = []
    let somaComIncognita = 0
    let somaSemIncognita = 0
    let somaComIncognitaQuadratica = 0
    const incognitaAoQuadro = `${incognita[0]}²`
    if (typeof ladoDaEquacao === typeof array) {
      ladoDaEquacao.reduce((acc, cur) => {
        if (typeof cur !== typeof array) {
          if ((cur.toString()).indexOf(incognita) > -1) {
            if ((cur.toString()).indexOf(incognitaAoQuadro) > -1) {
              somaComIncognitaQuadratica += parseFloat(cur)
            } else {
              somaComIncognita = (parseFloat(somaComIncognita) + parseFloat(cur)) + incognita
            }
          } else {
            somaSemIncognita += parseFloat(cur)
          }
        }
        if (typeof cur === typeof array) {
          cur.forEach((element) => {
            if ((element.toString()).indexOf(incognita) > -1) {
              if ((element.toString()).indexOf(incognitaAoQuadro) > -1) {
                somaComIncognitaQuadratica += parseFloat(element)
              } else {
                somaComIncognita = (parseFloat(somaComIncognita) + parseFloat(element)) + incognita
              }
            } else {
              somaSemIncognita += parseFloat(element)
            }
          })
        }

        return acc
      }, 0)

      ladoDaEquacao = [somaSemIncognita, somaComIncognita, somaComIncognitaQuadratica]
    }

    return ladoDaEquacao
  }
  return {
    soma
  }
}
