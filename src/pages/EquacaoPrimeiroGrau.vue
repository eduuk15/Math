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

          <div class="flex items-center justify-center mt-16 text-[#e5e7eb] text-lg" v-if="resultado && objIncognita.incognita[0]">
            {{ objIncognita.incognita[0] }}  =  {{ resultado }}
          </div>
        </q-form>
    </div>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'EquacaoPrimeiroGrauPage',
  setup () {
    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      equacao: ''
    })

    const somaElementosSemIncognita = ref({
      e: '',
      d: ''
    })

    const somaElementosComIncognita = ref({
      e: '',
      d: ''
    })

    const resultado = ref('')

    const alfabeto = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]

    const objIncognita = ref({
      temIncognita: false,
      incognita: []
    })

    const erro = ref(true)

    const resolveEquacao = () => {
      resolveEquacaoParcial()
      resultado.value = (
        (somaElementosSemIncognita.value.d - somaElementosSemIncognita.value.e) /
        (somaElementosComIncognita.value.e - somaElementosComIncognita.value.d)
      )
      if (isNaN(resultado.value)) {
        notifyError('Não foi possível resolver a equação!')
        return
      }
      if (!erro.value) {
        notifySuccess('Equação resolvida com sucesso!')
      }
    }

    const resolveEquacaoParcial = async () => {
      try {
        erro.value = true
        const elementosComIncognitaE = []
        const elementosSemIncognitaE = []

        const elementosComIncognitaD = []
        const elementosSemIncognitaD = []

        const equacao = form.value.equacao
        descobreIncognita(equacao)

        if (equacao.indexOf('=') <= -1) {
          notifyError('Insira o sinal de igualdade(=) para resolver a equação!')
          return
        }

        const [ladoE, ladoD] = equacao.split('=')

        if (ladoE === '' || ladoD === '') {
          notifyError('Os dois "lados" da equação devem ser preenchidos!')
          return
        }

        if (objIncognita.value.incognita.length > 1) {
          notifyError('Só pode existir uma incógnita por equação!')
          return
        }

        if (objIncognita.value.incognita.length === 0) {
          notifyError('Insira uma incógnita na equação!')
          return
        }

        const incognita = objIncognita.value.incognita

        // --------------------------------------------- LADO ESQUERDO ------------------------------------------------------------------------

        const elementosSemSinaisE = []
        const elementosLadoE = ladoE.split(' ')

        elementosLadoE.forEach((elemento, index, array) => {
          if (elemento === '') {
            array.splice(index, 1)
          }
        })

        elementosLadoE.forEach((elemento, index, array) => {
          descobreSinal(elemento, index, array, incognita, elementosSemSinaisE)
        })

        elementosSemSinaisE.forEach((elemento) => {
          possuiIncognita(elemento, incognita, elementosComIncognitaE, elementosSemIncognitaE)
        })

        const somaElementosSemIncognitaE = elementosSemIncognitaE.reduce((prev, cur) => {
          return parseFloat(prev) + parseFloat(cur)
        }, 0)
        somaElementosSemIncognita.value.e = somaElementosSemIncognitaE

        const somaElementosComIncognitaE = elementosComIncognitaE.reduce((prev, cur) => {
          return parseFloat(prev) + parseFloat(cur)
        }, 0)
        somaElementosComIncognita.value.e = somaElementosComIncognitaE

        // -----------------------------------------------------------------------------------------------------------------------------------

        // --------------------------------------------- LADO DIREITO ------------------------------------------------------------------------

        const elementosSemSinaisD = []
        const elementosLadoD = ladoD.split(' ')

        elementosLadoD.forEach((elemento, index, array) => {
          if (elemento === '') {
            array.splice(index, 1)
          }
        })

        elementosLadoD.forEach((elemento, index, array) => {
          descobreSinal(elemento, index, array, incognita, elementosSemSinaisD)
        })

        elementosSemSinaisD.forEach((elemento) => {
          possuiIncognita(elemento, incognita, elementosComIncognitaD, elementosSemIncognitaD)
        })

        const somaElementosSemIncognitaD = elementosSemIncognitaD.reduce((prev, cur) => {
          return parseFloat(prev) + parseFloat(cur)
        }, 0)
        somaElementosSemIncognita.value.d = somaElementosSemIncognitaD

        const somaElementosComIncognitaD = elementosComIncognitaD.reduce((prev, cur) => {
          if (cur === incognita) {
            cur = 1
          }
          if (cur === '-' + incognita) {
            cur = -1
          }
          return parseFloat(prev) + parseFloat(cur)
        }, 0)
        somaElementosComIncognita.value.d = somaElementosComIncognitaD

        // -----------------------------------------------------------------------------------------------------------------------------------

        if (elementosLadoE[0] === '' || elementosLadoD[0] === '') {
          notifyError('Os dois "lados" da equação devem ser preenchidos!')
          return
        }

        erro.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const possuiIncognita = (elemento, incognita, arrayComIncognita, arraySemIncognita) => {
      if (elemento.indexOf(incognita) > -1) {
        arrayComIncognita.push(elemento)
      } else {
        arraySemIncognita.push(elemento)
      }
    }

    const descobreSinal = (elemento, index, arrayPercorrido, incognita, arraySemSinal) => {
      if (elemento !== '+' && elemento !== '-') {
        if (arrayPercorrido[index - 1] === '-') {
          if (elemento.indexOf(incognita) > -1) {
            arraySemSinal.push('-' + elemento)
          } else {
            arraySemSinal.push('-' + elemento)
          }
        } else {
          arraySemSinal.push(elemento)
        }
      }
    }

    const descobreIncognita = (string) => {
      objIncognita.value.incognita = []
      alfabeto.forEach((letra) => {
        if (string.indexOf(letra) > -1) {
          objIncognita.value.temIncognita = true
          objIncognita.value.incognita.push(letra)
        }
      })
    }

    return {
      form,
      resolveEquacao,
      resultado,
      objIncognita
    }
  }
})
</script>
