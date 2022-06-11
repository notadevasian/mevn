import axios from 'axios';
const url = 'http://localhost:5000/api/servers';
const user = 'http://localhost:5000/api/user';

export default class API {
    // fetch all servers from the server
    static async fetchAllServers() {
        const res = await axios.get(url);
        return res.data;
    }
    // fetch a single server by ID
    static async fetchServerByID(id) {
        const res = await axios.get(`${url}/${id}`);
        return res.data;
    }
    // Insert server into the database
    static async addServer(server) {
        const res = await axios.post(url, server);
        return res.data;
    }
    // update server into the database
    static async updateServer(id, server) {
        const res = await axios.patch(`${url}/${id}`, server);
        return res.data;
    }
    // delete a server by ID
    static async deleteServer(id) {
        const res = await axios.delete(`${url}/${id}`);
        return res.data;
    }

    static async fetchUser() {
        const res = await axios.get(user);
        return res.data;
    }
}
