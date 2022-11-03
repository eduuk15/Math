
export default function useResolveColchetes () {
  const resolveColchetes = (ladoDaEquacao) => {
    const array = []
    if (typeof ladoDaEquacao === typeof array) {
      while (ladoDaEquacao.indexOf('[') > -1) {
        ladoDaEquacao.forEach((element, index) => {
          if (element === '[') {
            const arrayColchetesResolvidos = ladoDaEquacao.slice(index + 1, ladoDaEquacao.indexOf(']'))
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
