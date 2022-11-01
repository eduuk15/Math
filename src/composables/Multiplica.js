
const lado = [['5', '3'], '.', ['2x', '3']]
const incognita = 'x'

const multiplica = (ladoDaEquacao, incognita) => {
  // Primeiro tenho que validar se tem ponto, se n�o nem faz nada
  if (ladoDaEquacao.indexOf('.') === -1) {
    return null
  }

  const Array = []

  console.log(typeof Array)

  // Ok, tem ponto!!! Ent�o agora tem que multiplicar os elementos e ir trocando
  ladoDaEquacao.forEach((element, index) => {
    // Caso o elemento anterior ao atual for um ponto, e o elemento atual nem o elemento antes do ponto for array
    if (ladoDaEquacao[index - 1] === '.' && typeof element !== typeof Array && typeof ladoDaEquacao[index - 2] !== typeof Array) {
      console.log('1 IF')
      // Caso o elemento atual ou o elemento antes do ponto tiver incognita
      if (element.indexOf(incognita) > -1 || toString(ladoDaEquacao[index - 2]).indexOf(incognita) > -1) {
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
      console.log('2 IF')
      const i = ladoDaEquacao[index - 2]
      const arrayDistibutiva = []
      element.forEach((elementN, index) => {
        if (elementN.indexOf(incognita) > -1) {
          const elementosMultiplicados = (parseFloat(elementN) * parseFloat(i)) + incognita
          arrayDistibutiva.push(elementosMultiplicados)
        } else {
          const elementosMultiplicados = parseFloat(elementN) * parseFloat(i)
          arrayDistibutiva.push(elementosMultiplicados)
        }
      })
      ladoDaEquacao[index - 1] = ''
      ladoDaEquacao[index - 2] = ''
      ladoDaEquacao[index] = arrayDistibutiva
    }

    if (ladoDaEquacao[index - 1] === '.' && typeof ladoDaEquacao[index - 2] === typeof Array && typeof element !== typeof Array) {
      console.log('3 IF')
      const arrayDistibutiva = []
      ladoDaEquacao[index - 2].forEach((elementN, index) => {
        if (elementN.indexOf(incognita) > -1) {
          const elementosMultiplicados = (parseFloat(elementN) * parseFloat(element)) + incognita
          arrayDistibutiva.push(elementosMultiplicados)
        } else {
          const elementosMultiplicados = parseFloat(elementN) * parseFloat(element)
          arrayDistibutiva.push(elementosMultiplicados)
        }
      })
      ladoDaEquacao[index - 1] = ''
      ladoDaEquacao[index - 2] = ''
      ladoDaEquacao[index] = arrayDistibutiva
    }

    if (ladoDaEquacao[index - 1] === '.' && typeof ladoDaEquacao[index - 2] === typeof Array && typeof element === typeof Array) {
      console.log('4 IF')
      const arrayDistibutiva = []
      ladoDaEquacao[index - 2].forEach((elementN, index) => {
        if (elementN.indexOf(incognita) > -1) {
          element.forEach((elementM) => {
            const elementosMultiplicados = (parseFloat(elementN) * parseFloat(elementM)) + incognita
            arrayDistibutiva.push(elementosMultiplicados)
          })
        } else {
          element.forEach((elementM) => {
            if (elementM.indexOf(incognita) > -1) {
              const elementosMultiplicados = (parseFloat(elementN) * parseFloat(elementM)) + incognita
              arrayDistibutiva.push(elementosMultiplicados)
            } else {
              const elementosMultiplicados = (parseFloat(elementN) * parseFloat(elementM))
              arrayDistibutiva.push(elementosMultiplicados)
            }
          })
        }
      })
      ladoDaEquacao[index - 1] = ''
      ladoDaEquacao[index - 2] = ''
      ladoDaEquacao[index] = arrayDistibutiva
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

const x = multiplica(lado, incognita)
console.log('aqui o resultado')
console.log(x)
