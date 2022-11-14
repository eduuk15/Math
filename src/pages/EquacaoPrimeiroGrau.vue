<template>
 <q-page class="relative bg-[#1f2937]">
    <div class="flex items-center justify-center">
        <q-form class="mt-12" @submit.prevent="resolveEquacao">
          <q-input
            label-color="[#e5e7eb]"
            input-class="text-center w-80 text-[#e5e7eb]"
            label="Equação do 1º grau"
            v-model="form.equacao"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'É obrigatório inserir uma equação!']"
            item-aligned
          />

          <div class="flex items-center justify-center mt-8">
              <q-btn
                class="w-2/3 bg-[#1e3a8a] text-[#e5e7eb]"
                label="Resolver!"
                type="submit"
              />
          </div>

          <div class="flex items-center justify-center mt-16 text-[#e5e7eb] text-lg" v-if="resultado !== '' && incognita[0]">
              <p>{{ incognita[0] }} = {{ resultado }}</p>
          </div>
        </q-form>
    </div>
    <div class="flex items-center justify-center mt-36 text-[#e5e7eb] text-lg italic">
      <h1 class="font-bold">COMO UTILIZAR?</h1>
      <div class="ml-4 items-center justify-center">
        <p>
          1. Deixar um espaço entre cada número ou sinal;
        </p>
        <p>
          2. "." para multiplicar; "/" para dividir;
        </p>
        <p>
          3. "+" para somar; "-" para subtrair;
        </p>
        <p>
          4. Chaves {}, Colchetes [] e Parenteses () podem ser utilizados;
        </p>
      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useNotify from 'src/composables/UseNotify'
import useSoma from 'src/composables/Soma'
import useMultiplicaOuDivide from 'src/composables/MultiplicaOuDivide'
import useAtribuiSinal from 'src/composables/AtribuiSinal'
import useResolveParenteses from 'src/composables/ResolveParenteses'
import useResolveColchetes from 'src/composables/ResolveColchetes'
import useResolveChaves from 'src/composables/ResolveChaves'

export default defineComponent({
  name: 'EquacaoPrimeiroGrauPage',
  setup () {
    const { notifyError, notifySuccess, notifyHint } = useNotify()
    const { multiplicaOuDivide } = useMultiplicaOuDivide()
    const { soma } = useSoma()
    const { atribuiSinal } = useAtribuiSinal()
    const { resolveParenteses } = useResolveParenteses()
    const { resolveColchetes } = useResolveColchetes()
    const { resolveChaves } = useResolveChaves()

    const form = ref({
      equacao: ''
    })

    const elementos = ref({
      elementosE: '',
      elementosD: ''
    })

    const incognita = ref(
      []
    )

    const resultado = ref('')

    const alfabeto = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]

    const descobreIncognita = (string) => {
      incognita.value = []
      alfabeto.forEach((letra) => {
        if (string.indexOf(letra) > -1) {
          incognita.value.push(letra)
        }
      })
    }

    const resolveEquacaoParcial = () => {
      const equacao = form.value.equacao
      descobreIncognita(equacao)
      const [ladoE, ladoD] = equacao.split('=')

      let elementosLadoE = ladoE.split(' ')
      elementosLadoE.forEach((element, index) => {
        if (element === incognita.value[0]) {
          elementosLadoE[index] = '1' + element
        }
      })

      elementosLadoE = atribuiSinal(elementosLadoE)

      const elementosParentesesE = resolveParenteses(elementosLadoE, incognita.value)
      // console.log('elementosParentesesE', JSON.stringify(elementosParentesesE))

      const elementosColchetesE = resolveColchetes(elementosParentesesE, incognita.value)
      // console.log('elementosColchetesE', JSON.stringify(elementosColchetesE))

      const elementosChaveE = resolveChaves(elementosColchetesE, incognita.value)
      // console.log('elementosChaveE', JSON.stringify(elementosChaveE))

      elementos.value.elementosE = elementosChaveE

      let elementosLadoD = ladoD.split(' ')
      elementosLadoD.forEach((element, index) => {
        if (element === incognita.value[0]) {
          elementosLadoD[index] = '1' + element
        }
      })

      elementosLadoD = atribuiSinal(elementosLadoD)

      const elementosParentesesD = resolveParenteses(elementosLadoD, incognita.value)

      const elementosColchetesD = resolveColchetes(elementosParentesesD, incognita.value)

      const elementosChaveD = resolveChaves(elementosColchetesD, incognita.value)

      elementos.value.elementosD = elementosChaveD
    }

    const resolveEquacao = () => {
      resolveEquacaoParcial()
      const elementosMultiplicadosDividosE = multiplicaOuDivide(elementos.value.elementosE, incognita.value)
      // console.log('elementosMultiplicadosDividosE', JSON.stringify(elementosMultiplicadosDividosE))

      const elementosSomadosE = soma(elementosMultiplicadosDividosE, incognita.value)
      // console.log('elementosSomadosE', JSON.stringify(elementosSomadosE))

      const elementosMultiplicadosDividosD = multiplicaOuDivide(elementos.value.elementosD, incognita.value)
      const elementosSomadosD = soma(elementosMultiplicadosDividosD, incognita.value)

      // console.log(elementosSomadosE)
      // console.log(elementosSomadosD)

      resultado.value = (parseFloat(elementosSomadosD[0]) - parseFloat(elementosSomadosE[0])) / (parseFloat(elementosSomadosE[1]) - parseFloat(elementosSomadosD[1]))

      if (incognita.value.length > 1) {
        incognita.value = ''
        notifyError('Não é possível efetuar a operação!')
        notifyHint('Só deve existir uma incógnita!')
      } else if (!incognita.value.length) {
        incognita.value = ''
        notifyError('Não é possível efetuar a operação!')
        notifyHint('Insira uma incógnita para resolver a equação!')
      } else if (resultado.value === Infinity) {
        resultado.value = ''
        notifyError('Não é possível efetuar a operação!')
        notifyHint('O coeficiente da equação pode estar incorreto...')
      } else if (isNaN(resultado.value)) {
        resultado.value = ''
        notifyHint('Qualquer valor satisfaz a equação!')
      } else {
        notifySuccess('Equação resolvida com sucesso!')
      }
    }

    return {
      form,
      resolveEquacao,
      incognita,
      resultado
    }
  }
})
</script>
