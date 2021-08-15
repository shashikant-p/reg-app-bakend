const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const usersJSON = fs.readFileSync(__dirname + '/users.json');

const usersList = JSON.parse(usersJSON);

console.log(usersList.users);

const app = express();

app.use(express.json());
app.use(morgan());

app.post('/signup', (req, res) => {
    console.log("Post Called");
    console.log(req.body);

    // Business Logic

    const newUser = req.body;
    newUser.id = 10;

    usersList.users.push(newUser);

    console.log(usersList.users);

    res.send({
        status : "Success",
        message : "User Registered."
    });
});

app.post('/signin', (req, res) => {
    console.log("Post Called");
    console.log(req.body);

    // Business Logic

    const matchedUser = usersList.users.find((user) => {
       return (user.email === req.body.email && user.pass === req.body.pass);
    });

    console.log(usersList.users);

    if (matchedUser) {
        res.send({
            status : "Success",
            message : "Logged in"
        });  
    } else {
        res.status(401).send({
            status : "Failure",
            message : "Invalid user"
        });         
    }
});

app.listen(3002);

