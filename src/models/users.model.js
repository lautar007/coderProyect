const mongoose = require('mongoose');

const usersCollection = 'users';

const userSchema = new mongoose.Schema({
    name:{ type: String, required: true},
    surname: { type: String, required: true},
    email: { type: String, required: true},
    profileImage: String,
    username: { type: String, required: true},
    password: { type: String, required: true}
})

const usersModel = mongoose.model(usersCollection, userSchema);
module.exports = usersModel;