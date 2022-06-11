<template>
  <v-app>
    <Header />
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer color="#16003B lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-col class="#16003B lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Server Template</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
<script>
import Header from '@/components/header.vue';
  export default {
    components: {
      Header
    },
    data: () => ({
      dialog: false,
    }),
  }
</script>
