<template>
  <div class="home">
    <v-container>
      <v-alert border="left" close-text="Close Alert" color="green accent-4" dark dismissible
        v-if="this.$route.params.message">
        {{ this.$route.params.message }}
      </v-alert>
      <v-row no-gutters>
        <v-col sm="3" class="pa-3" v-for="server in servers" :key="server._id">
          <v-card class="pa-1">
            <v-img height="150" :src="`/${server.image}`"></v-img>
            <v-btn class="ml-4 mt-3" small outlined color="red">
              {{server.category}}
            </v-btn>
            <v-card-title class="headline">
              {{ server.title }}
            </v-card-title>
            <v-card-text class="py-5">
              <p>{{ server.content}}</p>
              <p>{{ server.content}}</p>
              <p>{{ server.content}}</p>
              <p>{{ server.content}}</p>
              <p>{{ server.content}}</p>
            </v-card-text>
            <div class="buttons">
              <v-btn>
                Store
              </v-btn>
              <v-btn :to="{ name: 'server', params: { id: server._id }}">
                More Info
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import API from '../api';

  export default {
    name: 'Home',
    data(){
      return {
        servers: [],
      };
    },
    async created() {
      this.servers = await API.fetchAllServers();
    }
  }
</script>

<style>
.buttons {
  display: flex;
  justify-content: center;
}
</style>