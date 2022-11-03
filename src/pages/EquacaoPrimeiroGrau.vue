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

    const resolveEquacao = () => {
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
      // console.log('chega assim do atribui sinal', elementosLadoE)
      elementosLadoE = resolveChaves(elementosLadoE)
      elementosLadoE = resolveColchetes(elementosLadoE)
      elementosLadoE = resolveParenteses(elementosLadoE)
      // console.log('chega assim das resolucoes', elementosLadoE)
      elementosLadoE = multiplicaOuDivide(elementosLadoE, objIncognita.value.incognita)
      // console.log('chega assim do mult e div', elementosLadoE)
      elementosLadoE = soma(elementosLadoE, objIncognita.value.incognita)
      console.log('chega assim do soma', elementosLadoE)

      let elementosLadoD = ladoD.split(' ')
      elementosLadoD.forEach((element, index) => {
        if (element === objIncognita.value.incognita[0]) {
          elementosLadoD[index] = '1' + element
        }
      })
      elementosLadoD = atribuiSinal(elementosLadoD)
      elementosLadoD = resolveChaves(elementosLadoD)
      elementosLadoD = resolveColchetes(elementosLadoD)
      elementosLadoD = resolveParenteses(elementosLadoD)
      elementosLadoD = multiplicaOuDivide(elementosLadoD, objIncognita.value.incognita)
      elementosLadoD = soma(elementosLadoD, objIncognita.value.incognita)

      resultado.value = (parseFloat(elementosLadoD[0]) - parseFloat(elementosLadoE[0])) / (parseFloat(elementosLadoE[1]) - parseFloat(elementosLadoD[1]))

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
