<template>
    <v-container>
        <v-row no-gutters>
            <v-col sm="4" class="pa-3" v-for="user in users" :key="user._json">
                <v-card class="pa-1">
                    <v-card-text class="py-5">
                        <p>{{ profile.personaname }}</p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import API from '../api';

export default {
    name: 'User',
    data() {
        return {
            users: [],
        };
    },
    async created() {
        this.users = await API.fetchUser();
    }
}
</script>