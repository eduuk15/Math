
export default function UseMultiplicaOuDivide () {
  const multiplicaOuDivide = (ladoDaEquacao, incognita) => {
  // Primeiro tenho que validar se tem ponto, se n�o nem faz nada
    if (ladoDaEquacao.indexOf('.') === -1 && ladoDaEquacao.indexOf('/') === -1) {
      return ladoDaEquacao
    }

    const Array = []

    // Ok, tem ponto!!! Ent�o agora tem que multiplicar os elementos e ir trocando
    ladoDaEquacao.forEach((element, index) => {
    // Caso o elemento anterior ao atual for um ponto, e o elemento atual nem o elemento antes do ponto for array
      if (ladoDaEquacao[index - 1] === '.' && typeof element !== typeof Array && typeof ladoDaEquacao[index - 2] !== typeof Array) {
        // Caso o elemento atual ou o elemento antes do ponto tiver incognita
        if (element.indexOf(incognita) > -1 || (ladoDaEquacao[index - 2].toString()).indexOf(incognita) > -1) {
          const elementosMultiplicados = parseFloat(element) * parseFloat(ladoDaEquacao[index - 2])
          ladoDaEquacao[index] = elementosMultiplicados + incognita
          ladoDaEquacao[index - 1] = ''
          ladoDaEquacao[index - 2] = ''
        } else {
          const elementosMultiplicados = parseFloat(element) * parseFloat(ladoDaEquacao[index - 2])
          ladoDaEquacao[index] = elementosMultiplicados
          ladoDaEquacao[index - 1] = ''
          ladoDaEquacao[index - 2] = ''
        }
      }

      if (ladoDaEquacao[index - 1] === '.' && typeof element === typeof Array && typeof ladoDaEquacao[index - 2] !== typeof Array) {
        const i = ladoDaEquacao[index - 2]
        const arrayDistributiva = []
        element.forEach((elementN, index) => {
          if (elementN.indexOf(incognita) > -1) {
            const elementosMultiplicados = (parseFloat(elementN) * parseFloat(i)) + incognita
            arrayDistributiva.push(elementosMultiplicados)
          } else {
            const elementosMultiplicados = parseFloat(elementN) * parseFloat(i)
            arrayDistributiva.push(elementosMultiplicados)
          }
        })
        ladoDaEquacao[index - 1] = ''
        ladoDaEquacao[index - 2] = ''
        ladoDaEquacao[index] = arrayDistributiva
      }

      if (ladoDaEquacao[index - 1] === '.' && typeof ladoDaEquacao[index - 2] === typeof Array && typeof element !== typeof Array) {
        const arrayDistributiva = []
        ladoDaEquacao[index - 2].forEach((elementN, index) => {
          if (elementN.indexOf(incognita) > -1) {
            const elementosMultiplicados = (parseFloat(elementN) * parseFloat(element)) + incognita
            arrayDistributiva.push(elementosMultiplicados)
          } else {
            const elementosMultiplicados = parseFloat(elementN) * parseFloat(element)
            arrayDistributiva.push(elementosMultiplicados)
          }
        })
        ladoDaEquacao[index - 1] = ''
        ladoDaEquacao[index - 2] = ''
        ladoDaEquacao[index] = arrayDistributiva
      }

      if (ladoDaEquacao[index - 1] === '.' && typeof ladoDaEquacao[index - 2] === typeof Array && typeof element === typeof Array) {
        const arrayDistributiva = []
        ladoDaEquacao[index - 2].forEach((elementN, index) => {
          if (elementN.indexOf(incognita) > -1) {
            element.forEach((elementM) => {
              const elementosMultiplicados = (parseFloat(elementN) * parseFloat(elementM)) + incognita
              arrayDistributiva.push(elementosMultiplicados)
            })
          } else {
            element.forEach((elementM) => {
              if (elementM.indexOf(incognita) > -1) {
                const elementosMultiplicados = (parseFloat(elementN) * parseFloat(elementM)) + incognita
                arrayDistributiva.push(elementosMultiplicados)
              } else {
                const elementosMultiplicados = (parseFloat(elementN) * parseFloat(elementM))
                arrayDistributiva.push(elementosMultiplicados)
              }
            })
          }
        })
        ladoDaEquacao[index - 1] = ''
        ladoDaEquacao[index - 2] = ''
        ladoDaEquacao[index] = arrayDistributiva
      }

      // ---------------------------------------------------------------------------------------------------------------------

      // Caso o elemento anterior ao atual for um ponto, e o elemento atual nem o elemento antes do ponto for array
      if (ladoDaEquacao[index - 1] === '/' && typeof element !== typeof Array && typeof ladoDaEquacao[index - 2] !== typeof Array) {
        console.log('1 IF')
        // Caso o elemento atual ou o elemento antes do ponto tiver incognita
        if (element.indexOf(incognita) > -1 || (ladoDaEquacao[index - 2].toString()).indexOf(incognita) > -1) {
          const elementosDivididos = parseFloat(ladoDaEquacao[index - 2]) / parseFloat(element)
          ladoDaEquacao[index] = elementosDivididos + incognita
          ladoDaEquacao[index - 1] = ''
          ladoDaEquacao[index - 2] = ''
        } else {
          const elementosDivididos = parseFloat(ladoDaEquacao[index - 2]) / parseFloat(element)
          ladoDaEquacao[index] = elementosDivididos
          ladoDaEquacao[index - 1] = ''
          ladoDaEquacao[index - 2] = ''
        }
      }

      if (ladoDaEquacao[index - 1] === '/' && typeof ladoDaEquacao[index - 2] === typeof Array && typeof element !== typeof Array) {
        console.log('2 IF')
        const arrayDistributiva = []
        ladoDaEquacao[index - 2].forEach((elementN, index) => {
          if (elementN.indexOf(incognita) > -1) {
            const elementosDivididos = (parseFloat(elementN) / parseFloat(element)) + incognita
            arrayDistributiva.push(elementosDivididos)
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
