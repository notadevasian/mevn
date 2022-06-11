<template>
    <v-container>
        <v-row no-gutter>
            <v-col sm="10" class="mx-auto">
                <v-card class="pa-5">
                    <v-card-title>Add New Server</v-card-title>
                    <v-divider></v-divider>
                    <v-form ref="form" @submit.prevent="submitForm" class="pa-5" enctype="multipart/form-data">
                        <v-text-field label="Title" v-model="server.title" prepend-icon="mdi-note" :rules="rules">
                        </v-text-field>
                        <v-radio-group prepend-icon="mdi-view-list" label="Category" v-model="server.category">
                            <v-radio label="Vanilla" value="Vanilla"></v-radio>
                            <v-radio label="Modded" value="Modded"></v-radio>
                        </v-radio-group>
                        <v-textarea label="Description" v-model="server.content" prepend-icon="mdi-note-plus"
                            :rules="rules"></v-textarea>

                        <v-file-input @change="selectFile" :rules="rules" show-size counter multiple
                            label="Select Image"></v-file-input>
                        <v-btn type="submit" class="mt-3" color="blue">Add server</v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import API from '../api';
export default {
    data() {
        return{
         rules: [(value) =>!!value || "This field is required"],
         server: {
                title: '',
                category: '',
                content: '',
                image: '',
                pterodactylurl: '',
                pterodactylapi: '',
            },
            image: "",
        };
    },
    methods: {
        selectFile(file){
            this.image = file[0];
        },
        async submitForm(){
            const formData = new FormData();
            formData.append('image', this.image);
            formData.append('title', this.server.title);
            formData.append('category', this.server.category);
            formData.append('content', this.server.content);
            formData.append('pterodactylurl', this.server.pterodactylurl);
            formData.append('pterodactylapi', this.server.pterodactylapi);
            if(this.$refs.form.validate()){
                const response = await API.addServer(formData);
                this.$router.push({ name: 'home', params: { message: response.message }});
            }
        }
    }
}
</script>