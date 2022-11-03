
export default function useResolveParenteses () {
  const resolveParenteses = (ladoDaEquacao) => {
    const array = []
    if (typeof ladoDaEquacao === typeof array) {
      while (ladoDaEquacao.indexOf('(') > -1) {
        ladoDaEquacao.forEach((element, index) => {
          if (element === '(') {
            const arrayParentesesResolvidos = ladoDaEquacao.slice(index + 1, ladoDaEquacao.indexOf(')'))
            ladoDaEquacao[index] = arrayParentesesResolvidos
            let indexAbreParenteses = index + 1
            const indexFechaParenteses = ladoDaEquacao.indexOf(')')
            while (indexAbreParenteses <= indexFechaParenteses) {
              ladoDaEquacao[indexAbreParenteses] = ''
              indexAbreParenteses++
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
    resolveParenteses
  }
}
