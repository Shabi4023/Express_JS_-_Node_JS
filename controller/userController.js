const users = require("../dummy_data.json");
const fs = require('fs');
//`default` route.
exports.defaultFunc = function (req, res) {
    res.status(200).end("Default route defined here.....");
};


// `readAllUser` route
exports.getAllUser = function (req, res) {
    return res.json(users);
};


// `readUserByID` route
exports.getUserByID = function (req, res) {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
};


// `createUser` route.
exports.createUser = function (req, res) {
    const newuser = {
        name: req.body.name,
        id: req.body.id,
        rollNo: req.body.rollNo,
    };

    users.push(newuser);

    fs.writeFile("dummy_data.json", JSON.stringify(users), (err) => {
        if (err) {
            res.end(err);
        } else {
            res.status(200).end("User created successfully....");
        }
    });
};


// `updateUserByID` route.
exports.updateUserByID = function (req, res) {
    const id = Number(req.params.id);
    const updatedUser = {
        name: req.body.name,
        id: req.body.id,
        rollNo: req.body.rollNo,
    };

    const updatedUsers = users.map((user) => {
        if (user.id === id) {
            return updatedUser;
        } else {
            return user;
        }
    });

    // Write the updated data back to the file
    fs.writeFile("dummy_data.json", JSON.stringify(updatedUsers), (err) => {
        if (err) {
            res.end(err);
        }
        res.status(200).end("User updated successfully.....");
    });
};


// Delete user by ID
exports.deleteUserByID = function(req, res) {
    const id = Number(req.params.id);

    // Filter out the user with the specified ID
    const updatedUsers = users.filter((user) => user.id !== id);

    // Write the updated data back to the file
    fs.writeFile("dummy_data.json", JSON.stringify(updatedUsers), (err) => {
        if (err) {
            res.end(err);
        }
        res.status(200).end("User deleted successfully.....");
    });
};
