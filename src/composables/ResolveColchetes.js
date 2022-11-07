import useMultiplicaOuDivide from './MultiplicaOuDivide'
import useSoma from './Soma'

export default function useResolveColchetes () {
  const { multiplicaOuDivide } = useMultiplicaOuDivide()
  const { soma } = useSoma()
  const resolveColchetes = (ladoDaEquacao, incognita) => {
    const array = []
    if (typeof ladoDaEquacao === typeof array) {
      while (ladoDaEquacao.indexOf('[') > -1) {
        ladoDaEquacao.forEach((element, index) => {
          if (element === '[') {
            let arrayColchetesResolvidos = ladoDaEquacao.slice(index + 1, ladoDaEquacao.indexOf(']'))
            arrayColchetesResolvidos = multiplicaOuDivide(arrayColchetesResolvidos, incognita)
            arrayColchetesResolvidos = soma(arrayColchetesResolvidos, incognita)
            ladoDaEquacao[index] = arrayColchetesResolvidos
            let indexAbreColchetes = index + 1
            const indexFechaColchetes = ladoDaEquacao.indexOf(']')
            while (indexAbreColchetes <= indexFechaColchetes) {
              ladoDaEquacao[indexAbreColchetes] = ''
              indexAbreColchetes++
            }
          }
        })
      }
      const itemVazio = ''

      let itensVazios = ladoDaEquacao.indexOf(itemVazio)

      while (itensVazios >= 0) {
        ladoDaEquacao.splice(itensVazios, 1)
        itensVazios = ladoDaEquacao.indexOf(itemVazio)
      }
    }

    return ladoDaEquacao
  }
  return {
    resolveColchetes
  }
}
