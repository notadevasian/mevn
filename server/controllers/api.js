const Servers = require('../models/servers');
const Users = require('../models/auth');
const fs = require('fs');


module.exports = class API {
    // fetch all servers
    static async fetchAllServers(req, res) {
        try {
            const servers = await Servers.find();
            res.status(200).json(servers);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    // fetch a server by id
    static async fetchServerByID(req, res) {
        const id = req.params.id;
        try {
            const server = await Servers.findById(id);
            res.status(200).json(server);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    // create a server
    static async createServer(req, res) {
        const server = req.body;
        const imagename = req.file.filename;
        server.image = imagename;
        try{
            await Servers.create(server);
            res.status(201).json({ message: 'Server created' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    // update a server
    static async updateServer(req, res) {
        const id = req.params.id;
        let new_image = '';
        if(req.file){
            new_image = req.file.filename;
            try{    
                fs.unlinkSync("uploads/" + req.body.old_image);
            }catch (error) {
                console.log(error);
            }
        }else {
            new_image = req.body.old_image;
        }
        const newServer = req.body;
        newServer.image = new_image;

        try {
            await Servers.findByIdAndUpdate(id, newServer);
            res.status(200).json({ message: 'Server updated' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
    // delete a server
    static async deleteServer(req, res) {
        const id = req.params.id;
        try{
            const result = await Servers.findByIdAndDelete(id);
            if(result.image != ''){
                try {
                    fs.unlinkSync('./uploads/' + result.image);
                } catch (error) {
                    console.log(error);
                }
            }
            res.status(200).json({ message: 'Server deleted' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async createUser(req, res) {
        const user = req.body;
        try{
            await Users.create(user);
            res.status(201).json({ message: 'User created' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}
