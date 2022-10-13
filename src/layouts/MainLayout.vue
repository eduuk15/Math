<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-[#1e3a8a] text-[#e5e7eb]">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="[#e5e7eb]"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-2xl">
            Math <i class="fa-solid fa-square-root-variable"></i>
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      class="bg-[#1e3a8a]"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list class="text-[#e5e7eb]">
        <q-item-label
          header
          class="text-[#e5e7eb]"
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
        <router-view v-slot="{ Component }">
          <transition
            appear
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutRight"
          >
            <component :is="Component" />
          </transition>
        </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Equação do 1° grau',
    caption: '',
    icon: 'fa-solid fa-equals',
    routeName: 'equacaoprimeiro'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
