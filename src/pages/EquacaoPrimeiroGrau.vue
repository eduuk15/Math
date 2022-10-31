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

          <!-- <div class="flex items-center justify-center mt-16 text-[#e5e7eb] text-lg" v-if="resultado !== '' && objIncognita.incognita[0]">
            {{ objIncognita.incognita[0] }}  =  {{ resultado }}
          </div> -->
        </q-form>
    </div>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'EquacaoPrimeiroGrauPage',
  setup () {
    // const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      equacao: ''
    })

    const alfabeto = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 'u', 'v', 'w', 'x', 'y', 'z',
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]

    const objIncognita = ref({
      temIncognita: false,
      incognita: []
    })

    const resolveEquacao = () => {
      const equacao = form.value.equacao
      descobreIncognita(equacao)
      const [ladoE, ladoD] = equacao.split('=')

      const elementosLadoE = ladoE.split(' ')
      const elementosLadoD = ladoD.split(' ')
      resolveParenteses(elementosLadoE)
      console.log(elementosLadoD)
    }

    const resolveParenteses = (arrayPercorrido) => {
      const indexAbertura = arrayPercorrido.indexOf('(')
      const indexFechamento = arrayPercorrido.indexOf(')')

      const elementosParenteses = []

      arrayPercorrido.forEach((elemento, index) => {
        if (index > indexAbertura && index < indexFechamento) {
          console.log('ent')
          elementosParenteses.push(elemento)
        }
      })

      const elementosParentesesSemSinal = []

      elementosParenteses.forEach((elemento, index, array) => {
        descobreSinal(elemento, index, array, objIncognita.value.incognita[0], elementosParentesesSemSinal)
      })
      console.log(elementosParenteses)
      console.log(elementosParentesesSemSinal)
    }

    // const possuiIncognita = (elemento, incognita, arrayComIncognita, arraySemIncognita) => {
    //   if (elemento.indexOf(incognita) > -1) {
    //     arrayComIncognita.push(elemento)
    //   } else {
    //     arraySemIncognita.push(elemento)
    //   }
    // }

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

    const multiplicaElementos = (elemento, index, arrayPercorrido) => {

      arrayPercorrido.forEach((elemento, index, array, arrayMultiplicativo) => {
        if (array())
      })

      arrayPercorrido.reduce((prev, cur) => {
        if () {

        }
      }, 0)


      if (arrayPercorrido[index + 1] === '.') {
        if (elemento.indexOf(objIncognita.value.incognita[0]) > -1) {
          elemento = parseFloat(elemento) * parseFloat()
        }
      }
    }

    return {
      form,
      resolveEquacao
    }
  }
})
</script>
