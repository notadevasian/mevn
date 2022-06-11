<template>
    <v-app-bar app color="#333" flat>
        <v-container class="py-0 fill-height">
            <v-btn v-for="link in links" text :to="link.link">
                {{ link.title }}
            </v-btn>
            <v-spacer>
            </v-spacer>
            <v-responsive max-width="260">
                <div class="text-center">
                    <v-dialog v-model="dialog" width="500">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn color="red darken-1" dark v-bind="attrs" v-on="on">
                                Login
                            </v-btn>
                        </template>

                        <v-card>
                            <v-card-title class="text-h5 #333 lighten-2">
                                Login Here
                            </v-card-title>

                            <v-card-text>
                                <a href="http://localhost:5000/auth/steam/">Login Here</a>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red darken-1" text @click="dialog = false">
                                    Close
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </div>
            </v-responsive>
        </v-container>
    </v-app-bar>
</template>

<!-- Export header -->

<script>

export default {
    data: () => ({
        dialog: false,
        links: [
            { title: 'Home', link: "/" },
            { title: 'Leaderboards', link: "/leaderboards" },
            { title: 'User Api Test', link: "/user" },
        ],
    }),
};

</script>