
export default function useAtribuiSinal () {
  const atribuiSinal = (ladoDaEquacao) => {
    const array = []
    if (typeof ladoDaEquacao === typeof array) {
      console.log('ta aqui fedp')
      if (ladoDaEquacao.indexOf('+') === -1 && ladoDaEquacao.indexOf('-') === -1) {
        const itemVazio = ''

        let itensVazios = ladoDaEquacao.indexOf(itemVazio)

        while (itensVazios >= 0) {
          ladoDaEquacao.splice(itensVazios, 1)
          itensVazios = ladoDaEquacao.indexOf(itemVazio)
        }
        return ladoDaEquacao
      }

      ladoDaEquacao.forEach((element, index) => {
        if (ladoDaEquacao[index - 1] === '+') {
          ladoDaEquacao[index - 1] = ''
        }
        if (ladoDaEquacao[index - 1] === '-') {
          ladoDaEquacao[index - 1] = ''
          ladoDaEquacao[index] = '-' + element
        }
      })

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
    atribuiSinal
  }
}
