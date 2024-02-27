const express = require('express');
// const { sendError } = require('next/dist/server/api-utils');
const app = express()




app.use(express.json());
const students = [
    {
        name: "Ahmed",
        rollNo: 21,
        id: 5555
    },
    {
        name: "Hafeez",
        rollNo: 45,
        id: 1234
    }
]

function generateID() {
    const randomNum = Math.random() * 9000
    return Math.floor(1000 + randomNum)
}
//default route url
app.get("/", (req, res) => {
    res.end("Default Root defined here....");
})


// "Create" route 
app.post("/create", (req, res) => {
    const name = req.body.name;
    const rollNo = req.body.rollNo;
    students.push({
        name: name,
        rollNo: rollNo,
        id: generateID()
    })


    // console.log(students);
    // res.status(200).end(name)
    res.end(JSON.stringify(students));

})

//"read" route to obtain a single object.
app.get("/read/:id", (req, res) => {
    for (let key of Object.keys(students)) {
        if (students[key].id == req.params.id) {
            res.end(JSON.stringify(students[key]));
        }
    }
    // console.log(students);
})

//`read` route to obtain all objects
app.get("/read", (req,res) => {
    res.end(JSON.stringify(students));
})

//"update" route.
app.put("/update/:id", (req, res) => {

    for (let key of Object.keys(students)) {
        if (students[key].id == req.params.id) {
            students[key].name = req.body.name;
            students[key].rollNo = req.body.rollNo;
            students[key].id = req.body.id
        }
    }
    // console.log(students);
    res.end(JSON.stringify(students));
})

// "delete" route.
app.delete("/delete/:stdId", (req, res) => {
    for (let key of Object.keys(students)) {
        if (students[key].id == req.params.stdId) {
            students.splice(key,1);
        }
    }
    // console.log(students);
    // res.status(200).end("Deleted Successfully....")
    // res.end(JSON.stringify(students))
    res.end(JSON.stringify(students));
})

app.listen(3002, () => {
    console.log("Listenng on the port 3000.....")
})