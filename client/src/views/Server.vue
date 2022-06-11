<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="10" class="pa-4 mx-auto">
                <v-card class="pa-2">
                    <v-img height="10rem" style="opacity: 0.5;" :src="`/${server.image}`"></v-img>
                    <v-card-actions class="pb-0">
                        <v-row class="mt-1 mx-1">
                            <v-col sm="2">
                                <v-btn small outlined color="red">{{ server.category }}</v-btn>
                            </v-col>
                            <v-col sm="10" class="d-flex justify-end">
                                <v-btn color="grey" text :to="{ name: 'edit-server', params: { id: server._id } }">Edit
                                </v-btn>
                                <v-btn color="green" text>Wipe Now</v-btn>
                                <v-btn color="red" text @click="removeServer(server._id)">Delete</v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                    <v-card-subtitle class="headline">
                        <h3>{{ server.title }}</h3>
                        <v-card-text class="grey--text">
                            <p>{{ server.content }}</p>
                        </v-card-text>
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from '../api';
export default {
    data() {
        return {
            server: {},
        };
    },
    async created() {
        const response = await API.fetchServerByID(this.$route.params.id);
        this.server = response;
    },
    methods: {
        async removeServer(id) {
            const response = await API.deleteServer(id);
            this.$router.push({ name: 'home', params: { message: response.message } });
        },
    }
}
</script>