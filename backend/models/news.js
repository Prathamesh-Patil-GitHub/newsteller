// *****************************
// @author - Prathamesh Patil  **
// ****************************


const mongoose = require('mongoose');

const someModel = new mongoose.Schema({
    title: String,
    description: String,
    url: String,
    imageUrl: String,
    author: String,
    date: String,
    source: String,
    user: String
});

//Taking the model name user, which automatically creates a collection named as 'users'
const news = mongoose.model("news",someModel);
module.exports = news;