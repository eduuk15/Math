<template>
  <q-page class="relative bg-[#1f2937]">
    <div class="flex items-center justify-center">
        <q-form class="absolute top-32" @submit.prevent="resolveEquacao">
          <q-input
            label-color="[#e5e7eb]"
            input-class="text-center w-80 text-[#e5e7eb]"
            label="Equação"
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

          <div class="flex items-center justify-center mt-16 text-[#e5e7eb] text-lg" v-if="resultado !== '' && objIncognita.incognita[0]">
            {{ objIncognita.incognita[0] }}  =  {{ resultado }}
          </div>
        </q-form>
        <div class="flex items-center justify-center">
          <div class="absolute ml-12 bottom-12">
            <h1 class="absolute left-0 bottom-16 text-[#e5e7eb] text-lg italic font-bold">COMO UTILIZAR?</h1>
            <p class="flex items-center justify-left ml-48 text-[#e5e7eb] text-lg italic">
              1. Deixar um espaço entre cada número ou sinal;
            </p>
            <p class="flex items-center justify-left ml-48 text-[#e5e7eb] text-lg italic">
              2. "." para multiplicar; "/" para dividir;
            </p>
            <p class="flex items-center justify-left ml-48 text-[#e5e7eb] text-lg italic">
              3. "+" para somar; "-" para subtrair;
            </p>
            <p class="flex items-center justify-left ml-48 text-[#e5e7eb] text-lg italic">
              4. Chaves {}, Colchetes [] e Parenteses () podem ser utilizados;
            </p>
            <p class="flex items-center justify-left ml-48 text-[#e5e7eb] text-lg italic">
              5. Não multiplique elementos que possuem incógnita entre si; ;
            </p>
          </div>
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

    const objIncognita = ref({
      temIncognita: false,
      incognita: []
    })

    const resultado = ref('')

    const alfabeto = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]

    const descobreIncognita = (string) => {
      objIncognita.value.incognita = []
      alfabeto.forEach((letra) => {
        if (string.indexOf(letra) > -1) {
          objIncognita.value.temIncognita = true
          objIncognita.value.incognita.push(letra)
        }
      })
    }

    const resolveEquacaoParcial = () => {
      const equacao = form.value.equacao
      descobreIncognita(equacao)
      const [ladoE, ladoD] = equacao.split('=')

      let elementosLadoE = ladoE.split(' ')
      elementosLadoE.forEach((element, index) => {
        if (element === objIncognita.value.incognita[0]) {
          elementosLadoE[index] = '1' + element
        }
      })

      elementosLadoE = atribuiSinal(elementosLadoE)

      const elementosParentesesE = resolveParenteses(elementosLadoE, objIncognita.value.incognita)
      // console.log('elementosParentesesE', JSON.stringify(elementosParentesesE))

      const elementosColchetesE = resolveColchetes(elementosParentesesE, objIncognita.value.incognita)
      // console.log('elementosColchetesE', JSON.stringify(elementosColchetesE))

      const elementosChaveE = resolveChaves(elementosColchetesE, objIncognita.value.incognita)
      // console.log('elementosChaveE', JSON.stringify(elementosChaveE))

      elementos.value.elementosE = elementosChaveE

      let elementosLadoD = ladoD.split(' ')
      elementosLadoD.forEach((element, index) => {
        if (element === objIncognita.value.incognita[0]) {
          elementosLadoD[index] = '1' + element
        }
      })

      elementosLadoD = atribuiSinal(elementosLadoD)

      const elementosParentesesD = resolveParenteses(elementosLadoD, objIncognita.value.incognita)

      const elementosColchetesD = resolveColchetes(elementosParentesesD, objIncognita.value.incognita)

      const elementosChaveD = resolveChaves(elementosColchetesD, objIncognita.value.incognita)

      elementos.value.elementosD = elementosChaveD
    }

    const resolveEquacao = () => {
      resolveEquacaoParcial()
      const elementosMultiplicadosDividosE = multiplicaOuDivide(elementos.value.elementosE, objIncognita.value.incognita)
      // console.log('elementosMultiplicadosDividosE', JSON.stringify(elementosMultiplicadosDividosE))

      const elementosSomadosE = soma(elementosMultiplicadosDividosE, objIncognita.value.incognita)
      // console.log('elementosSomadosE', JSON.stringify(elementosSomadosE))

      const elementosMultiplicadosDividosD = multiplicaOuDivide(elementos.value.elementosD, objIncognita.value.incognita)
      const elementosSomadosD = soma(elementosMultiplicadosDividosD, objIncognita.value.incognita)

      // console.log(elementosSomadosE)
      // console.log(elementosSomadosD)

      resultado.value = (parseFloat(elementosSomadosD[0]) - parseFloat(elementosSomadosE[0])) / (parseFloat(elementosSomadosE[1]) - parseFloat(elementosSomadosD[1]))

      if (objIncognita.value.incognita.length > 1) {
        objIncognita.value.incognita = ''
        notifyError('Não é possível efetuar a operação!')
        notifyHint('Só deve existir uma incógnita!')
      } else if (!objIncognita.value.incognita.length) {
        objIncognita.value.incognita = ''
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
      objIncognita,
      resultado
    }
  }
})
</script>
