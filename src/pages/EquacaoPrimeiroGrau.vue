<template>
  <q-page class="flex flex-center">
    <q-form @submit.prevent="resolveEquacaoParcial">
      <q-input
        label="Equação do 1° grau"
        v-model="form.equacao"
      />

      <q-btn
        label="Resolver!"
        type="submit"
      />
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'EquacaoPrimeiroGrauPage',
  setup () {
    const form = ref({
      equacao: ''
    })

    const elementosComIncognitaE = []
    const elementosSemIncognitaE = []
    // const elementosComIncognitaD = []

    const resolveEquacao = () => {

    }

    const resolveEquacaoParcial = () => {
      const equacao = form.value.equacao
      const [ladoE, ladoD] = equacao.split('=')

      // --------------------------------------------- LADO ESQUERDO ------------------------------------------------------------------------

      const elementosSemSinaisE = []
      const elementosLadoE = ladoE.split(' ')

      elementosLadoE.forEach((elemento, index, array) => {
        if (elemento === '') {
          array.splice(index, 1)
        }
      })

      elementosLadoE.forEach((elemento, index, array) => {
        descobreSinal(elemento, index, array, 'x', elementosSemSinaisE)
      })

      elementosSemSinaisE.forEach((elemento) => {
        possuiIncognita(elemento, 'x', elementosComIncognitaE, elementosSemIncognitaE)
      })

      console.log(elementosComIncognitaE)
      console.log(elementosSemIncognitaE)

      // --------------------------------------------------------------------------------------------------------------------------------------

      const elementosLadoD = ladoD.split(' ')
      console.log(elementosLadoD)
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

    return {
      form,
      resolveEquacao,
      resolveEquacaoParcial
    }
  }
})
</script>
