const express = require("express");
const app = express();
const fs = require('fs');
const bodyParser = require("body-parser");
const users = require("./dummy_data.json");
const port = 3001;

app.use(express.json());

// `default` route
app.get("/", (req, res) => {
    res.status(200).end("Default route defined here.....");
});

// `readAllUser` route
app.get("/getUser", (req, res) => {
    return res.json(users);
});

// `readUserByID` route
app.get("/getUser/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
});

// `createUser` route.
app.post("/newUser", (req, res) => {
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
});

// `updateUserByID` route.
app.put("/updateUser/:id", (req, res) => {
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
});

// Delete user by ID
app.delete("/deleteUser/:id", (req, res) => {
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
});



app.listen(port, () => {
    console.log(`Server started at port  ${port}.`);
});
