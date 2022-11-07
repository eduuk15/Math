import useMultiplicaOuDivide from './MultiplicaOuDivide'
import useSoma from './Soma'

export default function useResolveChaves () {
  const { multiplicaOuDivide } = useMultiplicaOuDivide()
  const { soma } = useSoma()
  const resolveChaves = (ladoDaEquacao, incognita) => {
    const array = []
    if (typeof ladoDaEquacao === typeof array) {
      while (ladoDaEquacao.indexOf('{') > -1) {
        ladoDaEquacao.forEach((element, index) => {
          if (element === '{') {
            let arrayChavesResolvidos = ladoDaEquacao.slice(index + 1, ladoDaEquacao.indexOf('}'))
            arrayChavesResolvidos = multiplicaOuDivide(arrayChavesResolvidos, incognita)
            arrayChavesResolvidos = soma(arrayChavesResolvidos, incognita)
            ladoDaEquacao[index] = arrayChavesResolvidos
            let indexAbreChaves = index + 1
            const indexFechaChaves = ladoDaEquacao.indexOf('}')
            while (indexAbreChaves <= indexFechaChaves) {
              ladoDaEquacao[indexAbreChaves] = ''
              indexAbreChaves++
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
    resolveChaves
  }
}
