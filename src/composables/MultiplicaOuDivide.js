
export default function UseMultiplicaOuDivide () {
  const multiplicaOuDivide = (ladoDaEquacao, incognita) => {
    // Valida se possui ponto (multiplicação) ou barra (divisão)
    if (ladoDaEquacao.indexOf('.') === -1 && ladoDaEquacao.indexOf('/') === -1) {
      return ladoDaEquacao
    }

    // Array referencial para elementos do tipo array
    const Array = []

    // Itera sobre cada um dos elementos
    ladoDaEquacao.forEach((element, index) => {
      // ----------------------------------------------------------------------------------------------------------------------- 1ª validação de multiplicação
      // Verifica se o elemento antecessor é um ponto
      // Verifica se o elemento atual não é um array
      // Verifica se o elemento anteAntecessor não é um array
      if (
        ladoDaEquacao[index - 1] === '.' &&
        typeof element !== typeof Array &&
        typeof ladoDaEquacao[index - 2] !== typeof Array
      ) {
        // Caso elemento atual ou o anteAntecessor tenha incógnita
        if (
          (element.toString()).indexOf(incognita) > -1 ||
          (ladoDaEquacao[index - 2].toString()).indexOf(incognita) > -1
        ) {
          // E caso o elemento atual ou o anteAntecessor tenha incognita²
          if (
            (element.toString()).indexOf(`${incognita}²`) > -1 ||
            (ladoDaEquacao[index - 2].toString()).indexOf(`${incognita}²`) > -1
          ) {
            // O elemento anteAntecessor é multiplicado com o atual
            const elementosQuadraticosMultiplicaodos = parseFloat(element) * parseFloat(ladoDaEquacao[index - 2])
            ladoDaEquacao[index] = `${elementosQuadraticosMultiplicaodos}${incognita}²`
            ladoDaEquacao[index - 1] = ''
            ladoDaEquacao[index - 2] = ''
          } else {
            // O elemento anteAntecessor é multiplicado com o atual
            const elementosMultiplicados = parseFloat(element) * parseFloat(ladoDaEquacao[index - 2])
            ladoDaEquacao[index] = elementosMultiplicados + incognita
            ladoDaEquacao[index - 1] = ''
            ladoDaEquacao[index - 2] = ''
          }
        } else {
          // O elemento anteAntecessor é multiplicado com o atual
          const elementosMultiplicados = parseFloat(element) * parseFloat(ladoDaEquacao[index - 2])
          ladoDaEquacao[index] = elementosMultiplicados
          ladoDaEquacao[index - 1] = ''
          ladoDaEquacao[index - 2] = ''
        }
        return
      }

      // ----------------------------------------------------------------------------------------------------------------------- 2ª validação de multiplicação
      // Verifica se o elemento antecessor é um ponto
      // Verifica se o elemento atual é um array
      // Verifica se o elemento anteAntecessor não é um array
      if (
        ladoDaEquacao[index - 1] === '.' &&
        typeof element === typeof Array &&
        typeof ladoDaEquacao[index - 2] !== typeof Array
      ) {
        // Constante responsável por guardar o elemento antes do ponto
        const i = ladoDaEquacao[index - 2]
        // Array que receberá os produtos provenientes das multiplicações
        const arrayDistributiva = []
        // itera sobre cara um dos elementos do próprio elemento do tipo array
        element.forEach((elementN) => {
          // Caso o elemento atual ou o elemento antes do ponto (i) tenha incognita
          if (
            (elementN.toString()).indexOf(incognita) > -1 ||
            (i.toString()).indexOf(incognita) > -1
          ) {
            // E caso o elemento atual ou o i tenha incognita²
            if (
              (elementN.toString()).indexOf(`${incognita}²`) > -1 ||
              (i.toString()).indexOf(`${incognita}²`) > -1
            ) {
              // O i é multiplicado com o atual
              const elementosQuadraticosMultiplicaodos = parseFloat(elementN) * parseFloat(i)
              const elementosQuadraticosMultiplicadosString = `${elementosQuadraticosMultiplicaodos}${incognita}²`
              // E o resultado é incluído no array
              arrayDistributiva.push(elementosQuadraticosMultiplicadosString)
            } else {
              // O i é multiplicado com o atual
              const elementosMultiplicados = (parseFloat(elementN) * parseFloat(i)) + incognita
              // E o resultado é incluído no array
              arrayDistributiva.push(elementosMultiplicados)
            }
          } else {
            // O i é multiplicado com o atual
            const elementosMultiplicados = parseFloat(elementN) * parseFloat(i)
            // E o resultado é incluído no array
            arrayDistributiva.push(elementosMultiplicados)
          }
        })
        ladoDaEquacao[index - 1] = ''
        ladoDaEquacao[index - 2] = ''
        ladoDaEquacao[index] = arrayDistributiva
        return
      }

      // ----------------------------------------------------------------------------------------------------------------------- 3ª validação de multiplicação
      // Verifica se o elemento antecessor é um ponto
      // Verifica se o elemento anteAntecessor é um array
      // Verifica se o elemento atual não é um array
      if (
        ladoDaEquacao[index - 1] === '.' &&
        typeof ladoDaEquacao[index - 2] === typeof Array &&
        typeof element !== typeof Array
      ) {
        // Array que receberá os produtos provenientes das multiplicações
        const arrayDistributiva = []
        // itera sobre cara um dos elementos do próprio elemento do tipo array
        ladoDaEquacao[index - 2].forEach((elementN) => {
          // Caso o elemento atual tenha incognita
          if (elementN.indexOf(incognita) > -1) {
            // E caso o elemento atual tenha incognita²
            if ((elementN.toString()).indexOf(`${incognita}²`) > -1) {
              // O elemento atual (fora do forEach) é multiplicado com o elemento atual (dentro do forEach)
              const elementosQuadraticosMultiplicaodos = parseFloat(elementN) * parseFloat(element)
              const elementosQuadraticosMultiplicadosString = `${elementosQuadraticosMultiplicaodos}${incognita}²`
              // E o resultado é incluído no array
              arrayDistributiva.push(elementosQuadraticosMultiplicadosString)
            } else {
              // O elemento atual (fora do forEach) é multiplicado com o elemento atual (dentro do forEach)
              const elementosMultiplicados = (parseFloat(elementN) * parseFloat(element)) + incognita
              // E o resultado é incluído no array
              arrayDistributiva.push(elementosMultiplicados)
            }
          } else {
            // O elemento atual (fora do forEach) é multiplicado com o elemento atual (dentro do forEach)
            const elementosMultiplicados = parseFloat(elementN) * parseFloat(element)
            // E o resultado é incluído no array
            arrayDistributiva.push(elementosMultiplicados)
          }
        })
        ladoDaEquacao[index - 1] = ''
        ladoDaEquacao[index - 2] = ''
        ladoDaEquacao[index] = arrayDistributiva
        return
      }

      // ----------------------------------------------------------------------------------------------------------------------- 4ª validação de multiplicação
      // Verifica se o elemento antecessor é um ponto
      // Verifica se o elemento anteAntecessor é um array
      // Verifica se o elemento atual é um array
      if (
        ladoDaEquacao[index - 1] === '.' &&
        typeof ladoDaEquacao[index - 2] === typeof Array &&
        typeof element === typeof Array
      ) {
        // Array que receberá os produtos provenientes das multiplicações
        const arrayDistributiva = []
        // itera sobre cara um dos elementos do anteAntecessor do tipo array
        ladoDaEquacao[index - 2].forEach((elementN) => {
          // Caso elemento atual dentro do array do anteAntecessor tenha incognita
          if (elementN.indexOf(incognita) > -1) {
            // itera sobre cara um dos elementos do próprio elemento do tipo array
            element.forEach((elementM) => {
              // Cada um dos elementos dentro dos arrays do elemento atual (fora do escopo dos dois forEach acima)
              // e do anteAntecessor são multiplicados entre eles
              const elementosMultiplicados = (parseFloat(elementN) * parseFloat(elementM)) + incognita
              // E o resultado é incluído no array
              arrayDistributiva.push(elementosMultiplicados)
            })
          } else {
            // itera sobre cara um dos elementos do próprio elemento do tipo array
            element.forEach((elementM) => {
              // Caso elemento atual dentro do array do elemento atual (fora do escopo dos dois forEach acima) tenha incognita
              if (elementM.indexOf(incognita) > -1) {
                // Cada um dos elementos dentro dos arrays do elemento atual (fora do escopo dos dois forEach acima)
                // e do anteAntecessor são multiplicados entre eles
                const elementosMultiplicados = (parseFloat(elementN) * parseFloat(elementM)) + incognita
                // E o resultado é incluído no array
                arrayDistributiva.push(elementosMultiplicados)
              } else {
                // Cada um dos elementos dentro dos arrays do elemento atual (fora do escopo dos dois forEach acima)
                // e do anteAntecessor são multiplicados entre eles
                const elementosMultiplicados = (parseFloat(elementN) * parseFloat(elementM))
                // E o resultado é incluído no array
                arrayDistributiva.push(elementosMultiplicados)
              }
            })
          }
        })
        ladoDaEquacao[index - 1] = ''
        ladoDaEquacao[index - 2] = ''
        ladoDaEquacao[index] = arrayDistributiva
        return
      }

      // ----------------------------------------------------------------------------------------------------------------------- 1ª validação de divisão
      // Verifica se o elemento antecessor é uma barra
      // Verifica se o elemento atual não é um array
      // Verifica se o elemento anteAntecessor não é um array
      if (
        ladoDaEquacao[index - 1] === '/' &&
        typeof element !== typeof Array &&
        typeof ladoDaEquacao[index - 2] !== typeof Array
      ) {
        // Caso o elemento atual tenha incognita e o anteAntecessor não OU
        // Caso o elemento ataul não tenha incógnita e o anteAntecessor tenha OU
        // Caso o elemento atual tenha incognita e o elemento anteAntecessor não tenha incognita² e o elemento ataul não tenha incognita²
        if (
          (
            (
              element.indexOf(incognita) > -1 &&
              (ladoDaEquacao[index - 2].toString()).indexOf(incognita) === -1
            ) ||
            (
              element.indexOf(incognita) === -1 &&
              (ladoDaEquacao[index - 2].toString()).indexOf(incognita) > -1
            )
          ) ||
          (
            element.indexOf(incognita) > -1 &&
            (ladoDaEquacao[index - 2].toString()).indexOf(`${incognita}²`) === -1 &&
            element.indexOf(`${incognita}²`) === -1
          )
        ) {
          // Divide o elemento anteAntecessor pelo atual
          const elementosDivididos = parseFloat(ladoDaEquacao[index - 2]) / parseFloat(element)
          ladoDaEquacao[index] = elementosDivididos + incognita
          ladoDaEquacao[index - 1] = ''
          ladoDaEquacao[index - 2] = ''
        // Se não e caso o elemento não tenha incógnita e o anteAntecessor tenha incognita²
        } else if (
          (
            element.indexOf(incognita) === -1 &&
            (ladoDaEquacao[index - 2].toString()).indexOf(`${incognita}²`) > -1
          )
        ) {
          // Divide o elemento anteAntecessor pelo atual
          const elementosDivididos = parseFloat(ladoDaEquacao[index - 2]) / parseFloat(element)
          const elementosDivididosStr = `${elementosDivididos}${incognita}²`
          ladoDaEquacao[index] = elementosDivididosStr
          ladoDaEquacao[index - 1] = ''
          ladoDaEquacao[index - 2] = ''
        // Se nenhuma das condiçoes anteriores forem atendidads
        } else {
          // Divide o elemento anteAntecessor pelo atual
          const elementosDivididos = parseFloat(ladoDaEquacao[index - 2]) / parseFloat(element)
          ladoDaEquacao[index] = elementosDivididos
          ladoDaEquacao[index - 1] = ''
          ladoDaEquacao[index - 2] = ''
        }
        return
      }

      // ----------------------------------------------------------------------------------------------------------------------- 2ª validação de divisão
      // Verifica se o elemento antecessor é uma barra
      // Verifica se o elemento anteAntecessor é um array
      // Verifica se o elemento atual não é um array
      if (
        ladoDaEquacao[index - 1] === '/' &&
        typeof ladoDaEquacao[index - 2] === typeof Array &&
        typeof element !== typeof Array
      ) {
        // Array que receberá os resultados provenientes das divisões
        const arrayDistributiva = []
        // itera sobre cara um dos elementos do anteAntecessor do tipo array
        ladoDaEquacao[index - 2].forEach((elementN) => {
          // Caso elemento atual (dentro do forEach) tenha incognita e o elemento atual (fora do forEach) não OU
          // Caso elemento atual (dentro do forEach) não tenha incognita e o elemento atual (fora do forEach) tenha OU
          // Caso elemento atual (dentro do forEach) tenha incognita² e o elemento atual (fora do forEach) não OU
          // Caso elemento atual (dentro do forEach) não tenha incognita² e o elemento atual (fora do forEach) tenha OU
          if (
            (
              (
                (elementN.toString()).indexOf(incognita) > -1 &&
                (element.toString()).indexOf(incognita) === -1
              ) ||
              (
                (elementN.toString()).indexOf(incognita) === -1 &&
                (element.toString()).indexOf(incognita) > -1
              )
            ) ||
            (
              (elementN.toString()).indexOf(`${incognita}²`) > -1 &&
              (element.toString()).indexOf(`${incognita}²`) === -1 &&
              (element.toString()).indexOf(incognita) > -1
            ) ||
            (
              (elementN.toString()).indexOf(`${incognita}²`) === -1 &&
              (element.toString()).indexOf(`${incognita}²`) > -1 &&
              (elementN.toString()).indexOf(incognita) > -1
            )
          ) {
            // Divide cada um dos elementos do anteAntecessor pelo atual (fora do forEach)
            const elementosDivididos = (parseFloat(elementN) / parseFloat(element)) + incognita
            // E o resultado é incluído no array
            arrayDistributiva.push(elementosDivididos)
          // Se não e caso elemento atual (dentro do forEach) tenha incognita² e o elemento atual (fora do forEach) não tenha incognita OU
          // Caso elemento atual (dentro do forEach) não tenhha incognita e o elemento atual (fora do forEach) tenha incognita² OU
          } else if (
            (
              (elementN.toString()).indexOf(`${incognita}²`) > -1 &&
              (element.toString()).indexOf(incognita) === -1
            ) ||
            (
              (elementN.toString()).indexOf(incognita) === -1 &&
              (element.toString()).indexOf(`${incognita}²`) > -1
            )
          ) {
            const elementosDivididos = (parseFloat(elementN) / parseFloat(element))
            const elementosDivididosStr = `${elementosDivididos}${incognita}²`
            arrayDistributiva.push(elementosDivididosStr)
          } else {
            const elementosDivididos = parseFloat(elementN) / parseFloat(element)
            arrayDistributiva.push(elementosDivididos)
          }
        })
        ladoDaEquacao[index - 1] = ''
        ladoDaEquacao[index - 2] = ''
        ladoDaEquacao[index] = arrayDistributiva
      }
    })

    const itemVazio = ''

    let itensVazios = ladoDaEquacao.indexOf(itemVazio)

    while (itensVazios >= 0) {
      ladoDaEquacao.splice(itensVazios, 1)
      itensVazios = ladoDaEquacao.indexOf(itemVazio)
    }

    return ladoDaEquacao
  }

  return {
    multiplicaOuDivide
  }
}
