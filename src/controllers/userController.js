const encriptador = require('bcrypt');
const usersModel = require('../models/users.model');

const userController = {
    form: (req, res)=>{
        res.render('userForm');
    },
    post: async (req, res)=>{
        try {
            let {firstName, surname, email, profileImage, username, password} = req.body
            if(!firstName || !surname || !email || !username || !password){ 
                res.send({status: 'Error', error: "Falta rellenar capos"})
                return
            }

            let hashPassword = encriptador.hashSync(password, 10);
            const newUser = await usersModel.create({name: firstName, surname, email, profileImage, username, password: hashPassword});
            res.send({result: "Succes", payload: newUser});    
        } catch (error) {
            res.send({result: 'Error', payload: error});
        }
    },
    userList: async (req, res)=>{
        try {
            const userList = await usersModel.find();
            res.send({result: 'succes', payload: userList});
        } catch (error) {
            res.send({result: 'Error', payload: error});
        }
    },
    deleteById: async (req, res)=>{
        console.log('Eliminando usuario');
        const{id} = req.params;
        const deletedUser = await usersModel.findByIdAndDelete(id);
        console.log('El usurio se eliminó');
        res.send({result: "succes, product deleted", payload: deletedUser});
    }
}

module.exports = userController;