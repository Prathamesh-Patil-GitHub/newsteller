// *****************************
// @author - Prathamesh Patil  **
// ****************************

const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const { exit } = require("process");
const user = require("../backend/models/user");
const news = require("../backend/models/news");
const md5 = require("md5");
const cors = require("cors");
mongoose.connect("mongodb+srv://prathamesh:prathamesh@my-cluster.9fh8spg.mongodb.net/newsteller?retryWrites=true&w=majority");


// parse application/json
app.use(bodyParser.json())
app.use(cors());

// Set up Global configuration access
dotenv.config();


let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
});

app.get("/", (req, res) => { res.send("hello") });

//VALIDATE FUNCTION TO VALIDATE THE DATA RECEIVED IN THE BODY OF REQUEST
function isValid(name, email, password) {
    let valid = true;
    if (name.length < 2 || name.length > 40) {
        valid = false;
    } else if (email.search(/^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-]+$/) == -1) {
        valid = false;
    }
    else if (password.length < 8) {
        valid = false;
    }
    return valid;
}

//CREATE-USER ENDPOINT, TO CREATE A NEW ACCOUNT (POST-REQUEST)
app.post("/createuser", (req, res, next) => {
    try {
        var name = req.body.name;
        var email = req.body.email;
        var password = md5(req.body.password);
    } catch (err) {
        res.send({ error: true, message: "Invalid payload sent" });
        return;
    }
    if (isValid(name, email, password)) {

        //CHECKING IF USER WITH EMAIL-ID ALREADY EXISTS
        try {
            user.findOne({ email: email }, (err, data) => {
                if (err) {
                    res.send({ error: true, message: "Unknown internal error occurred!" });
                } else if (data) {
                    res.send({ error: true, message: `User with Email Id- ${email} already exists` });
                } else {
                    const data = {
                        time: Date(),
                        name: name,
                        email: email
                    };

                    //SAVING NEW USER DATA TO MONGODB DATABASE USING MONGOOSE
                    const userInstance = new user({
                        name: name,
                        email: email,
                        password: password
                    });
                    userInstance.save(function (err) {
                        if (err) {
                            res.send({ error: true, message: "Some internal error occured !" });
                        }
                    });

                    //GENERATING JWT TOKEN FOR NEW USER
                    const token = jwt.sign(data, process.env.JWT_SECRET_KEY);
                    res.send({ error: false, "auth_token": token });
                }
            });
        } catch (err) {
            res.send({ error: true, message: "Some internal error occured !" });
        }
    }
    else {
        res.send({ error: true, message: "Please fill the form properly!" });
    }
});

//GETUSER ENDPOINT TO GET THE USER DATA FROM THE RECEIVED AUTHENTICATION-TOKEN
app.post("/getuser", (req, res) => {
    try {
        const data = jwt.verify(req.body.auth_token, process.env.JWT_SECRET_KEY);
        res.send({
            error: false,
            name: data.name,
            email: data.email
        });
    } catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
});

//LOGIN ENDPOINT, TO AUTHENTICATE THE USER LOGIN CREDENTIALS
app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = md5(req.body.password);
    if (isValid("sample name", email, password)) {
        try {
            user.findOne({ email: email, password: password }, (err, data) => {
                if (err) {
                    res.send({ error: true, message: "Internal server error" });
                } else if (data) {
                    const token_data = {
                        time: Date(),
                        name: data.name,
                        email: data.email
                    };
                    const token = jwt.sign(token_data, process.env.JWT_SECRET_KEY);
                    res.send({ error: false, "auth_token": token });
                } else {
                    res.send({ error: true, message: "Invalid Credentials" });
                }
            });
        } catch (err) {
            console.log(err);
            res.send({ error: true, message: "Internal server error" });
        }
    } else {
        res.send({ error: true, message: "Invalid Credentials" });
    }
});

//SAVE-NEWS ENDPOINT TO SAVE A NEWS TO THE DATABASE TO VIEW LATER
app.post("/save-news", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const imageurl = req.body.imageurl;
    const url = req.body.url;
    const source = req.body.source;
    const author = req.body.author;
    const date = req.body.date;
    const auth_token = req.body.auth_token;
    const data = jwt.verify(auth_token, process.env.JWT_SECRET_KEY);
    const user = data.email;        //EMAIL FIELD IS MAPPED WITH USER FIELD IN THE NEWS COLLECTION
    const newsInstance = new news({
        title: title,
        description: description,
        url: url,
        imageUrl: imageurl,
        author: author,
        date: date,
        source: source,
        user: user
    });
    newsInstance.save((err) => {
        if (err) {
            res.send({ error: true, message: "Some internal error occured while saving the news!" });
        }
        else {
            res.send({ error: false, message: "Saved successfully" });
        }
    });
});

//VIEW-SAVED-NEWS ENDPOINT TO VIEW ALL NEWS SAVED BY A PARTICULAR USER
app.post("/view-saved-news", (req, res) => {
    const auth_token = req.body.auth_token;
    try {
        const data = jwt.verify(auth_token, process.env.JWT_SECRET_KEY);
        const email = data.email;
        news.find({ user: email }, (err, articles) => {
            if (err) {
                res.send({ error: true, message: "Some internal error occured !" });
            } else if (data) {
                res.send({ error: false, articles: articles });
            }
            else {
                res.send({ error: true, message: "No data found !" });
            }
        });
    } catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" })
    }
});

//DELETE-NEWS ENDOPOINT TO DELETE A SPECIFIC NEWS FROM THE SAVED NEWS COLLECTION
app.post("/delete-news", (req, res) => {
    const auth_token = req.body.auth_token;
    const url = req.body.url;
    try {
        const data = jwt.verify(auth_token, process.env.JWT_SECRET_KEY);
        const email = data.email;
        news.deleteOne({ user: email, url: url })
        .then(function () {
            res.send({ error: false, message: "News deleted successfully" });
        })
        .catch(function(err){
            res.send({ error: true, message: "Error occured, Cannot delete the news !" });
        });
    } catch (err) {
        res.send({ error: true, message: "Stop tampering with the authentication tokens, it's a cyber crime!" });
    }
});