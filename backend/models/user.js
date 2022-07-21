// *****************************
// @author - Prathamesh Patil  **
// ****************************

const mongoose = require('mongoose');

const someModel = new mongoose.Schema({
    name:String,
    email: String,
    password: String
});

//Taking the model name user, which automatically creates a collection named as 'users'
const user = mongoose.model("user",someModel);
module.exports = user;