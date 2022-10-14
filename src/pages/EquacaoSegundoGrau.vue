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

          <div class="flex items-center justify-center mt-16 text-[#e5e7eb] text-lg">
            aqui
          </div>
        </q-form>
    </div>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
// import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'EquacaoSegundoGrauPage',
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

    const erro = ref(true)

    const resolveEquacao = () => {
      console.log('deu boa')
    }

    const resolveEquacaoParcial = async () => {
      try {

      } catch {

      }
    }

    return {
      form,
      resolveEquacao
    }
  }
})

</script>
