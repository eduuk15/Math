
export default function useResolveChaves () {
  const resolveChaves = (ladoDaEquacao) => {
    const array = []
    if (typeof ladoDaEquacao === typeof array) {
      while (ladoDaEquacao.indexOf('[') > -1) {
        ladoDaEquacao.forEach((element, index) => {
          if (element === '{') {
            const arrayChavesResolvidos = ladoDaEquacao.slice(index + 1, ladoDaEquacao.indexOf('}'))
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
